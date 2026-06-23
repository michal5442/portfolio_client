import './App.css';
import PageTitle from './components/BudgetManagementPage/TopBar/PageTitle/PageTitle';
import MainTabs from './components/BudgetManagementPage/MainTabs/MainTabs';

export default function App() {
  return (
    <div className="App" dir="rtl">
      <PageTitle />
      <MainTabs />
    </div>
  );
}
