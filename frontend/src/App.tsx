import logo from './logo.svg';
import './App.css';
import './index.css'
import { redirect, Route, Routes } from 'react-router';
import Header from './Components/Header';
import Dashboard from './Dashboard';
import Outreach from './Outreach';
import NewSequence from './NewSequence';
function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<NewSequence />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/outreach" element={<Outreach />} />
        <Route path="/outreach/sequence" element={<NewSequence />} />
      </Routes>
      
    </div>
  );
}

export default App;
