import { Link } from "react-router-dom";
function Navbar () {
    return(
        <div>
        <Link to='/'> Home </Link>
        <Link to='Mint'> Mint </Link>
        <Link to='MyPeeps'>My Peeps</Link>
      </div>
    );
}

export default Navbar;