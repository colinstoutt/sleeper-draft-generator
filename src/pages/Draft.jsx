import React, { useEffect, useState } from "react";

export const Draft = () => {
  const [leagueData, setLeagueData] = useState(null);
  const [teamData, setTeamData] = useState(null);

  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }

  async function fetchLeagueData() {
    try {
      const res = await fetch(`https://api.sleeper.app/v1/league/${league_id}`);
      const data = await res.json();
      setLeagueData(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTeamData() {
    try {
      const res = await fetch(
        `https://api.sleeper.app/v1/league/${league_id}/users`
      );
      const data = await res.json();
      setTeamData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchLeagueData();
    fetchTeamData();
  }, []);

  console.log(leagueData);
  console.log(teamData);

  return <div>Draft</div>;
};
