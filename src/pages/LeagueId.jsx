import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LeagueId = () => {
  const [leagueId, setLeagueId] = useState("");
  const [notValid, setNotValid] = useState(false);
  const [toggleLearnMore, setToggleLearnMore] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLeagueId(e.target.value);
    console.log(leagueId);
  };
  const handleSubmit = () => {
    if (leagueId.length === 18) {
      localStorage.setItem("league_id", leagueId);
      navigate("/");
    } else {
      setNotValid(true);
    }
  };

  return (
    <main>
      <h1 className="mt-24 text-4xl font-semibold text-white text-center">
        Sleeper League Draft Generator
      </h1>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl  p-8 min-w-full text-center rounded-lg  font-semibold">
        <h1 className="text-2xl mb-5 text-white">
          To start, please enter your Sleeper league ID below.
        </h1>

        <input
          type="number"
          value={leagueId}
          onChange={handleChange}
          className="leagueId rounded-tl-md rounded-bl-md pl-4 pr-2 py-1 "
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className=" bg-teal px-4 py-1 mb-4 
        lg:rounded-tr-md lg:rounded-br-md
        rounded-tr-md rounded-br-md active:bg-darkTeal active:text-teal"
        >
          Start
        </button>
        {notValid ? (
          <h6 className="text-red font-normal">
            Please enter a valid league ID
          </h6>
        ) : (
          <></>
        )}
        <h6 className="text-sleeperGrey font-normal">
          Dont know league ID?{" "}
          <span className="underline hover:text-teal active:text-darkTeal cursor-pointer">
            Click here
          </span>
        </h6>
      </div>
    </main>
  );
};
