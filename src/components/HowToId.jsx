import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export const HowToFindLeaugeId = ({ setToggleClickHere }) => {
  return (
    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md sm:w-1/2 w-5/6 bg-lightBg rounded border border-borderColor p-6 text-white ">
      <h1 className="text-xl font-semibold mb-4">How to find league ID</h1>
      <p>
        To find your league's ID, simply check the URL of your league's home
        page. The ID can be found there.
      </p>
      <img
        className="rounded-xl mt-4"
        src="https://i.imgur.com/UUauhLz.png"
        alt="url"
      />
      <CloseRoundedIcon
        className="cursor-pointer"
        onClick={() => setToggleClickHere(false)}
        sx={{ position: "fixed", top: "1rem", right: "1rem" }}
      />
    </main>
  );
};
