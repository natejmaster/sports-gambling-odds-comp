import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Swal from "sweetalert2";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
export default function Nav() {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me || {};
  // useEffect hook to refetch data on page load
  useEffect(() => {
    const refetchInterval = setInterval(() => {
      refetch();
    }, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(refetchInterval);
  }, [refetch]);
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
        <>
          <p className="gold ml-auto px-4">Balance: {user.units} Units</p>
          <button className="linkGold underline px-4" onClick={logout}>
            Logout
          </button>
        </>
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
