# 🖼️ WallDo

**WallDo** is a minimal, elegant desktop wallpaper app that displays your to-do list directly on your desktop background.

## ✨ Features

- **Wallpaper Rendering**: Your to-do list is rendered onto your desktop wallpaper
- **⚡ Live Sync**: Changes update your wallpaper automatically
- **🎨 Themes**: Multiple dark themes designed for perfect desktop contrast
- **🖥️ Cross-Platform**: Support for **Windows**, **macOS**, and **Linux**
- **🌑 OLED-Dark Design**: Clean, glassmorphic interface

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or higher)
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

## 💻 Development

Start the app in development mode:

```bash
npm run dev
```

## 📦 Building for Production

### Windows

```bash
npm run package:win
```

### macOS

```bash
npm run package:mac
```

### Linux

```bash
npm run package:linux
```

The built files will be in the `dist/` folder.

The built files will be in the `dist/` folder.

## 🛠️ Tech Stack

- **Framework**: [Electron](https://www.electronjs.org/)
- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [electron-vite](https://electron-vite.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Processing**: `html-to-image`
- **OS Integration**: `wallpaper` package

## 📄 License

MIT

---

Crafted with ❤️ for a focused desktop experience.
