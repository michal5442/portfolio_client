import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApiProvider } from './services/context/ApiContext';
import { ProjectsProvider } from './services/context/ProjectsContext';
import reportWebVitals from './reportWebVitals';
import { BUDGET_COLORS } from './constants/chartConstants';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider initialBase={process.env.REACT_APP_API_BASE}>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Expose chart colors as CSS variables so CSS can reuse the same palette.
Object.entries(BUDGET_COLORS).forEach(([key, hex]) => {
  try {
    document.documentElement.style.setProperty(`--color-${key.toLowerCase()}`, hex);
  } catch (e) {
    // defensive: if document isn't available (e.g., during tests), ignore
  }
});
