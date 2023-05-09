import React from "react";
import Nav from "../components/Nav";
import ReactGA from "react-ga";

export const LotteryDraft = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <main>
      <Nav />
    </main>
  );
};
