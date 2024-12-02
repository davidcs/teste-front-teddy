import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList.jsx';
import LoginScreen from './components/LoginScreen.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/list" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;