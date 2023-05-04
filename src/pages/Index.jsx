import React from "react";
import { Link } from "react-router-dom";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import PercentIcon from "@mui/icons-material/Percent";
import Nav from "../components/Nav";

export const Index = () => {
  return (
    <main>
      <Nav />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <div className="flex gap-x-10">
          <Link
            to="/draft"
            className="h-96 w-72 bg-lightBg relative hover:text-teal rounded"
          >
            <h1 className=" text-4xl font-semibold px-4 py-4">
              Generate
              <br />
              Draft
              <br />
              Order
            </h1>
            <SportsFootballIcon
              className="text-darkBg"
              sx={{
                fontSize: "10rem",
                position: "absolute",
                bottom: "0",
                right: "0",
              }}
            />
          </Link>
          <Link
            to="/lotteryDraft"
            className="h-96 w-72 bg-lightBg relative hover:text-teal rounded"
          >
            <h1 className="text-4xl font-semibold px-4 py-4">
              Generate
              <br />
              Lottery
              <br />
              Draft
              <br />
              Order
            </h1>
            <SportsFootballIcon
              className="text-darkBg"
              sx={{
                fontSize: "10rem",
                position: "absolute",
                bottom: "0",
                right: "0",
              }}
            />
            <PercentIcon
              className="text-lightBg"
              sx={{
                fontSize: "3.8rem",
                position: "absolute",
                bottom: "3.1rem",
                right: "3.1rem",
              }}
            />
          </Link>
        </div>
      </div>
    </main>
  );
};
