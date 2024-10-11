import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Past from './pages/Past';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/past" element={<Past />} />
        </Routes>
        <Footer />
      </Router>
     
    </div>
  );
}

export default App;
