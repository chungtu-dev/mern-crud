import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
// import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/view/:id" element={<Details/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// https://github.com/harsh17112000/crud/blob/main/client/src/components/Home.js
// https://github.com/mfikricom/Mern-Stack-Frontend/blob/main/src/components/UserList.js