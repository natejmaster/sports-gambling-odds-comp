import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { ADD_BET } from "../utils/mutations";
import Auth from "../utils/auth";


const BetPage = () => {
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/simplified-bovada-data"
        );
        setMatchups(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchData();
  }, []);


  const [addBet, { data, error }] = useMutation(ADD_BET);

  const handleDropdownClick = (betData) => {

    Swal.fire({
      title: "Confirm Bet",
      html: `Do you want to place a bet for ${betData.units} units?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#050e44",
      cancelButtonColor: "#BD6B57",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(number, user);

        Swal.fire({
          title: "Bet Placed!",
          icon: "success",
          confirmButtonColor: "#050e44",
        }).then(() => {
          // Perform mutation using betData
          addBet({
            variables: {
              ...betData,
            },
          });
        });
      }
    });
  };

  const renderDropdown = (numbers) => {
    return numbers.map((number) => (
      <li key={number}>

        <a onClick={() => handleDropdownClick({ units: number })}>{number}</a>

      </li>
    ));
  };

  const renderMatchupButtons = (matchup) => (
    <tr key={matchup.matchup} className="border-royalBlueTop">
      <td className="text-sm font-bold royalBlue">{matchup.matchup}</td>
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <button
            tabIndex={0}
            className="gold-bg mt-12 px-2 h-16 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm font-bold lg:text-md"
            data-matchup={matchup.matchup}
            data-winner={matchup.awayTeam.name}
            data-spread={matchup.awayTeam.pointSpread}
            data-total={null}
            data-bettype="spread"
            data-endtime={matchup.endTime}
          >
            {`${matchup.awayTeam.name} ${
              matchup.awayTeam.pointSpread > 0
                ? `+${matchup.awayTeam.pointSpread}`
                : matchup.awayTeam.pointSpread
            }`}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderDropdown([
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100,
            ])}
          </ul>
        </div>
      </td>
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <button
            tabIndex={0}
            className="gold-bg mt-12 px-2 h-16 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm font-bold lg:text-md"
            data-matchup={matchup.matchup}
            data-winner={matchup.homeTeam.name}
            data-spread={matchup.homeTeam.pointSpread}
            data-total={null}
            data-bettype="spread"
            data-endtime={matchup.endTime}
          >
            {" "}
            {`${matchup.homeTeam.name} ${
              matchup.homeTeam.pointSpread > 0
                ? `+${matchup.homeTeam.pointSpread}`
                : matchup.homeTeam.pointSpread
            }`}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderDropdown([
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100,
            ])}
          </ul>
        </div>
      </td>
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <button
            tabIndex={0}
            className="gold-bg mt-12 px-2 h-16 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm font-bold lg:text-md"
            data-matchup={matchup.matchup}
            data-winner={null}
            data-spread={null}
            data-total={matchup.totalScore}
            data-bettype="overTotal"
            data-endtime={matchup.endTime}
          >{`Over ${matchup.totalScore}`}</button>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderDropdown([
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100,
            ])}
          </ul>
        </div>
      </td>
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <button
            tabIndex={0}
            className="gold-bg mt-12 px-2 h-16 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm font-bold lg:text-md"
            data-matchup={matchup.matchup}
            data-winner={null}
            data-spread={null}
            data-total={matchup.totalScore}
            data-bettype="underTotal"
            data-endtime={matchup.endTime}
          >{`Under ${matchup.totalScore}`}</button>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {renderDropdown([
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100,
            ])}
          </ul>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col white-bg mt-4 mx-5 rounded-xl border-royalBlue shadow-xl items-center justify-center mb-80">
      <h2 className="text-3xl heading">Matchups</h2>
{loading && <div className="my-16 flex flex-row">
  <p className="heading text-3xl">Loading...</p>
<div className="heading text-3xl loading loading-spinner loading-lg"></div>
</div>
}
      <table>
        <thead>
          <tr className="">
            <th className="royalBlue">Matchup</th>
            <th className="royalBlue">Away</th>
            <th className="royalBlue">Home</th>
            <th className="royalBlue">Over</th>
            <th className="royalBlue">Under</th>
          </tr>
        </thead>
        <tbody>
          {matchups.map((matchup) => renderMatchupButtons(matchup))}
        </tbody>
      </table>
    </div>
  );
};

export default BetPage;
