# 📱 Read-and-Write-with-SQLite-App

A simple and educational React Native application built with Expo that demonstrates how to **read from** and **write to** a local SQLite database on a mobile device. This app is intended for learners and developers who want a practical example of integrating SQLite with React Native using the Expo ecosystem.

> ✨ Designed for clarity and ease-of-use, this app is perfect for those new to mobile development with Expo and local data storage.

---

## 📚 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Dependencies](#-dependencies)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Introduction

This project was created to help developers understand how to implement local persistent storage using SQLite within an Expo-based React Native app. It provides a minimal yet functional example of creating and managing a user database — ideal for use cases like contact lists, offline storage, and user data management.

---

## ✨ Features

- 📦 Add new user records to a local SQLite database.
- 📄 Display a real-time list of all users stored in the database.
- 💾 Uses device-local SQLite storage (offline functionality).
- 🚀 Built using Expo for fast development and easy deployment.
- 🎨 Clean UI with user-friendly icons.

---

## ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Read-and-Write-with-SQLite-App.git
   cd Read-and-Write-with-SQLite-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo development server**:
   ```bash
   npm start
   ```

---

## ▶️ Usage

1. Open the Expo Go app on your Android/iOS device.
2. Scan the QR code generated in the terminal or browser.
3. Use the interface to:
   - Add a new user by entering their name.
   - View a list of all saved users.

> 💡 The app runs entirely on the local device — no network required!

---

## 📦 Dependencies

- **React Native** (via Expo)
- **Expo SQLite** – for database access
- **Expo CLI** – for development and testing

> All dependencies are installed via `npm install`.

---

## 🔧 Configuration

No additional configuration is required. SQLite creates a local `.db` file on the device, and the database setup is handled automatically when the app starts.

If you wish to modify the schema:
- Edit `database.js` to change the table creation logic.
- Reinstall the app to reset the database.

---

## 🛠️ Troubleshooting

- If the app fails to start, try clearing Expo’s cache:
  ```bash
  npm start -- --clear
  ```

- Ensure you have the **Expo Go** app installed on your device.
- For Android emulators, ensure they are set up with Google Play services for Expo.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions, feature requests, or improvements:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Submit a pull request.

---

## 📝 License

This project is licensed under the [MIT License](./LICENSE).