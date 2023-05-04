import { Link } from "react-router-dom";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import PercentIcon from "@mui/icons-material/Percent";
import Nav from "../components/Nav";

export const Home = () => {
  return (
    <main>
      <Nav />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <div className="flex sm:flex-nowrap flex-wrap sm:gap-x-10 gap-y-5">
          <Link
            to="/draft"
            className="transition-all duration-200 sm:h-96 sm:w-72 h-52 w-72 bg-lightBg relative hover:text-teal active:text-teal rounded"
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
                opacity: "0.3",
              }}
            />
          </Link>
          <Link
            to="/lotteryDraft"
            className="transition-all duration-200 sm:h-96 sm:w-72 h-52 w-72  bg-lightBg relative hover:text-teal active:text-teal rounded"
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
              className="text-darkBg text-lg"
              sx={{
                fontSize: "10rem",
                position: "absolute",
                bottom: "0",
                right: "0",
                opacity: "0.3",
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
