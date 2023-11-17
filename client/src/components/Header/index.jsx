import { Link } from "react-router-dom";
import NavTabs from "../Navtabs";
export default function Header() {
  return (
    <>
      <header className="royalBlue-Bg pt-4">
        <h1 className="text-4xl text-center gold textshadowWhite">
          Better's Bible
        </h1>
        <nav className="flex justify-end">
          <Link to="/login" className="linkGold underline px-4">
            Login
          </Link>
          <Link to="/signup" className="linkGold underline px-4">
            Signup
          </Link>
        </nav>
      <NavTabs />
      </header>
    </>
  );
}
