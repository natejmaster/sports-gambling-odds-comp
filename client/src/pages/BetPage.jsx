import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BetPage = () => {
  const [matchups, setMatchups] = useState([]);
  const [betAmount, setBetAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/simplified-bovada-data"
        );
        setMatchups(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDropdownClick = (number) => {
    // Use SweetAlert to show a confirmation dialog
    Swal.fire({
      title: "Confirm Bet",
      html: `Do you want to place a bet for ${number} units?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#050e44",
      cancelButtonColor: "#BD6B57",
    }).then((result) => {
      // If the user clicks "Yes", set the bet amount
      if (result.isConfirmed) {
        console.log(number);
        setBetAmount(number);
        // You can add additional logic or API calls for placing the bet here
        Swal.fire({
          title: "Success!",
          text: `You have successfully placed a bet for ${number} units... Good luck.`,
          icon: "success",
          confirmButtonColor: "#050e44",
        });
      }
    });
  };

  const renderDropdown = (numbers) => {
    return numbers.map((number) => (
      <li key={number}>
        <a onClick={() => handleDropdownClick(number)}>{number}</a>
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
          >
            {" "}
            {`${matchup.awayTeam.name} ${
              matchup.awayTeam.pointSpread > 0
                ? `+${matchup.awayTeam.pointSpread}`
                : matchup.awayTeam.pointSpread
            }`}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
          >{`Over ${matchup.totalScore}`}</button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
          >{`Under ${matchup.totalScore}`}</button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
    <div className="flex flex-col white-bg mt-4 mx-5 rounded-xl border-royalBlue items-center justify-center mb-32">
      <h2 className="text-3xl heading">Matchups</h2>

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
