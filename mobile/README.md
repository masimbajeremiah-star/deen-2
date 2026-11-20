# DAWALINK mobile app (Android + iOS)
This is a separate Expo React Native application, not a website wrapper.

## Run on a phone
1. Install Node.js 20+ and the Expo Go app on your phone.
2. From this directory run `npm install`.
3. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL=https://dawalink-kenya.onrender.com`.
4. Run `npx expo start` and scan the QR code with Expo Go.

## Create installable Android/iOS builds
1. Install EAS CLI: `npm install -g eas-cli`.
2. Sign in: `eas login`.
3. Create an Expo project and replace the placeholder `extra.eas.projectId` in app.json with the generated project ID.
4. Android debug APK builds are available through the repository's GitHub Actions workflow.
5. The iOS workflow builds an iOS Simulator app ZIP (not a signed iPhone IPA). To install on a physical iPhone or distribute through TestFlight, configure an Apple Developer account and signing credentials, then use EAS or Xcode signing.

## Important current limitations
- The patient search and partner application screens call the DAWALINK API.
- Reservation requests use a cross-platform in-app form.
- The API's database connection and secure partner identity management still need final setup. Do not use real patient data or rely on sample pharmacy inventory.
- This is an MVP build, not a regulator-approved medicine dispensing or online pharmacy service.


## Signed iPhone IPA (real device)
The workflow `.github/workflows/build-ios-ipa.yml` uses Expo EAS cloud builds to create a signed iOS build (not a simulator app). Prerequisites are an Expo account, an Expo project linked to this app, an Expo access token stored as GitHub Actions secret `EXPO_TOKEN`, and Apple Developer Program membership with signing credentials configured in EAS. Once these prerequisites are completed, run the workflow from GitHub Actions. A successful production build is intended for App Store/TestFlight distribution; it does not automatically publish the app.

To link the Expo project initially, from the mobile directory run `eas login` then `eas init` and commit the generated project ID in `app.json`. Configure Apple credentials through EAS credentials management. Add `EXPO_TOKEN` under repository Settings → Secrets and variables → Actions.


Android install builds are produced by the GitHub Actions workflow at `.github/workflows/build-android.yml` and uploaded as the `DAWALINK-Android-debug` artifact after a successful build.
