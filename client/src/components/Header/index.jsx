import Nav from "../Nav";
import NavTabs from "../Navtabs";
export default function Header() {
  return (
    <>
      <header className="royalBlue-Bg pt-4">
        <h1 className="text-4xl text-center gold textshadowWhite">uBetr</h1>
        <Nav />
        <NavTabs />
      </header>
    </>
  );
}
