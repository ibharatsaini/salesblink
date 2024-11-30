import logo from './logo.svg';
import './App.css';
import './index.css'
import { Route, Routes } from 'react-router';
import Header from './Components/Header';
import Dashboard from './Dashboard';
import Outreach from './Outreach';
function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/outreach" element={<Outreach />} />
      </Routes>
    </div>
  );
}

export default App;
