import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";

export const Draft = () => {
  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }

  const [teamData, setTeamData] = useState(null);

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
    fetchTeamData();
  }, []);

  console.log(teamData);

  return (
    <div>
      <Nav />
    </div>
  );
};
