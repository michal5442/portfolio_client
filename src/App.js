import './App.css';
import PageTitle from './components/BudgetManagementPage/TopBar/PageTitle/PageTitle';
import MainTabs from './components/BudgetManagementPage/MainTabs/MainTabs';
import SummarySquares from './components/BudgetManagementPage/SummarySqueres/SummarySquares';

export default function App() {
  return (
    <div className="App" dir="rtl">
      <PageTitle />
      <SummarySquares />
      <MainTabs />
    </div>
  );
}
