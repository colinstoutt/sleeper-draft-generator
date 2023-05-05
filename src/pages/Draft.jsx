import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { CircularProgress } from "@mui/material";

export const Draft = () => {
  // capture league id from local storage
  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }

  const [teamData, setTeamData] = useState(null);
  const [draftOrder, setDraftOrder] = useState(null);
  const [slowReveal, setSlowReveal] = useState(false);
  const [quickReveal, setQuickReveal] = useState(false);

  // fetch data and set teamData state
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

  // on component mount, fetch team data
  useEffect(() => {
    fetchTeamData();
  }, []);

  // on component mount and if teamData is truthy, set the draft order to a random array based on teamData array. If teamData changes, run the effect again.
  useEffect(() => {
    if (teamData) {
      setDraftOrder(
        // randomize draft order using Schwartzian transform.
        teamData
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      );
      // add a 'sort' property to each object in the teamData array. 'Sort' will have a value of a random value 0-1.
      // sort through that new array of objects comparing values, if the result of the comparison is negative, b is bigger than a, if its positive a is bigger than b.
      // create a new array based on the sort.
    }
  }, [teamData]);

  console.log(draftOrder);

  // create 'loading' and 'loaded' components so the page doesnt crash since the data will be loading in asynchronously.
  const loading = () => {
    return (
      <CircularProgress
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        sx={{ color: "rgb(0,206,184)" }}
      />
    );
  };

  const loaded = () => {
    return (
      <div>
        <Nav />
        <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl text-white h-3/4 w-5/6 overflow-y-scroll">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4">
            {/* hiding the buttons when one of them is clicked */}
            {!quickReveal && !slowReveal ? (
              <div className="flex sm:flex-nowrap flex-wrap gap-4 fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <div className="bg-lightBg p-8 rounded w-72">
                  <button
                    onClick={() => {
                      setSlowReveal(true);
                    }}
                    className="px-6 py-4 mb-4 bg-darkTeal text-teal font-medium  rounded-xl uppercase shadow-md active:shadow-none"
                  >
                    Slow Reveal
                  </button>
                  <p>Reveal each draft position one at a time.</p>
                </div>

                <div className="bg-lightBg p-8 rounded w-72">
                  <button
                    onClick={() => {
                      setQuickReveal(true);
                    }}
                    className="px-6 py-4 mb-4 bg-darkTeal text-teal font-medium  rounded-xl uppercase shadow-md active:shadow-none"
                  >
                    Quick Reveal
                  </button>
                  <p>Reveal entire draft order all at once.</p>
                </div>
              </div>
            ) : null}

            {/* conditionally render the draft list based on whether quickReveal is truthy or not */}
            <div className=" rounded-md p-4 mt-16">
              {quickReveal
                ? draftOrder &&
                  draftOrder.map((team, index) => {
                    return (
                      <>
                        <div className="">
                          <h1 className="text-5xl text-teal">{index + 1}</h1>
                          <h1 key={index}>
                            {team.metadata.team_name || team.display_name}
                          </h1>
                        </div>
                      </>
                    );
                  })
                : null}
            </div>
          </div>
        </main>
      </div>
    );
  };
  // conditionally render the page based on if teamData is fully loaded in or not.
  return teamData ? loaded() : loading();
};
