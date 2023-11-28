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
          Have you always wanted to take part in the exciting world of sports gambling, but didn't
          have the disposable funds to bet the way you want? Maybe sports gambling isn't legal in your
          state and you don't want to drive across state lines every time you want a make a game more exciting?
          Then you better check out uBetr, a free-to-play online micro-sportsbook for the NFL that lets you bet on
          up-to-date odds for upcoming NFL games and bet using an easy-to-manage virtual currency: units. Once you've
          signed up, or logged in for our returning users, click on the 'Place Bets!' tab to get started with betting on
          games! If you're wondering if you should check out this fun, stake-free way to gamble on NFL games and you're not
          sure? Just trust us -- uBetr try it out!
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
