import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { CircularProgress } from "@mui/material";

export const Draft = () => {
  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }

  const [teamData, setTeamData] = useState(null);
  const [draftOrder, setDraftOrder] = useState(null);

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

  // function shuffleTeams(arr) {
  //   let currentIndex = arr.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [arr[currentIndex], arr[randomIndex]] = [
  //       arr[randomIndex],
  //       arr[currentIndex],
  //     ];
  //   }

  //   return arr;
  // }
  // function shuffleArray(array) {
  //   for (var i = array.length - 1; i > 0; i--) {
  //     var j = Math.floor(Math.random() * (i + 1));
  //     var temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // }

  useEffect(() => {
    if (teamData) {
      setDraftOrder(
        teamData
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
    }
  }, [teamData]);

  console.log(draftOrder);

  const loading = () => {
    return (
      <CircularProgress
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        sx={{ color: "rgb(0,206,184)" }}
      />
    );
  };
  console.log(draftOrder);

  const loaded = () => {
    return (
      <div>
        <Nav />
        {draftOrder &&
          draftOrder.map((team) => {
            return <h1>{team.display_name}</h1>;
          })}
      </div>
    );
  };
  return teamData ? loaded() : loading();
};
