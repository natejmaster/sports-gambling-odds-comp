import React, { useEffect, useState } from "react";
import axios from "axios";

const BetPage = () => {
  const [matchups, setMatchups] = useState([]);

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

  const renderMatchupButtons = (matchup) => (
    <tr key={matchup.matchup} className="border-royalBlueTop">
      <td className="text-sm">{matchup.matchup}</td>
      <td>
        <div className="dropdown mb-4">
  <button tabIndex={0} className="gold-bg mt-12 px-2 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm lg:text-md">    {`${matchup.awayTeam.name} ${
            matchup.awayTeam.pointSpread > 0
              ? `+${matchup.awayTeam.pointSpread}`
              : matchup.awayTeam.pointSpread
          }`}</button>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
    <li><a>4</a></li>
    <li><a>5</a></li>
    <li><a>6</a></li>
    <li><a>7</a></li>
    <li><a>8</a></li>
    <li><a>9</a></li>
    <li><a>10</a></li>
  </ul>
</div>
      </td>
      <td>
    
        <div className="dropdown mb-4">
  <button tabIndex={0} className="gold-bg mt-12 px-2 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm lg:text-md"> {`${matchup.homeTeam.name} ${
            matchup.homeTeam.pointSpread > 0
              ? `+${matchup.homeTeam.pointSpread}`
              : matchup.homeTeam.pointSpread
          }`}</button>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
    <li><a>4</a></li>
    <li><a>5</a></li>
    <li><a>6</a></li>
    <li><a>7</a></li>
    <li><a>8</a></li>
    <li><a>9</a></li>
    <li><a>10</a></li>
  </ul>
</div>
      </td>
      <td>
        <div className="dropdown mb-4">
  <button tabIndex={0} className="gold-bg mt-12 px-2 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm lg:text-md">{`Over ${matchup.totalScore}`}</button>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
    <li><a>4</a></li>
    <li><a>5</a></li>
    <li><a>6</a></li>
    <li><a>7</a></li>
    <li><a>8</a></li>
    <li><a>9</a></li>
    <li><a>10</a></li>
  </ul>
</div>
      </td>
      <td>
        <div className="dropdown mb-4">
  <button tabIndex={0} className="gold-bg mt-12 px-2 rounded-xl royalBlue mybtn mb-7  shadow-xl w-full text-sm lg:text-md">{`Under ${matchup.totalScore}`}</button>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>1</a></li>
    <li><a>2</a></li>
    <li><a>3</a></li>
    <li><a>4</a></li>
    <li><a>5</a></li>
    <li><a>6</a></li>
    <li><a>7</a></li>
    <li><a>8</a></li>
    <li><a>9</a></li>
    <li><a>10</a></li>
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
          <tr>
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
