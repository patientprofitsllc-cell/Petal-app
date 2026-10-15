# Petal: App Store hand-off (Phase 8)

State when this was written: branch `aso/phase-1-app-store-rules`, 4 commits on top of the first upload, **not pushed**. Phases 4, 6 and 7 were skipped on purpose (Phase 4: no purchases; Phase 6: no sign-in; Phase 7: submitting, which you said to leave for now).

## 1. Every file changed

Everything below is in this repository. "A" = new, "M" = changed.

**Phase 1: Apple's rules built into the app** (commit 11ed139)
- M `src/App.tsx` (privacy text, em dashes, unused imports, no clinical-review note)
- M `src/index.css` (bundled fonts instead of Google Fonts)
- M `index.html`, `public/manifest.webmanifest` (page title: no em dash)
- A `public/privacy.html` (public privacy policy page, has placeholders)
- A `ios-config/PrivacyInfo.xcprivacy` (privacy manifest, copied into the app by the cloud build)
- A `docs/ASSET_RIGHTS.md` (who owns or licenses every font, icon and image)
- M `docs/APP_STORE_RELEASE.md` (no em dash, lists panty liners)
- M `package.json`, `package-lock.json`, `.gitignore`

**Phase 2: iPhone wrapper** (commit d288c5f)
- A `capacitor.config.ts` (placeholder bundle ID `com.yourcompany.petal`)
- A `scripts/bundle-ios.mjs` (bundles the app, fails loudly if it still needs a website)
- A `scripts/make-assets.mjs`, A `assets/icon-only.png`, A `assets/splash.png` (icon 1024 square no transparency, launch image 2732)
- M `src/App.tsx` (service worker only on the web), M `src/index.css` (safe areas, 44 pt tap targets, 16px search field, font variables), M `index.html` (viewport settings)
- M `package.json`, `package-lock.json`

**Phase 3: Cloud build, no Mac** (commit 1a5304a)
- A `.github/workflows/ios-testflight.yml`
- A `scripts/ios-patch.mjs`, A `scripts/ios-add-privacy-manifest.rb`
- A `docs/APP_STORE_CONNECT_SETUP.md`
- M `.gitignore`

**Phase 5: Listing** (commit fc67a4d)
- A `store/APP_STORE_LISTING.md` (the copy-and-paste text pack)
- A `scripts/screenshots.mjs`, A `scripts/check-listing.mjs`
- M `src/index.css` (the "Completed" badge no longer covers lesson text)
- M `package.json`, `package-lock.json`, `.gitignore`

**Phase 8** (this file): A `store/HANDOFF.md`

Not committed on purpose: `store/screenshots/` (regenerate any time with `npm run screenshots`).

## 2. Copy-paste text pack
Open `store/APP_STORE_LISTING.md`. It has name, subtitle, keywords, promotional text, description, What's New, review notes, the optional Spanish (Mexico) set, every questionnaire answer, and which screenshot folder goes in which slot. Run `npm run check:listing` after any edit.

## 3. Screenshots folder
`store/screenshots/` has 6 screens in each of 6 sizes (36 files, RGB PNG, no transparency):
- iPhone required slot: `1206x2622` (alternative `1179x2556`)
- iPhone 6.9" slot: `1320x2868` (alternative `1290x2796`)
- iPad 13" slot (required, because Petal runs on iPad): `2064x2752` (alternative `2048x2732`)

A zip of the three recommended folders, `petal-screenshots.zip`, was sent with this hand-off.

## 4. What you must do by hand
Menu names below are from my knowledge of Apple's sites. I could not see your App Store Connect screens, so a label may differ slightly. Do these in order.

### A. Before anything else
1. **Fill in the placeholders** in `public/privacy.html`: `[YOUR COMPANY NAME]` and `[YOUR SUPPORT EMAIL]` (two places).
2. **Change the bundle ID.** Open `capacitor.config.ts`, replace `com.yourcompany.petal` with your own (for example `com.yourbusiness.petal`). It cannot change later.
3. **Get a clinician to review the lessons.** Send them the lesson, FAQ and "when to get medical help" text in `src/App.tsx`. Nothing has been clinician-reviewed.
4. **Get the repository onto `main`.** The branch is only on this computer. Ask me to push it and open a pull request, then merge it on GitHub (Pull requests, Merge pull request). The workflow only appears under Actions once it is on `main`. The repository looks public, so `privacy.html` placeholders would be visible until step 1 is done.
5. **Put `privacy.html` on the web.** The Apple form needs a public URL. Ask me to redeploy the AppDeploy site (it needs your OK). Its address would then be `https://petal-your-period-guide-gblfjl.v2.appdeploy.ai/privacy.html`. Until redeployed, that address does not exist.

