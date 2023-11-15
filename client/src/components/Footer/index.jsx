export default function Footer () {
  return (
    <>
      <footer className=" blue-bg lg:fixed lg:bottom-0 w-full">
        <h6 className="text-3xl text-white text-center">Made by: Team 1</h6>
        <div className="flex flex-col items-center text-white lg:flex-row lg:justify-around ">
            <a href="https://github.com/KDonnelly33" target="_blank">Kevin Donnelly</a>
            <a href="https://github.com/natejmaster" target="_blank">Nate Master</a>
            <a href="https://github.com/JackStendeback" target="_blank">Jack Stendeback</a>

        </div>
      </footer>
    </>
  )
}