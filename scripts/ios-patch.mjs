// Patches the generated iOS Info.plist. Run by the cloud build after `cap add ios`.
//   node scripts/ios-patch.mjs ios/App/App/Info.plist
//
// 1. iPhone: portrait only (the only orientation that was tested). iPad keeps
//    all orientations.
// 2. Export compliance: Petal uses no custom encryption, so say so. This stops
//    App Store Connect from asking the export-compliance question on every build.
//    Change it if you ever add your own encryption.
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/ios-patch.mjs <path to Info.plist>');
  process.exit(1);
}

let plist = readFileSync(file, 'utf8');

// Only the iPhone key. The iPad key is "UISupportedInterfaceOrientations~ipad",
// which this pattern does not match.
plist = plist.replace(
  /(<key>UISupportedInterfaceOrientations<\/key>\s*<array>)[\s\S]*?(<\/array>)/,
  '$1\n\t\t<string>UIInterfaceOrientationPortrait</string>\n\t$2'
);

if (!plist.includes('ITSAppUsesNonExemptEncryption')) {
  plist = plist.replace(
    /<\/dict>\s*<\/plist>\s*$/,
    '\t<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>\n</dict>\n</plist>\n'
  );
}

writeFileSync(file, plist);

// Verify, and fail loudly if the patch did not take.
const phone = plist.match(
  /<key>UISupportedInterfaceOrientations<\/key>\s*<array>([\s\S]*?)<\/array>/
);
const phoneOrientations = phone ? phone[1].match(/<string>/g)?.length : 0;
const problems = [];
if (phoneOrientations !== 1 || !phone[1].includes('UIInterfaceOrientationPortrait'))
  problems.push('iPhone orientation is not portrait only');
if (!/<key>ITSAppUsesNonExemptEncryption<\/key>\s*<false\/>/.test(plist))
  problems.push('ITSAppUsesNonExemptEncryption is not set to false');
if (!/UISupportedInterfaceOrientations~ipad/.test(plist))
  problems.push('iPad orientations key went missing');
if (problems.length) {
  console.error('Info.plist patch failed:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log('Info.plist patched: iPhone portrait only, export compliance set.');
