import { QUERY_USERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
    const { loading, data, refetch } = useQuery(QUERY_USERS);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (data) {
            const sortedUsers = data.users.slice(0,10).sort((a, b) => b.units - a.units);

            setUsers(sortedUsers);
        }
    }
        , [data]);
console.log(users);
    return (
       <>
       <div className="flex flex-col  white-bg mx-5 mt-5 py-2 rounded-xl border-royalBlue  mb-8 justify-center">
            <h2 className="heading text-3xl text-center">Leaderboard</h2>
            <h3 className="heading text-3xl text-center">Top 10</h3>
            <ol className="flex flex-col">
           {users.map((user) => {
                return (
                    
                        <li className="flex flex-col justify-center items-center border-royalBlueTop ">
                        <h3 className="heading text-xl font-bold text-center">
                            {user.username}
                        </h3>
                        <p className="royalBlue font-bold">{user.units}</p></li>
                     
                        
                )
            })}   </ol>
            </div>
       </>
    )
}