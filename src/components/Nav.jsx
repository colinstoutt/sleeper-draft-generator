import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }
  const [leagueData, setLeagueData] = useState(null);

  // fetch league data so I can display the league name in the nav
  async function fetchLeagueData() {
    try {
      const res = await fetch(`https://api.sleeper.app/v1/league/${league_id}`);
      if (res.status === 404) {
        navigate("/league-id"); // Redirect to 404 page
      } else {
        const data = await res.json();
        setLeagueData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // on component mount, fetch league data
  useEffect(() => {
    fetchLeagueData();
  }, []);
  console.log(leagueData);

  const loading = () => {
    return (
      <>
        <div className="text-loading absolute top-8 left-10 w-40 h-2 bg-lightBg rounded-full"></div>
        <div className="text-loading absolute top-11 left-10 w-24 h-2 bg-lightBg rounded-full"></div>
      </>
    );
  };

  const loaded = () => {
    console.log(leagueData);
    return (
      <nav>
        <Link
          to="/home"
          className=" flex gap-4 items-center text-xl text-teal font-bold absolute top-5 left-5 px-6 py-2 text-sleeperGrey font-semibold"
        >
          {/* // "leagueData && leagueData.avatar" is checking to see if the data even exists before doing anthing else. if leagueData exists, render the avatar img.
           */}
          {leagueData && leagueData.avatar ? (
            <img
              className="w-12 h-12 rounded-xl"
              src={`https://sleepercdn.com/avatars/${
                leagueData && leagueData.avatar
              }`}
              alt=""
            />
          ) : null}

          <h1 className="transition-all duration-300 text-white hover:text-teal active:text-teal">
            {leagueData && leagueData.name}
          </h1>
        </Link>
        <h2 className="absolute top-[3.3rem] left-5 px-6 py-2 text-sleeperGrey font-semibold text-sm">
          League ID: {leagueData && leagueData.league_id}
        </h2>
      </nav>
    );
  };

  return leagueData ? loaded() : loading();
};

export default Nav;
