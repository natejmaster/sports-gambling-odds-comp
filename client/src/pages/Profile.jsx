import auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
export default function Profile() {
    const username = auth.getProfile().data.username;
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};
    
    return (
        <>
        <div className="flex flex-col  white-bg mx-5 mt-5 py-2 rounded-xl border-royalBlue  mb-8 justify-center">
            <h2 className="royalBlue text-3xl text-center">{`${username}'s Profile`}</h2>
            <h3 className="royalBlue text-3xl text-center">Balance: <span className="heading text-3xl">{user.units} units</span> </h3>
        </div>
        <div className="flex flex-col  white-bg mx-5   rounded-xl border-royalBlue justify-center">
        {user.activeBets?.length ? (
            <h3 className="heading text-3xl text-center">Active Bets</h3>
        ) : (
            <h3 className="heading text-3xl text-center">No Current Active Bets</h3>
        )}
                <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center">
        {user.activeBets?.map((activeBet) => {
            return (
       
                <div className="flex flex-col border-royalBlueTop  justify-center items-center mx-5 h-60 lg:w-5/12 ">
                    <h3 className="heading text-xl font-bold text-center">Matchup</h3>
                    <p className="royalBlue font-bold">{activeBet.matchup}</p>
                    <h3 className="heading text-xl font-bold text-center">Bet Type</h3>
                    {activeBet.betType === "spread" ? (
                        <>
                        <p className="royalBlue font-bold">Spread {activeBet.spread}</p>
                        <h3 className="heading text-xl font-bold text-center">Predicted Winner</h3>
                        <p className="royalBlue font-bold">{activeBet.winner}</p>
                        
                        </>
                    ) : activeBet.betType === "overTotal" ? (
                        <p className="royalBlue font-bold">Over Total</p>
                    ) : (
                        <p className="royalBlue font-bold">Under Total</p>
                    )}
                    <h3 className="heading text-xl font-bold text-center">Amount Bet</h3>
                    <p className="royalBlue font-bold">{activeBet.units}</p>
                    </div>

            )}
        )}</div>
            </div>
      
        <div className="flex flex-col  white-bg mx-5 mb-40 mt-4 rounded-xl border-royalBlue lg:flex-row  justify-center">
        {user.betHistory?.length ? (
            <h3 className="heading text-3xl text-center">Bet History</h3>
        ) : (
            <h3 className="heading text-3xl text-center">No Completed Bets</h3>
        )}

        {user.betHistory?.map((history) => {
            return (
                <div className="flex flex-col  white-bg mx-5  rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
         
                    <h3 className="heading text-3xl text-center">Bet Type: {history.betType}</h3>
                    <h3 className="heading text-3xl text-center">Result: {history.result}</h3>
                </div>
            )}
        )}
        </div>


        </> 
    )   
}