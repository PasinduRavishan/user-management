# Firebase User Management System

A complete user authentication and profile management system built with React, TypeScript, and Firebase. This application demonstrates modern authentication patterns, secure data management, and cloud function integration following Firebase best practices.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [Firebase Functions](#-firebase-functions)
- [Available Scripts](#-available-scripts)
- [Security Best Practices](#-security-best-practices)

## ✨ Features

### Authentication
- **Email & Password Authentication** - Secure user registration and login
- **Google Sign-In** - One-click authentication with Google OAuth
- **Protected Routes** - AuthGuard component to secure authenticated pages
- **Automatic Navigation** - Smart redirects after login/registration

### Profile Management
- **Profile Setup Wizard** - First-time user profile completion
- **Profile Image Upload** - Firebase Storage integration for user avatars
- **Secure Updates** - Cloud Functions for server-side profile updates
- **Real-time Data** - Firestore for instant data synchronization

### Backend Automation
- **Auto User Initialization** - Firestore trigger creates user metadata on signup
  - Timestamp (createdAt)
  - User role (default: "user")
  - Account status (default: "active")
- **Callable Cloud Functions** - Secure HTTP endpoints for profile updates

## 🧱 Tech Stack

### Frontend
- **React 19** - UI framework with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast development server and build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling

### Backend & Services
- **Firebase Authentication** - User authentication and session management
- **Cloud Firestore** - NoSQL database for user data
- **Firebase Cloud Functions v2** - Serverless backend logic
- **Firebase Cloud Storage** - Profile image storage
- **Firebase Admin SDK** - Server-side Firebase operations

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **TypeScript Compiler** - Strict type checking
- **Firebase Emulators** - Local development environment

## 📁 Project Structure

```
user-management/
├── functions/              # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts       # Function definitions (onCreate trigger, updateProfile)
│   ├── lib/               # Compiled JavaScript
│   ├── package.json       # Functions dependencies
│   └── tsconfig.json      # Functions TypeScript config
│
├── src/
│   ├── auth/              # Authentication pages
│   │   ├── Login.tsx      # Email/Google login
│   │   └── Register.tsx   # User registration
│   ├── components/
│   │   └── AuthGuard.tsx  # Protected route wrapper
│   ├── pages/
│   │   ├── Dashboard.tsx  # Main authenticated page
│   │   └── ProfileSetup.tsx # New user profile completion
│   ├── services/
│   │   └── storage.ts     # Firebase Storage utilities
│   ├── firebase.ts        # Firebase initialization
│   └── main.tsx           # App entry point
│
├── .env                   # Environment variables (not in git)
├── firebase.json          # Firebase project configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies
```

## 📦 Prerequisites

- **Node.js** - v18 or higher (v24 recommended for functions)
- **npm** or **yarn** - Package manager
- **Firebase Account** - [Create one here](https://firebase.google.com/)
- **Firebase CLI** - Install globally: `npm install -g firebase-tools`

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-management
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install functions dependencies**
   ```bash
   cd functions
   npm install
   cd ..
   ```

4. **Login to Firebase**
   ```bash
   firebase login
   ```

5. **Initialize Firebase (if needed)**
   ```bash
   firebase init
   ```
   - Select Firestore, Functions, and Storage
   - Use existing project or create new one

## 🔐 Environment Setup

1. **Create `.env` file** in the project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

2. **Get Firebase credentials**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > General
   - Scroll to "Your apps" > Web apps
   - Copy the config values

3. **Enable Authentication Methods**:
   - In Firebase Console > Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google

4. **Setup Firestore**:
   - Create database in Firestore
   - Start in production mode or test mode

5. **Setup Storage**:
   - Enable Firebase Storage
   - Configure security rules

## 🏃 Running the Application

### Development Mode

1. **Start the frontend**:
   ```bash
   npm run dev
   ```
   App will run at `http://localhost:5173`

2. **Build and watch functions** (in a new terminal):
   ```bash
   cd functions
   npm run build:watch
   ```

3. **Deploy functions** (when ready):
   ```bash
   npm run deploy
   ```

### Production Build

```bash
npm run build
npm run preview
```

## ☁️ Firebase Functions

### Available Functions

#### `onUserCreate`
- **Type**: Firestore Trigger
- **Trigger**: onCreate on `users/{userId}`
- **Purpose**: Automatically initializes user metadata
- **Adds**:
  - `createdAt`: Server timestamp
  - `status`: "active"
  - `role`: "user"

#### `updateUserProfile`
- **Type**: Callable HTTPS Function
- **Auth**: Required
- **Parameters**:
  - `firstName`: string
  - `lastName`: string
  - `photoURL`: string (optional)
- **Purpose**: Securely updates user profile data in Firestore

### Deploy Functions

```bash
cd functions
npm run deploy
```

### Test Functions Locally

```bash
cd functions
npm run serve
```

## 📜 Available Scripts

### Root Project
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Functions Directory
- `npm run build` - Compile TypeScript
- `npm run build:watch` - Compile in watch mode
- `npm run serve` - Run local emulators
- `npm run deploy` - Deploy to Firebase
- `npm run logs` - View function logs

## 🔒 Security Best Practices

✅ **Implemented**:
- Environment variables for Firebase config (not committed)
- `.env` added to `.gitignore`
- Server-side validation in Cloud Functions
- Authentication required for callable functions
- Firestore security rules (configured in Firebase Console)
- Storage security rules (configured in Firebase Console)

⚠️ **Recommendations**:
- Add rate limiting to prevent abuse
- Implement field validation in Cloud Functions
- Add file size/type restrictions for image uploads
- Set up Firebase App Check for additional security
- Configure CORS for production domains
- Add error boundaries in React components

### Security
- No direct client-side Firestore writes for sensitive updates
- Secure Cloud Storage rules
- Backend-controlled profile updates

---



