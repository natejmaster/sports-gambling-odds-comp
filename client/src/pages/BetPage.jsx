import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { ADD_BET } from "../utils/mutations";
import Auth from "../utils/auth";

const BetPage = () => {
  const [matchups, setMatchups] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://rocky-hollows-26852-54ebc26e9935.herokuapp.com"
      : "http://localhost:3001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/simplified-bovada-data`
        );
        setMatchups(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [addBet, { data, error }] = useMutation(ADD_BET);

  const handleDropdownClick = (betData) => {
    Swal.fire({
      title: "Confirm Bet",
      html: `Do you want to place a bet for ${betData.units} Units?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#050e44",
      cancelButtonColor: "#BD6B57",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Bet Placed!",
          icon: "success",
          confirmButtonColor: "#050e44",
        }).then(() => {
          const payloadWithBetStatus = { ...betData, betStatus: "active" };
          addBet({
            variables: payloadWithBetStatus,
          });
        });
      }
    });
  };

  const renderDropdown = (numbers, betData) => {
    return numbers.map((number) => (
      <li key={number}>
        <a onClick={() => handleDropdownClick({ ...betData, units: number })}>
          {number}
        </a>
      </li>
    ));
  };

  const renderMatchupButtons = (matchup) => (
    <tr key={matchup.matchup} className="border-royalBlueTop">
      <td className="text-xs md:text-sm lg:text-lg font-bold royalBlue text">
        {matchup.matchup}
      </td>

      {/* Spread */}
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <div
            className=" tooltip mt-12 mb-7 w-full "
            data-tip="Click to place bets!"
          >
            <button
              tabIndex={0}
              className="gold-bg  md:px-2 h-16 rounded-xl royalBlue mybtn shadow-xl w-full text-xs font-bold md:text-md"
              data-matchup={matchup.matchup}
              data-winner={matchup.awayTeam.name}
              data-spread={parseFloat(matchup.awayTeam.pointSpread)}
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
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* Dropdown content for Spread */}
            {renderDropdown(
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100],
              {
                betType: "spread",
                matchup: matchup.matchup,
                spread: parseFloat(matchup.awayTeam.pointSpread),
                endTime: matchup.endTime,
                winner: matchup.awayTeam.name,
              }
            )}
          </ul>
        </div>
      </td>
      {/* Home Spread */}
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <div
            className=" tooltip mt-12 mb-7 w-full "
            data-tip="Click to place bets!"
          >
            <button
              tabIndex={0}
              className="gold-bg  md:px-2 h-16 rounded-xl royalBlue mybtn  shadow-xl w-full text-xs font-bold md:text-md"
              data-matchup={matchup.matchup}
              data-winner={matchup.homeTeam.name}
              data-spread={parseFloat(matchup.homeTeam.pointSpread)}
              data-total={null}
              data-bettype="spread"
              data-endtime={matchup.endTime}
            >
              {`${matchup.homeTeam.name} ${
                matchup.homeTeam.pointSpread > 0
                  ? `+${matchup.homeTeam.pointSpread}`
                  : matchup.homeTeam.pointSpread
              }`}
            </button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* Dropdown content for Home Spread */}
            {renderDropdown(
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100],
              {
                betType: "spread",
                matchup: matchup.matchup,
                spread: parseFloat(matchup.homeTeam.pointSpread),
                endTime: matchup.endTime,
                winner: matchup.homeTeam.name,
              }
            )}
          </ul>
        </div>
      </td>
      {/* Over Total */}
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <div className="tooltip mt-12 mb-7 " data-tip="Click to place bets!">
            <button
              tabIndex={0}
              className="gold-bg  md:px-2 h-16 rounded-xl royalBlue mybtn  shadow-xl w-full text-xs font-bold md:text-md"
              data-matchup={matchup.matchup}
              data-winner={null}
              data-spread={null}
              data-total={matchup.totalScore}
              data-bettype="overTotal"
              data-endtime={matchup.endTime}
            >{`Over ${matchup.totalScore}`}</button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* Dropdown content for Over Total */}
            {renderDropdown(
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100],
              {
                betType: "overTotal",
                matchup: matchup.matchup,
                totalScore: matchup.totalScore,
                endTime: matchup.endTime,
              }
            )}
          </ul>
        </div>
      </td>
      {/* Under Total */}
      <td>
        <div className="dropdown mb-4 flex ml-1">
          <div
            className=" tooltip mt-12 mb-7 w-full "
            data-tip="Click to place bets!"
          >
            <button
              tabIndex={0}
              className="gold-bg  md:px-2 h-16 rounded-xl royalBlue mybtn shadow-xl w-full text-xs font-bold md:text-md"
              data-matchup={matchup.matchup}
              data-winner={null}
              data-spread={null}
              data-total={matchup.totalScore}
              data-bettype="underTotal"
              data-endtime={matchup.endTime}
            >{`Under ${matchup.totalScore}`}</button>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mt-12 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* Dropdown content for Under Total */}
            {renderDropdown(
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100],
              {
                betType: "underTotal",
                matchup: matchup.matchup,
                totalScore: matchup.totalScore,
                endTime: matchup.endTime,
              }
            )}
          </ul>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col white-bg mt-4 mx-5 rounded-xl border-royalBlue shadow-xl items-center justify-center mb-80">
      <h2 className="text-3xl heading mt-4 mb-2">Matchups</h2>

      {loading && (
        <div className="my-16 flex flex-row">
          <p className="heading text-3xl">Loading Matchups...</p>
          <div className="heading text-3xl loading loading-spinner loading-lg"></div>
        </div>
      )}
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
