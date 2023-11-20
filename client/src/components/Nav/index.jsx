import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Swal from "sweetalert2";
export default function Nav() {
  const logout = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "You have successfully logged out.",
      icon: "success",
      confirmButtonColor: "#050e44",
    });
    setTimeout(() => {
      Auth.logout();
    }, 2000);
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
