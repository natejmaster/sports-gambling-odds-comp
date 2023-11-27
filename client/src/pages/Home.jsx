import kurtWarnerimg from "../assets/images/kurtwarner.png";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
export default function Home() {
  return (
    <>
      <section className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-48">
        <img
          className="h-80  m-auto my-4 rounded-xl shadow-xl lg:m-4"
          src={kurtWarnerimg}
          alt="kurt warner"
        />
        <div className="borderLeft-royalBlue  flex flex-col items-center justify-center shadow-xl">
          <h2 className="text-3xl heading">About Us</h2>
          <p className="py-4 px-5 flex items-center justify-center royalBlue text-justify">
            Welcome to our one-stop destination for sports betting enthusiasts!
            At our website, we've simplified the quest for the most favorable
            odds across various casinos, offering you a streamlined and
            comprehensive platform to enhance your sports betting experience.
            Dive into a user-friendly interface that allows you to effortlessly
            compare odds from different casinos, empowering you to make informed
            decisions and maximize your potential returns. Whether you're into
            football, basketball, or any other sport, our platform is designed
            to provide you with a detailed overview of the odds landscape,
            helping you find the best value for your bets. Elevate your sports
            betting strategy with us, where precision meets passion, and the
            thrill of the game is complemented by the strategic advantage of
            optimal odds. Welcome to a world where your choices are informed,
            and your victories are optimized.
          </p>
          {!Auth.loggedIn() && (
          <div className="flex flex-row">
          <Link className="gold-bg py-2 px-4 rounded-xl mybtn mb-7 mt-2 font-bold text-xl shadow-xl mr-4" to="/signup">
            Signup
          </Link>
          <Link className="gold-bg py-2 px-4 rounded-xl mybtn mb-7 mt-2 font-bold text-xl shadow-xl ml-4" to="/login">
            Login
          </Link>
          </div>
          )}
        </div>
      </section>
      <section>
      </section>
    </>
  );
}
