

# Loan Tree Visualizer

A tree-based visualizer built with **React + TypeScript + Tailwind CSS + React Flow** for managing hierarchical loan entities like Accounts, Loans, and Collaterals.

> 🔗 [Live Demo](https://your-deployment-link.vercel.app)



## 📌 Overview

This application allows users to visually construct and manage a tree structure for a loan management system. Users can:

- Add **Account** or **Loan** nodes at the root level.
- Add valid children based on the selected node.
- View node details and delete a node (with all its descendants).
- See the tree update automatically with an **auto-layout**.



## 🧠 Node Types & Rules

| Node Type   | Description                  | Allowed Children     |
|-------------|------------------------------|-----------------------|
| Account     | Represents a customer's account | Loan, Collateral     |
| Loan        | A loan issued to an account  | Collateral            |
| Collateral  | Asset pledged against a loan | None                 |

- **Only "Account" and "Loan"** can be added as root nodes.
- Each node has a unique ID (via `nanoid`).



## ⚙️ Tech Stack

- **React** + **TypeScript**
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **React Flow** for graph rendering
- **Dagre** for automatic layout (top-to-bottom)
- **Zustand** for state management
- **Lucide React** for icons



## 🧱 Project Structure

```

src/
├── components/
│   ├── NodeSidebar.tsx
│   └── nodes/
│       ├── AccountNode.tsx
│       ├── LoanNode.tsx
│       └── CollateralNode.tsx
├── hooks/
│   └── useTreeStore.ts
├── utils/
│   └── layout.ts
├── App.tsx
├── main.tsx

````



## 🎨 UX Design Decisions

* 📌 **Left Side**: Visual canvas with buttons to add root nodes.
* 🧾 **Right Sidebar**: View node details, add children, or delete the node.
* 🔁 **Auto-layout** using `dagre` ensures tree stays organized after any change.
* 🔍 **Custom-styled nodes** (icons + colors) for each entity type.



## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/loan-tree-visualizer.git
cd loan-tree-visualizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

