import auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
export default function Profile() {
    const username = auth.getProfile().data.username;
    const { loading, data } = useQuery(QUERY_ME);
    if (loading) {
        return <h2>LOADING...</h2>;
    }
    console.log(data);
    const user = data?.me || {};
 
    return (
        <>
        <div>
            <h2 className="heading text-3xl text-center">{`${username}'s Profile`}</h2>
            <h3 className="heading text-3xl text-center">Balance: {user.units} units </h3>
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
