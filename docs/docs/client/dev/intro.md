---
sidebar_position: 1
--- 

# Introduction
The Learn Client is the primary user interface for 
the application and is created using React Native, 
which allows for cross-platform compilation to native 
code using a single codebase.

## Monorepo
The application uses a monorepo structure provided 
by Yarn Workspaces to share a single codebase, with 
each platform having its own version of React and 
React Native.

This is necessary because some libraries are not 
compatible with both Windows and macOS versions. 
However, note that a Mac is required to compile 
the iOS and macOS versions.

# Directory Structure
The directory structure follows a monorepo approach, 
with the shared directory named workit. Each platform 
links its entry point to the App.tsx file located 
within the workit directory.
```bash
client
├── package.json
├── packages
│   ├── mobile
│   │   ├── android
│   │   ├── app.json
│   │   ├── babel.config.js
│   │   ├── index.js
│   │   ├── ios
│   │   ├── metro.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── workit
│       ├── App.tsx
│       ├── components
│       ├── package.json
│       ├── services
│       ├── tsconfig.json
│       ├── @types
│       └── views
├── README.md
└── yarn.lock
``` 
* `packages/`: Contains the architectures and shared directory.
* `packages/mobile/`: Contains native code to IOS and Android.
* `packages/workit`: Contains the codebase for all platforms.

## Commands
The packages.json file at the top level contains commands 
to execute Learn in each platform.

* `mobile`: Execute Metro Bundler for both IOS and Android.
* `android`: Compiles the Learn Client for Android devices.
