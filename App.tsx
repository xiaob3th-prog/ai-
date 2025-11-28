import React, { useState } from 'react';
import Layout from './components/Layout';
import RobotListPage from './pages/RobotListPage';
import AutoRulePage from './pages/AutoRulePage';
import ManualCallPage from './pages/ManualCallPage';
import TaskListPage from './pages/TaskListPage';
import CallResultPage from './pages/CallResultPage';
import PRDPage from './pages/PRDPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('prd');

  const renderPage = () => {
    switch (currentPage) {
      case 'prd': return <PRDPage onNavigate={setCurrentPage} />;
      case 'robots': return <RobotListPage />;
      case 'rules': return <AutoRulePage />;
      case 'manual': return <ManualCallPage />;
      case 'tasks': return <TaskListPage />;
      case 'results': return <CallResultPage />;
      default: return <PRDPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;