import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>
      <Link to="/admin" style={{ margin: "10px" }}>Admin</Link>
      <Link to="/doctor" style={{ margin: "10px" }}>Doctor</Link>
      <Link to="/patient" style={{ margin: "10px" }}>Patient</Link>
    </nav>
  );
}
export default Navbar;