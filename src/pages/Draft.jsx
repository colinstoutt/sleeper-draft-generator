import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { Loader } from "../components/Loader";
import chime from "../assets/chime.wav";

export const Draft = () => {
  // capture league id from local storage
  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }
  // NFL draft chime sound for whenever a draft starts
  function playChime() {
    new Audio(chime).play();
  }

  const [teamData, setTeamData] = useState(null);
  const [draftOrder, setDraftOrder] = useState(null);
  const [slowReveal, setSlowReveal] = useState(false);
  const [quickReveal, setQuickReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // trigger button animation and set a time delay
  const handleRevealPick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setIsAnimating(false);
    }, 1500);
  };

  console.log(currentIndex);
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

  console.log(teamData);

  // on component mount and if teamData is truthy, set the draft order to a random array based on teamData array. If teamData changes, run the effect again.
  // fish yates shuffle
  useEffect(() => {
    if (teamData) {
      function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      }
      setDraftOrder(shuffleArray(teamData));
    }
  }, [teamData]);

  // console.log(draftOrder);

  // create 'loading' and 'loaded' components so the page doesnt crash since the data will be loading in asynchronously.
  const loading = () => {
    return (
      <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2">
        <Loader />
      </div>
    );
  };

  const loaded = () => {
    return (
      <div>
        <Nav />
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 text-white h-3/4 w-5/6">
          {/* hiding the buttons when one of them is clicked */}
          {!quickReveal && !slowReveal ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col flex-wrap md:flex-row sm:flex-nowrap gap-4 ">
                <div className="bg-lightBg p-8 rounded w-72">
                  <button
                    onClick={() => {
                      setSlowReveal(true);
                      playChime();
                    }}
                    className="text-xl px-6 py-4 mb-4 bg-darkTeal text-teal font-medium uppercase shadow-md active:shadow-none"
                  >
                    Slow Reveal
                  </button>
                  <p className="text-lg font-light">
                    Click here to reveal each draft position one at a time.
                  </p>
                </div>

                <div className="bg-lightBg p-8 rounded w-72">
                  <button
                    onClick={() => {
                      setQuickReveal(true);
                      playChime();
                    }}
                    className="text-xl px-6 py-4 mb-4 bg-darkTeal text-teal font-medium uppercase shadow-md active:shadow-none"
                  >
                    Quick Reveal
                  </button>
                  <p className="text-lg font-light">
                    Click here to reveal the entire draft order all at once.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="sm:flex sm:justify-center items-center">
            <div
              className={
                slowReveal && currentIndex <= 0
                  ? "absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2 mb-12"
                  : "m-auto"
              }
            >
              {/* conditionally render title based on current index or if quickReveal is truthy */}
              {currentIndex > 0 || quickReveal ? (
                <h1 className="text-3xl font-semibold mb-8">Draft Order</h1>
              ) : null}
              {/* conditionally render the draft list based on whether slowReveal is truthy or not */}
              {slowReveal
                ? draftOrder &&
                  draftOrder.map((team, index) => {
                    const lastTeam = index === draftOrder.length - 1;
                    return (
                      <div key={index} className="mb-1.5">
                        {currentIndex <= index ? null : (
                          <div className="flex">
                            {" "}
                            <h1 className="flex items-center justify-center sm:text-3xl text-xl text-darkTeal bg-offWhite sm:h-24 h-16 sm:w-24 w-24">
                              {index + 1}
                            </h1>
                            <img
                              className="sm:w-24 sm:h-24 w-16 h-16"
                              src={
                                team.metadata.avatar ||
                                // add default image incase user hasnt set a team avatar yet
                                "https://i.imgur.com/CSBmRl3.png"
                              }
                              alt={team.metadata.team_name || team.display_name}
                            ></img>
                            <div className="flex items-center pl-4 text-darkTeal text-md bg-offWhite sm:h-24 h-16 w-96 overflow-y-hidden">
                              <h1
                                // add logic so long team names dont mess with styling
                                className={
                                  team.metadata.team_name?.length > 15 ||
                                  team.display_name?.length > 15
                                    ? "sm:text-xl font-normal text-left"
                                    : "sm:text-xl font-normal text-left"
                                }
                              >
                                {team.metadata.team_name || team.display_name}
                              </h1>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                : null}
              {/* conditionally render the draft list based on whether quickReveal is truthy or not */}
              {quickReveal
                ? draftOrder &&
                  draftOrder.map((team, index) => {
                    return (
                      <div key={index} className="mb-2">
                        <div className="flex">
                          {" "}
                          <h1 className="flex items-center justify-center sm:text-3xl text-xl text-darkTeal bg-offWhite sm:h-24 h-16 sm:w-24 w-24">
                            {index + 1}
                          </h1>
                          <img
                            className="sm:w-24 sm:h-24 w-16 h-16"
                            src={
                              team.metadata.avatar ||
                              // add default image incase user hasnt set a team avatar yet
                              "https://i.imgur.com/CSBmRl3.png"
                            }
                            alt={team.metadata.team_name || team.display_name}
                          ></img>
                          <div className="flex items-center pl-4 text-darkTeal text-md bg-offWhite sm:h-24 h-16 w-96 overflow-y-hidden">
                            <h1
                              // add logic so long team names dont mess with styling
                              className={
                                team.metadata.team_name?.length > 15 ||
                                team.display_name?.length > 15
                                  ? "sm:text-xl font-normal text-left"
                                  : "sm:text-xl font-normal text-left"
                              }
                            >
                              {team.metadata.team_name || team.display_name}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
              {/* if current index is less than teamData.length, display button, else hide button */}
              {slowReveal && currentIndex <= teamData.length - 1 ? (
                <button
                  onClick={() => handleRevealPick()}
                  style={
                    // conditional styling
                    currentIndex < 1
                      ? {
                          paddingLeft: "2rem",
                          paddingRight: "2rem",
                          height: "76px",
                          width: "197px",
                        }
                      : {}
                  }
                  className={
                    isAnimating
                      ? "button-click-animation text-xl mb-24 w-full sm:h-24 h-16 bg-white text-teal font-medium"
                      : "text-xl mb-24 w-full sm:h-24 h-16 bg-darkTeal text-teal font-medium"
                  }
                >
                  Reveal Pick {currentIndex + 1}
                </button>
              ) : (
                <div className="h-24"></div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  };
  // conditionally render the page based on if teamData is fetched or not.
  return teamData ? loaded() : loading();
};
