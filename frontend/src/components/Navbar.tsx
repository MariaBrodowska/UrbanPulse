import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

interface NavbarProps {
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ userEmail }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true
      });
      navigate('/login');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/datasets">UrbanPulse</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/datasets" className={`nav-link ${isActive('/datasets')}`}>Datasets</Link>
        <Link to="/charts" className={`nav-link ${isActive('/visualizations')}`}>Charts</Link>
      </div>
      
      <div className="navbar-user">
          <>
            <span className="user-email">{userEmail}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
      </div>
    </nav>
  );
};

export default Navbar;