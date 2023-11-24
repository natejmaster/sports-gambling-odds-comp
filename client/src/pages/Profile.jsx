import auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
export default function Profile() {
    const username = auth.getProfile().data.username;
    const { loading, data } = useQuery(QUERY_ME);
    
    const user = data?.me || {};
    console.log(user);
 
    return (
        <>
        <div>
            <h2 className="heading text-3xl text-center">{`${username}'s Profile`}</h2>
            <h3 className="heading text-3xl text-center">Balance: {user.units} units </h3>
        </div>
        <div className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
        {user.activeBets?.length ? (
            <h3 className="heading text-3xl text-center">Active Bets</h3>
        ) : (
            <h3 className="heading text-3xl text-center">No Current Active Bets</h3>
        )}
        {user.activeBets?.map((activeBet) => {
            return (
                <div className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
                    <h3 className="heading text-3xl text-center">{activeBet.title}</h3>
                    <h3 className="heading text-3xl text-center">Bet Amount: {activeBet.betAmount}</h3>
            
                    <h3 className="heading text-3xl text-center">Bet Type: {activeBet.betType}</h3>
                    

                </div>
            )})
        }

        </div>
        <div className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
        {user.betHistory?.length ? (
            <h3 className="heading text-3xl text-center">Bet History</h3>
        ) : (
            <h3 className="heading text-3xl text-center">No Completed Bets</h3>
        )}

        {user.betHistory?.map((history) => {
            return (
                <div className="flex flex-col  white-bg mx-5 mt-16 rounded-xl border-royalBlue lg:flex-row mb-8 justify-center">
         
                    <h3 className="heading text-3xl text-center">Bet Type: {history.betType}</h3>
                    <h3 className="heading text-3xl text-center">Result: {history.result}</h3>
                </div>
            )}
        )}
        </div>


        </> 
    )   
}