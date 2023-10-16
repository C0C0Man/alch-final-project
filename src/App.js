import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Mint from './pages/Mint';
import Navbar from './pages/Navbar';





function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='mint' element={<Mint />}/>
          <Route path='*' element={<h1> Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
