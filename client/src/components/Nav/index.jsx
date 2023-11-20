import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
export default function Nav() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="flex justify-end">
      {Auth.loggedIn() ? (
        <button className="linkGold underline px-4" onClick={logout}>
          logout
        </button>
      ) : (
        <>
          <Link to="/login" className="linkGold underline px-4">
            Login
          </Link>
          <Link to="/signup" className="linkGold underline px-4">
            Signup
          </Link>
        </>
      )}
    </nav>
  );
}
