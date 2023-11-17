export default function Footer() {
  return (
    <>
      <footer className="royalBlue-Bg lg:fixed lg:bottom-0 w-full">
        <h6 className="text-3xl text-center pt-4 pb-2 gold textshadowWhite ">
          Made by: Team 1
        </h6>
        <div className="flex flex-col items-center text-white lg:flex-row lg:justify-around pb-4 ">
          <a
            className="linkGold text-xl underline"
            href="https://resilient-choux-74db25.netlify.app/"
            target="_blank"
          >
            Kevin Donnelly
          </a>
          <a
            className="linkGold text-xl underline"
            href="https://github.com/natejmaster"
            target="_blank"
          >
            Nate Master
          </a>
          <a
            className="linkGold text-xl underline"
            href="https://jackstendeback.com"
            target="_blank"
          >
            Jack Stendeback
          </a>
        </div>
      </footer>
    </>
  );
}
