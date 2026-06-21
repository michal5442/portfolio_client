import { useState } from 'react';
import './App.css';
import PageTitle from './components/BudgetManagementPage/TopBar/PageTitle/PageTitle';
import SummarySquares from './components/BudgetManagementPage/SummarySqueres/SummarySquares';
import ProjectsList from './components/BudgetManagementPage/ProjectsList/ProjectsList';

function App() {
  const [view, setView] = useState('split');
  return (
    <div className="App" dir="rtl">
      <PageTitle view={view} onViewChange={setView} />

      <main>
        <SummarySquares />
        <ProjectsList view={view} />
      </main>
    </div>
  );
}

export default App;