### B. Apple and GitHub setup
Follow `docs/APP_STORE_CONNECT_SETUP.md`, Steps 0 to 6: Apple Developer account, register the bundle ID, create the app record, create the Admin API key (download it once), find your Team ID, add the four secrets to GitHub.

### C. Build
GitHub, then **Actions**, then **iOS build and upload to TestFlight**, then **Run workflow**. Wait 10 to 20 minutes. Then follow Step 8 of the setup guide to install from TestFlight on your iPhone and test it for real.

### D. Fill in App Store Connect (https://appstoreconnect.apple.com)
1. **Apps, then Petal, then App Information** (left menu, under General): Name, Subtitle, Privacy Policy URL, Primary category Health & Fitness, Secondary category Education, Content Rights (No), and Age Rating (click Edit and use the answers table in the listing file).
2. **Pricing and Availability**: set the price to **Free**.
3. **App Privacy** (left menu): click Get Started, choose that you do **not** collect data from this app, then Publish.
4. **Regulated medical device declaration and trader status (EU Digital Services Act)**: look under App Information and under the Business or Compliance area of the top menu. Answer the medical device question **No**, and choose trader or non-trader as described in the listing file.
5. **The version page** (left menu, the iOS App version "1.0 Prepare for Submission"):
   - paste Promotional Text, Description, Keywords, Support URL, Copyright, and What's New from the listing file
   - under **Version Release**, choose **Manually release this version**
   - under each device-size section, drag in the screenshots (see section 3)
   - under **Build**, click the **+** and pick the build that TestFlight finished processing
   - under **App Review Information**, enter your contact details, paste the review notes, and leave Sign-in required **unticked**
6. **Optional Spanish (Mexico):** on the version page open the language menu at the top, click **Add Language**, choose Spanish (Mexico), and paste the ES fields.
7. **When you are ready (Phase 7, not done):** on the version page click **Add for Review**, check the item count, then **Submit to App Review**. If "Add for Review" is blocked, check the price and the medical device declaration. Do not edit the listing while the app waits for review.

## 5. What I could not verify
- **Nothing has been compiled in Xcode or run on a real iPhone.** That includes how the top bar and bottom bar sit on a phone with a notch, landscape on iPad, and whether the app works offline once installed.
- **The GitHub workflow has never run.** The two least certain steps are the cloud signing at archive time and the `altool` upload. My sources for `altool` still working on `.ipa` files were mostly forum posts, not Apple's own docs. Also unconfirmed: that `xcodebuild -scheme App` finds the project's automatic scheme.
- **`scripts/ios-add-privacy-manifest.rb` was never run.** The Ruby package it needs would not install on this PC (antivirus blocks the certificate check), so it is only syntax-checked. The workflow checks the result and stops if the privacy manifest is missing from the app.
- **I did not look at App Store Connect.** Click paths, the exact wording of the age-rating, medical-device and trader questions, and whether the name "Petal: Period Guide" is still free are all unconfirmed.
- **The age rating Apple shows is calculated by Apple.** My answers should give 13+, from Apple's own documentation, but I did not run the questionnaire.
- **Lesson accuracy.** The text was written from public guidance but no clinician has reviewed it.
- **HawkScan never ran.** No API key or scanner was available.
- **Reload and clear-progress flows were not re-run** after my edits. The earlier test list in `tests/tests.json` is only a description and nothing runs it. I did click through every screen at 390, 430 and 440 pt, and the typecheck, bundle, listing check and screenshots pass.
- **The live website is still the old version** (old privacy text, Google Fonts, no `privacy.html`).
- **Screenshots are from a desktop browser**, so they have no status bar or notch.
- **The "works without an internet connection" line** in the description is only true after the app is bundled, and I have not tested that in the native app.

## 6. Decisions I made that you may want to change
- **Two fonts, not one system font.** Your rules ask for one system font with medium weights. Petal uses DM Sans and a Fraunces serif for headings. To switch, set `--font-display` equal to `--font-body` at the top of `src/index.css`.
- **Pinch-zoom is off** (`maximum-scale=1`), as your rules say. This stops people zooming text, which is an accessibility cost.
- **"Turn off frame scrolling" not applied.** Petal scrolls the whole page, so turning it off would break scrolling.
- **iPhone is portrait only.** That is the only orientation I tested. iPad keeps all orientations.
- **iPad is supported** (the Capacitor default), which is why iPad screenshots are required.
- **Icon artwork** came from the AppDeploy assistant. Confirm you are happy to treat it as yours (see `docs/ASSET_RIGHTS.md`).
