# 🖼️ WallDo

**WallDo** is a minimal, elegant desktop to-do list that lives on your wallpaper. Manage your tasks in a beautiful OLED-dark interface and have them automatically rendered onto your desktop background in real-time.

![WallDo UI Mockup](https://raw.githubusercontent.com/echo-ilovech3ss/walldo/main/src/renderer/src/assets/preview.png) *(Add a screenshot here later!)*

## ✨ Features

- **Wallpaper Rendering**: Your to-do list is baked into your wallpaper using high-quality rendering.
- **⚡ Live Sync**: Once enabled, every change you make in the app (adding, completing, or deleting tasks) updates your wallpaper automatically within seconds.
- **🎨 Premium Themes**: 6 curated, deep-gradient themes designed for perfect desktop contrast and OLED displays.
- **🖥️ Cross-Platform**: Native support for **macOS** and **Windows** with platform-specific window controls and layouts.
- **🌑 OLED-Dark Design**: A glassmorphic, focused interface that stays out of your way.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/echo-ilovech3ss/walldo.git
   cd walldo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the app in development mode with Hot Module Replacement (HMR):
```bash
npm run dev
```

## 📦 Building for Production

### macOS
To create a packaged `.app` or `.dmg`:
```bash
npm run build:mac
```

### Windows
To create a packaged `.exe` or installer:
```bash
npm run build:win
```

## 🛠️ Tech Stack

- **Framework**: [Electron](https://www.electronjs.org/)
- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [electron-vite](https://electron-vite.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Processing**: `html-to-image` for canvas capture.
- **OS Integration**: `wallpaper` for system-level background setting.

## 📄 License
MIT

---
Crafted with ❤️ for a focused desktop experience.
