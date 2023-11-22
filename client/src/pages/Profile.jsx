import auth from "../utils/auth";
export default function Profile() {
    const username = auth.getProfile().data.username;

 
    return (
        <>
        <div>
            <h2 className="heading text-3xl text-center">{`${username}'s Profile`}</h2>
            <h3 className="heading text-3xl text-center">Balance: need to code this </h3>
        </div>
        <div className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
            <h3 className="heading text-3xl text-center">Active Bets</h3>
        </div>
        <div className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
            <h4 className="heading text-3xl text-center">Completed Bets</h4>
        </div>
        </> 
    );
}
