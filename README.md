# Widget Dashboard Application

This project is a simple widget dashboard built using React. It allows users to add and remove widgets locally, leveraging Redux for state management.

## Features

- Add new widgets to specific categories.
- Remove existing widgets.
- Persist state locally using Redux.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management tool.
- **Material-UI (MUI)**: React component library for UI design.
- **Redux Toolkit**: A set of tools that simplify Redux development.
  
## Prerequisites

Before running this project, make sure you have the following installed on your system:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher) or **yarn** (v1.x or higher)

## Folder Structure
**src/:** Contains all the source code for the application.
- **components/:** Reusable UI components.
- **store/:** Redux slices and store configuration.
- **App.js:** Main component that renders the application.
- **index.js:** Entry point of the application.
  
## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/widget-dashboard.git
cd widget-dashboard
```

### 2. Install Dependencies

- If you use npm:
```bash
npm install
```

- If you use yarn:
```bash
yarn install
```

### 3. Run the Application
To start the application in development mode, run:
- If you use npm:
```bash
npm start
```

- If you use yarn:
```bash
yarn start
```

### 4. Building the Application
To create a production build, run:
- If you use npm:
```bash
npm run build
```

- If you use yarn:
```bash
yarn build
```

### 5. Adding or Removing Widgets
- **Add Widget:** Click on the "Add Widget" button to open the dialog. Fill in the title and text fields, and select the category to add the widget to.
- **Remove Widget:** Click the delete (X) button on the widget card to remove it from the list.
