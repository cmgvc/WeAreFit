import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Past from './pages/Past';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/past" element={<Past />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Footer />
      </Router>
     
    </div>
  );
}

export default App;
