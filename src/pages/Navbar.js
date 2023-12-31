import { Link } from "react-router-dom";
import './Navbar.css'
function Navbar () {
  return (
    <div className="navigation"> 
      <Link to="/" className="nav-link">Home</Link> 
      <Link to="Mint" className="nav-link">Mint</Link>
      <Link to="MyPeeps" className="nav-link">My Peeps</Link>
    </div>
  );
  
}

export default Navbar;