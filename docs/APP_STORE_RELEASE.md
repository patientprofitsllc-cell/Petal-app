# Petal — native app release handoff
Petal is a mobile-first, responsive PWA suitable for usability testing and subsequent native packaging. It is not yet an App Store / Google Play signed binary. Public site URL comes from AppDeploy.

## iOS / Android packaging
1. Download/export the React/Vite project and run npm install then npm run build.
2. Install Capacitor dependencies in your local release repository: npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android.
3. Run npx cap init "Petal" "com.yourcompany.petal" --web-dir dist (replace bundle ID with your owned ID).
4. Run npx cap add ios and npx cap add android, then npx cap sync.
5. Create required iOS and Android raster app icons, launch assets and full-size store screenshots from original art. The PWA includes a vector SVG icon for reference.
6. Run tests on physical iPhone and Android devices, VoiceOver/TalkBack, airplane-mode offline, safe areas, performance, and navigation, and get the educational/clinical content reviewed by a qualified medical professional.
7. Use Xcode on Mac to sign, archive, and upload the iOS build to App Store Connect (TestFlight first); create the Android AAB using Android Studio and upload to Play Console testing first.
8. Set actual developer/publisher identity and support email/website; finalize privacy policy for the operator and hosting setup and publish it at a public URL; complete age rating, App Privacy, Google Play data safety and Health apps declaration.
9. Capture release screenshots and submit app name, subtitle, category, description, keywords, support URL, privacy policy URL, content rights, and review notes.
10. Apple guideline 4.2 requires useful app-specific functionality beyond a wrapped website. Test full native experience, and consider adding native accessibility, haptic guidance, locally stored reminder opt-ins or educational interactions if needed; no acceptance guarantee.

## Suggested store listing draft
Name: Petal — Period Guide
Subtitle: Period care, made simple
Summary: Step-by-step, judgment-free lessons for first periods, hygiene, products, school leaks, and comfort.
Description: Meet Petal, a gentle guide to periods for teens and young women. Learn with interactive, bite-sized walkthroughs. Compare pads, period underwear, tampons and cups; build simple hygiene habits; find comforting answers to common questions. No account required. No cycle tracking. Save lessons privately on your device.

## Editorial & privacy notes
- Do not represent this content as medical diagnosis. Refer to CDC, ACOG and FDA links in app.
- Contact a medical professional for heavy bleeding, persistent irregularity, severe pain, unusual odor or discharge. Seek urgent attention for possible TSS, fainting or severe bleeding symptoms.
- This implementation does not request cycle dates or personal health logs; bookmarks/completions live in localStorage.
- Confirm third-party hosting technical logs and privacy representations prior to distribution.
- Parental, regional privacy, health-app and child-directed content obligations require publisher review before release.
