import './App.css';
import SummarySquares from './components/SummarySqueres/SummarySquares';
import Project from './components/Project/Project';
import { useProjects } from './services/context/ProjectsContext';

function App() {
  const { filteredProjects } = useProjects();

  return (
    <div className="App">
      פורטפוליו
      <SummarySquares />
    </div>
  );
}

export default App;
