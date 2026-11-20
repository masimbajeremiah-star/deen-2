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
4. Run `eas build --platform android --profile preview` for an installable APK.
5. Run `eas build --platform ios --profile preview` for iOS (Apple Developer credentials/account required).

## Important current limitations
- The patient search and partner application screens call the DAWALINK API.
- Reservation submission is currently implemented for iOS prompt flow; Android needs a proper in-app form and is the next implementation fix.
- The API's database connection and secure partner identity management still need final setup. Do not use real patient data or rely on sample pharmacy inventory.
- This is an MVP build, not a regulator-approved medicine dispensing or online pharmacy service.
