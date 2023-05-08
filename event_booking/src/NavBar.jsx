import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <Link to="/registration">Registration</Link>
      <br />
      <Link to="/loggin">Login</Link>
      <br />
      <Link to="/event">Create Event</Link>
      <br />
      <Link to="/event_list">Get event</Link>
      <br />
      <Link to="/abc">Axios</Link>
    </>
  );
}

export default NavBar;
