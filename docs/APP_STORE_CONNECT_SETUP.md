# Petal: getting a build onto your iPhone (no Mac needed)

You do the clicking on Apple's and GitHub's websites. The cloud build (a GitHub Actions workflow on a rented Mac) does everything else. Do the steps in order.

Costs: the Apple Developer Program is paid by you (USD 99 per year). GitHub's Mac minutes are free for public repositories. For a private repository they use up your monthly minutes about 10 times faster, so a 15 minute build counts as about 150.

## Step 0. Apple Developer account
You said the status is not decided yet. If you do not have an active account:
1. Go to https://developer.apple.com/programs/enroll/ and sign in with your Apple Account.
2. Choose Individual or Organization. An Organization needs a D-U-N-S number and can take days or weeks to approve. An Individual is usually quicker.
3. Pay the annual fee. Wait for the "Welcome to the Apple Developer Program" email. You cannot continue until the account is active.

## Step 1. Choose and set your bundle ID
1. Pick an ID that you own, in reverse-domain style, for example `com.yourbusiness.petal`. It cannot be changed after the app is created.
2. In this repository, open `capacitor.config.ts` and replace `com.yourcompany.petal` with your ID. The cloud build refuses to run while the placeholder is still there.

## Step 2. Register the bundle ID
1. Go to https://developer.apple.com/account and sign in.
2. Click **Certificates, IDs & Profiles**, then **Identifiers**, then the blue **+**.
3. Choose **App IDs**, click Continue, choose **App**, click Continue.
4. Description: `Petal`. Bundle ID: choose **Explicit** and type your ID from Step 1.
5. Leave all capabilities unticked. Click **Continue**, then **Register**.

## Step 3. Create the app record
1. Go to https://appstoreconnect.apple.com and click **Apps**.
2. Click the blue **+**, then **New App**.
3. Platforms: **iOS**. Name: the public name (up to 30 characters, must not already be taken). Primary language: **English (U.S.)**. Bundle ID: pick yours from the list. SKU: any unique text, for example `petal-ios-001`. User Access: **Full Access**.
4. Click **Create**.

## Step 4. Create the API key (Admin, downloadable only once)
1. In App Store Connect click **Users and Access**, then the **Integrations** tab, then **App Store Connect API**.
2. If you see **Request Access**, the Account Holder must click it first and agree to the terms.
3. Under **Team Keys**, click **Generate API Key** (or the **+**).
4. Name: `GitHub Actions`. Access: **Admin**. Click **Generate**.
5. Click **Download API Key**. **Apple lets you download this file only once.** Save the `AuthKey_XXXXXXXXXX.p8` file somewhere safe. Never put it in the repository, in chat or in a screenshot.
6. Write down two numbers from the same page: the **Key ID** (in the row of your new key) and the **Issuer ID** (shown above the table).

## Step 5. Find your Team ID
1. Go to https://developer.apple.com/account and click **Membership details**.
2. Copy the **Team ID** (10 letters and numbers).

## Step 6. Add the four secrets to GitHub
1. Open the repository on GitHub, then **Settings**, then **Secrets and variables**, then **Actions**.
2. Click **New repository secret** four times. Names must match exactly:

| Secret name | What to paste |
|---|---|
| `APP_STORE_CONNECT_KEY_ID` | The Key ID from Step 4 |
| `APP_STORE_CONNECT_ISSUER_ID` | The Issuer ID from Step 4 |
| `APP_STORE_CONNECT_API_KEY_P8` | The whole text of the `.p8` file. Open it in Notepad, select all, copy. Include the `BEGIN PRIVATE KEY` and `END PRIVATE KEY` lines. |
| `APPLE_TEAM_ID` | The Team ID from Step 5 |

## Step 7. Run the build
1. On GitHub open the **Actions** tab and click **iOS build and upload to TestFlight** on the left.
2. Click **Run workflow**, keep the version at `1.0` (or type a new one), and click the green **Run workflow** button.
3. Wait about 10 to 20 minutes. Open the run to watch it. A red step names what failed.
4. The build number is the date and time in UTC, for example `2610151437`, so every run has a new number.

## Step 8. Set up TestFlight and install on your iPhone
1. In App Store Connect open **Apps**, then **Petal**, then the **TestFlight** tab.
2. After the upload, the build shows **Processing** for 5 to 30 minutes, then **Ready to Submit** or **Ready to Test**.
3. In the left menu under **Internal Testing**, click the **+**, name the group `Team`, and tick **Enable automatic distribution** if you want each new build sent to testers.
4. Click **Add testers**. Testers must be people added in **Users and Access** (you can add yourself and others there first). Add the build to the group if it was not added automatically.
5. On the iPhone, install the **TestFlight** app from the App Store, sign in with the same Apple Account, open the invitation email (or open TestFlight), tap **Accept**, then **Install**.

## If the build fails
| What you see | What to do |
|---|---|
| "Missing repository secrets" | Re-check the four names in Step 6. |
| "Change appId" | Do Step 1. |
| Archive step warns "Signed archive failed", then continues | Expected sometimes. The workflow retries and signs at export. |
| Export step says no signing certificate or "no devices" | Make sure the API key has **Admin** access, the bundle ID exists (Step 2), and the Team ID is right. If it still fails, register one device: https://developer.apple.com/account then **Devices**. |
| Upload step fails with "bundle version must be higher" | Run it again. The build number is the clock time and always rises. |
| The run waits a long time to start | The free Mac queue is busy. Wait, or use the Codemagic fallback below. |

## Fallback: Codemagic
If GitHub's Mac queue stalls, use https://codemagic.io (free tier available): connect this repository, add your App Store Connect API key under **Integrations**, make an iOS workflow on an Xcode 26 machine with automatic signing, and run the same commands as the steps in `.github/workflows/ios-testflight.yml`, in the same order. Ask Claude to write the `codemagic.yaml` when you need it.

## Honest limits
This workflow has never been run. It was written and syntax-checked without a Mac, so the first real run may need one or two fixes. The two least certain steps are cloud signing at archive time and the `altool` upload. If either fails, paste the red error here and it will be fixed.
