
# trustBank Mobile App - Project Knowledge Document

## Project Overview
The trustBank mobile app is a cryptocurrency ecosystem designed for emerging markets, with a focus on iOS devices. This document serves as a comprehensive guide for the project, covering technical specifications, design principles, API integrations, and other key details.

## Core Features
1. **User Authentication**
   - Email/password login and signup using Supabase
   - Biometric authentication (Face ID/Touch ID) for iOS
   - Session management and secure token storage

2. **KYC Verification**
   - Integration with Dojah for identity verification
   - Document upload (passport, national ID, driver's license)
   - Selfie/facial recognition
   - Verification status management

3. **Wallet Management**
   - Integration with Quidax for cryptocurrency wallets
   - Support for multiple cryptocurrencies
   - Balance display and transaction history
   - Wallet security features

4. **Basic Transactions**
   - Send/receive cryptocurrency
   - QR code generation for receiving funds
   - Transaction history and status tracking

## Technical Stack
- **Frontend Framework**: React (with simulated React Native components via Expo)
- **Language**: TypeScript
- **State Management**: React Context API, React Query
- **Styling**: Tailwind CSS (with custom theme)
- **Authentication**: Supabase Auth
- **UI Components**: Custom components inspired by native iOS design

## API Integrations
### 1. Supabase
- **URL**:
- **Public Key**: 
- **Purpose**: Authentication, user data storage, profile management

### 2. Dojah
- **API Key**: 
- **Public Key**:
- **App ID**: 
- **API URL**: https://api.dojah.io
- **Purpose**: KYC verification, identity validation

### 3. Quidax
- **Secret Key**: 
- **Public Key**:
- **API URL**: https://www.quidax.com/api/v1
- **Purpose**: Wallet management, cryptocurrency transactions

## Design Guidelines

### Brand Identity
- **Brand Name**: trustBank
- **Primary Color**: Green-600 (#16a34a)
- **Theme Support**: Light and dark mode toggle

### Design Principles
1. **iOS-First Approach**
   - Following iOS design guidelines for native feel
   - Optimized for iOS devices (iPhone X and newer)
   - Support for iOS-specific features like Safe Areas

2. **Accessibility**
   - High contrast for readability
   - Proper text sizing and spacing
   - Touch targets sized appropriately

3. **Security-Focused UI**
   - Biometric authentication prompts
   - Clear security indicators
   - Confirmation dialogs for sensitive actions

### Theme Configuration
- **Light Mode**: Clean background with green accents
- **Dark Mode**: Dark background with adjusted green highlights
- **Dynamic switching** based on user preference or system settings

## Project Structure
```
src/
  ├── components/         # Reusable UI components
  ├── contexts/           # React Context providers
  ├── lib/                # API clients and utility functions
  ├── hooks/              # Custom React hooks
  ├── pages/              # Screen components
  ├── config/             # Configuration files
  └── assets/             # Images and static assets
```

## Authentication Flow
1. User enters email/password or uses biometric authentication
2. Authentication request sent to Supabase
3. Upon successful authentication:
   - JWT token stored securely
   - User redirected to home screen
   - Session maintained for subsequent requests
4. New users follow the signup -> KYC verification flow

## KYC Verification Flow
1. User registers an account
2. User directed to KYC intro screen
3. User provides:
   - Government-issued ID document
   - Personal information
   - Selfie for facial verification
4. Documents sent to Dojah for verification
5. User shown pending status screen
6. Upon verification approval, user gains full access to the app

## Wallet Management Flow
1. User views wallet dashboard showing balances
2. User can:
   - View transaction history
   - Generate deposit addresses
   - Send cryptocurrency to other users
   - Withdraw to external wallets

## Security Considerations
- Biometric authentication for sensitive actions
- Automatic session timeout
- API key security (backend proxying for sensitive operations)
- Input validation and sanitization
- HTTPS for all network requests

## Testing Strategy
- Unit tests for core functionality
- Integration tests for API interactions
- UI testing for critical user flows
- iOS-specific testing for native features

## Future Enhancements
- Push notifications for transactions
- Market data and price charts
- Multi-factor authentication options
- Additional payment methods
- Support for more cryptocurrencies

## Reference Materials
- Website: www.trustbank.tech
- iOS Design Guidelines: Apple Human Interface Guidelines
- API Documentation:
  - Supabase: https://supabase.com/docs
  - Dojah: https://dojah.io/docs
  - Quidax: https://docs.quidax.com
