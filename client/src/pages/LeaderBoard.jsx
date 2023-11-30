import { QUERY_USERS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";

export default function LeaderBoard() {
  const { loading, data, refetch } = useQuery(QUERY_USERS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      const sortedUsers = data.users
        .slice(0, 10)
        .sort((a, b) => b.units - a.units);

      setUsers(sortedUsers);
    }
  }, [data]);
  const username = Auth.getProfile().data.username;
  return (
    <>
      <div className="flex flex-col white-bg mx-5 mt-5 py-2 rounded-xl border-royalBlue mb-32 justify-center">
        <h2 className="heading text-3xl text-center">Leaderboard</h2>
        <h3 className="heading text-3xl text-center">Top 10</h3>
        <ol className="flex flex-col list-decimal">
          {users.map((user, index) => (
            <li
              key={user._id}
              className="flex flex-col justify-center items-center border-royalBlueTop"
            >
              <p
                className={
                  username === user.username
                    ? "heading text-2xl font-bold text-center"
                    : "text-xl font-bold text-center"
                }
              >
                {index === 0
                  ? "1st"
                  : index === 1
                  ? "2nd"
                  : index === 2
                  ? "3rd"
                  : index >= 3 && index <= 10
                  ? `${index + 1}th`
                  : ""}{" "}
                {user.username}
              </p>
              <p className="royalBlue font-bold">{user.units} units</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
