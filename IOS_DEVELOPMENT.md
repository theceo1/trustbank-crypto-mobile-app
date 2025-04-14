
# iOS Development Guide for trustBank Mobile App

This guide explains how to run and test the trustBank crypto mobile app on iOS devices and simulators.

## Prerequisites

- macOS computer
- Xcode 13 or later
- iOS 14 or later (for device testing)
- Node.js and npm
- CocoaPods (install with `sudo gem install cocoapods`)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository (if you haven't already)
git clone <repository-url>

# Navigate to project directory
cd trustbank-crypto-mobile-app

# Install npm dependencies
npm install
```

### 2. Initial Setup for iOS

Run the setup script to build the project and add iOS platform:

```bash
npm run ios:setup
```

This script will:
- Build the web application
- Add iOS as a Capacitor platform
- Sync the web build with iOS
- Open the project in Xcode

### 3. Running in iOS Simulator

In Xcode:
1. Select an iOS simulator from the device dropdown menu
2. Click the Play button or press ⌘R

### 4. Running on a Physical iOS Device

1. Connect your iOS device to your Mac
2. In Xcode, select your device from the device dropdown menu
3. You may need to sign the app with your Apple Developer account:
   - Select the project in the Project Navigator
   - Select the target under "Targets"
   - Go to "Signing & Capabilities"
   - Select your team or add your Apple ID

4. Click the Play button or press ⌘R

### 5. Making Code Changes

After making changes to the web code:

```bash
# Sync changes with iOS
npm run ios:sync

# Or build, sync and open in Xcode in one command
npm run ios:live
```

## Troubleshooting

- **Build Errors in Xcode**: Make sure you have the latest version of Xcode and CocoaPods
- **Device not recognized**: Ensure your device is unlocked and has trusted your computer
- **White screen on app launch**: Check console logs in Xcode for errors and ensure the Capacitor configuration is correct

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Development with Capacitor](https://capacitorjs.com/docs/ios)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)

