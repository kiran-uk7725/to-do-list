# 📝 TypeScript To-Do List App

A modern, responsive, and accessible To-Do List web application built with **TypeScript**, **Semantic HTML5**, and **CSS3**.

Instead of relying on direct DOM manipulation for state storage, this project uses an **array-backed state management model (`TodoItem[]`)** synchronized with `localStorage`. It features full form handling via `FormData`, dynamic list rendering with event delegation, and robust type safety.

---

## ✨ Features

- **Semantic & Accessible Layout**: Structured using HTML5 semantic elements (`<main>`, `<article>`, `<header>`, `<form>`, `<section>`) with explicit ARIA tags and visually-hidden labels for screen reader support.
- **Typed State Management**: Driven by a strongly typed data structure (`TodoItem[]`) rather than raw DOM `innerHTML` persistence.
- **Form Submission**: Uses `FormData` for clean input capturing with built-in validation, whitespace trimming, and duplicate detection.
- **Persistent Storage**: Safely persists application state across browser sessions using `localStorage` with `try...catch` JSON parsing.
- **Interactive UI**:
  - Check/uncheck tasks to mark completion with custom status styling.
  - Delete individual tasks using dataset indexing (`data-index`).
  - Fluid, responsive input bar that scales smoothly across mobile and desktop displays.

---

## 🛠️ Tech Stack

- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Markup**: Semantic HTML5
- **Styling**: Modern CSS3 (Flexbox, CSS Variables, Custom Checkbox States)
- **Tooling / Bundler**: [Vite](https://vitejs.dev/)
- **Storage**: Browser `localStorage` API

---

## 📁 Project Structure

```text
├── images/             # Static assets (icons & images)
│   ├── icon.png
│   ├── checked.png
│   └── unchecked.png
├── node_modules/       # node modules
├── scripts/
│   └── main.js         # Compiled js
├── src/
    └── main.ts         # TypeScript application logic & state management
├── styles
    └── styles.css      # CSS styling and custom layout rules
├── index.html          # Semantic HTML structure
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript compiler configuration
```

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

Ensure you have **Node.js** (version 18+ recommended) installed on your system.

- Check Node version:
  ```bash
  node -v
  ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kiran-uk7725/todo-list
   cd todo-list-typescript
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---

## ⚙️ Scripts & Commands

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Runs TypeScript type checking (`tsc`) and compiles the production bundle.
- `npm run preview`: Locally previews the production build.

---

## 💡 Code Highlights

### Strongly Typed Interface & State Model
```typescript
interface TodoItem {
  text: string;
  checked: boolean;
}

type StorageKey = "todo";
```

### Safe Persistence Pipeline
```typescript
function getStoredList(storage: Storage, key: StorageKey): TodoItem[] {
  const saved = storage.getItem(key);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as TodoItem[];
  } catch {
    return [];
  }
}
```

---