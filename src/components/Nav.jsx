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

  useEffect(() => {
    fetchLeagueData();
  }, []);
  console.log(leagueData);

  return (
    <nav>
      <Link
        to="/"
        className=" flex gap-4 items-center text-xl text-teal font-bold fixed top-5 left-5 px-6 py-2 text-sleeperGrey font-semibold"
      >
        {leagueData && leagueData.avatar ? (
          <img
            className="w-12 h-12 rounded-xl"
            src={`https://sleepercdn.com/avatars/${
              leagueData && leagueData.avatar
            }`}
            alt=""
          />
        ) : (
          <></>
        )}

        <h1 className="transition-all duration-300 text-white hover:text-teal active:text-teal">
          {leagueData && leagueData.name}
        </h1>
      </Link>

      <Link
        to="/league-id"
        className="fixed bottom-7 left-5 px-6 py-2 text-sleeperGrey hover:text-teal active:text-teal uppercase font-slim"
      >
        <h4 className="transition-all duration-300">Change League</h4>
      </Link>
    </nav>
  );
};

export default Nav;
