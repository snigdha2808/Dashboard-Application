# Dashboard Application
Deployed-
https://snig-dashboard.netlify.app/

A modern, responsive dashboard application built with React and TypeScript. This application features a sidebar navigation, data table with infinite scroll, search functionality, and API integration.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Dashboard-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install Cypress (if not already installed)**
   ```bash
   npm install --save-dev cypress --legacy-peer-deps
   ```

## Running the Project

### Development Mode

Start the development server:

```bash
npm start
```

The application will open in your browser at [http://localhost:3000].
`

## Project Structure

```
Dashboard-Application/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Data.tsx           # Main data component with API integration
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── Home.tsx           # Home page component
│   │   ├── SearchBar.tsx      # Search input component
│   │   ├── PostsTable.tsx     # Data table component
│   │   ├── LoadingIndicator.tsx
│   │   ├── ErrorDisplay.tsx
│   │   └── InfiniteScrollTrigger.tsx
│   │   └── __tests__/         # Unit tests
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── App.tsx                # Main app component with routing
│   ├── index.tsx              # Application entry point
│   └── ...
├── cypress/
│   ├── e2e/                   # End-to-end test files
│   │   ├── navigation.cy.ts
│   │   ├── home.cy.ts
│   │   ├── data-loading.cy.ts
│   │   ├── search.cy.ts
│   │   ├── infinite-scroll.cy.ts
│   │   ├── error-handling.cy.ts
│   │   └── responsive.cy.ts
│   └── support/               # Cypress support files
│       ├── e2e.ts
│       └── commands.ts
├── package.json
├── tsconfig.json              # TypeScript configuration
├── cypress.config.ts          # Cypress configuration
└── README.md
```

## Technologies Used

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **React Router DOM 6.30.2** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **JSONPlaceholder API** - Data source

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Creates a production build
- `npm test` - Launches the unit test runner (Jest)
- `npm run cypress:open` - Opens Cypress Test Runner (interactive)
- `npm run cypress:run` - Runs Cypress E2E tests (headless)
- `npm run cypress:run:headless` - Runs Cypress tests in headless mode
- `npm run eject` - Ejects from Create React App (irreversible)

## API Integration

The application uses the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to fetch posts data:

- **Endpoint**: `https://jsonplaceholder.typicode.com/posts`
- **Pagination**: Uses `_page` and `_limit` query parameters
- **Infinite Scroll**: Automatically loads 10 posts per page

## Component Architecture

The application uses optimized component structure:

- **Memoized Components**: Components wrapped with `React.memo` to prevent unnecessary re-renders
- **Separated Concerns**: Each component has a single responsibility
- **Type Safety**: All components are fully typed with TypeScript
- **Performance**: Uses `useMemo` and `useCallback` for optimization

## E2E Testing with Cypress

The project includes comprehensive end-to-end tests using Cypress. The tests cover:

- **Navigation Tests** (`cypress/e2e/navigation.cy.ts`): Testing sidebar navigation and routing
- **Home Page Tests** (`cypress/e2e/home.cy.ts`): Testing home page content
- **Data Loading Tests** (`cypress/e2e/data-loading.cy.ts`): Testing API integration and data display
- **Search Tests** (`cypress/e2e/search.cy.ts`): Testing search functionality and filtering
- **Infinite Scroll Tests** (`cypress/e2e/infinite-scroll.cy.ts`): Testing pagination and infinite scroll
- **Error Handling Tests** (`cypress/e2e/error-handling.cy.ts`): Testing error states
- **Responsive Tests** (`cypress/e2e/responsive.cy.ts`): Testing responsive design across viewports

### Running E2E Tests

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **In a new terminal, open Cypress**:
   ```bash
   npm run cypress:open
   ```

3. **Select a test file** from the Cypress Test Runner to run interactively

4. **Or run all tests headlessly**:
   ```bash
   npm run cypress:run
   ```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm start
```

### Dependency Issues

If you encounter dependency conflicts:

```bash
npm install --legacy-peer-deps
```

### TypeScript Errors

Ensure all TypeScript dependencies are installed:

```bash
npm install --save-dev typescript @types/react @types/react-dom @types/node @types/jest --legacy-peer-deps
```W
