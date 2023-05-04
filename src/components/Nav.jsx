import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  let league_id;
  if (typeof window !== "undefined") {
    league_id = localStorage.getItem("league_id");
  }

  return (
    <nav>
      <Link
        to="/league-id"
        className="fixed top-5 left-5 px-6 py-2 text-sleeperGrey hover:text-teal uppercase font-semibold"
      >
        <h1 className="font-light">
          <span className="font-bold">League ID:</span> {league_id}
        </h1>
      </Link>
    </nav>
  );
};

export default Nav;
