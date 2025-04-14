
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function setupIOS() {
  try {
    console.log('Building the web application...');
    await execPromise('npm run build');
    
    console.log('Adding iOS platform to Capacitor...');
    await execPromise('npx cap add ios');
    
    console.log('Syncing web build with iOS platform...');
    await execPromise('npx cap sync ios');
    
    console.log('Opening the project in Xcode...');
    await execPromise('npx cap open ios');
    
    console.log('iOS setup complete! You can now run the app in Xcode or the iOS simulator.');
    console.log('\nTo build and run the app in Xcode:');
    console.log('1. Select a simulator or a connected device');
    console.log('2. Press the Play button or use ⌘R');
    
  } catch (error) {
    console.error('Error during iOS setup:', error);
  }
}

setupIOS();
