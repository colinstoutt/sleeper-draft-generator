import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HowToFindLeaugeId } from "../components/HowToId";
import ReactGA from "react-ga";

export const Index = () => {
  const [leagueId, setLeagueId] = useState("");
  const [notValid, setNotValid] = useState(false);
  const [toggleClickHere, setToggleClickHere] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLeagueId(e.target.value);
    console.log(leagueId);
  };
  const handleSubmit = () => {
    if (leagueId.length === 18) {
      localStorage.setItem("league_id", leagueId);
      navigate("/home");
    } else {
      setNotValid(true);
    }
  };
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <main className="overflow-y-hidden">
      <h1 className="text-sleeperGrey p-4 absolute bottom-0 left-0">
        To demo, use league ID: 867824542855376896{" "}
      </h1>
      <h1 className="mt-24 p-4 text-4xl font-semibold text-white text-center">
        Sleeper League Draft Generator
      </h1>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl  p-8 min-w-full text-center rounded-lg  font-semibold">
        <h1 className="text-2xl mb-5 text-white">
          To start, please enter your Sleeper league ID below.
        </h1>

        <input
          type="number"
          value={leagueId}
          onChange={handleChange}
          className="text-center sm:rounded-tl-md sm:rounded-bl-md sm:rounded-tr-none sm:rounded-br-none rounded pl-4 pr-2 py-1 "
        />
        <br className="sm:hidden" />
        <button
          type="submit"
          onClick={handleSubmit}
          className=" bg-teal px-4 py-1 sm:mb-2 mt-4 mb-4
        sm:rounded-tr-md sm:rounded-br-md sm:rounded-bl-none sm:rounded-tl-none
        rounded-lg active:bg-darkTeal active:text-teal"
        >
          Start
        </button>
        {notValid ? (
          <h6 className="text-red font-normal">
            Please enter a valid league ID
          </h6>
        ) : null}
        <h6 className="text-sleeperGrey font-normal">
          Dont know league ID?{" "}
          <span
            onClick={() => setToggleClickHere(!toggleClickHere)}
            className="transition-all duration-200 underline hover:text-teal active:text-darkTeal cursor-pointer"
          >
            Click here
          </span>
        </h6>
      </div>
      {toggleClickHere ? (
        <HowToFindLeaugeId setToggleClickHere={setToggleClickHere} />
      ) : null}
    </main>
  );
};
