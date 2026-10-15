# Adds the privacy manifest to the generated iOS project. Run by the cloud build
# after `cap add ios`.
#   ruby scripts/ios-add-privacy-manifest.rb [project path] [manifest path]
#
# The Capacitor template does not include PrivacyInfo.xcprivacy, and this Xcode
# project does not pick up new files by itself, so the file has to be copied in
# AND added to the App target's resources.
require 'fileutils'
require 'xcodeproj'

proj_path = ARGV[0] || 'ios/App/App.xcodeproj'
source = ARGV[1] || 'ios-config/PrivacyInfo.xcprivacy'
abort "Manifest not found: #{source}" unless File.exist?(source)

app_dir = File.join(File.dirname(proj_path), 'App')
FileUtils.cp(source, File.join(app_dir, 'PrivacyInfo.xcprivacy'))

project = Xcodeproj::Project.open(proj_path)
target = project.targets.find { |t| t.name == 'App' }
group = project.main_group['App']
abort 'App target not found' unless target
abort 'App group not found' unless group

unless group.files.any? { |f| f.path == 'PrivacyInfo.xcprivacy' }
  ref = group.new_file('PrivacyInfo.xcprivacy')
  target.resources_build_phase.add_file_reference(ref)
end
project.save

# Verify, and fail loudly if it did not take.
check = Xcodeproj::Project.open(proj_path)
t = check.targets.find { |x| x.name == 'App' }
ok = t.resources_build_phase.files.any? do |bf|
  bf.file_ref && bf.file_ref.path == 'PrivacyInfo.xcprivacy'
end
abort 'PrivacyInfo.xcprivacy is NOT in the App target resources' unless ok
puts 'PrivacyInfo.xcprivacy added to the App target resources.'
