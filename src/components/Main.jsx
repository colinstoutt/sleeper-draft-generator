import { Route, Routes } from "react-router-dom";

import { Index } from "../pages/Index";
import { LeagueId } from "../pages/LeagueId";
import { Draft } from "../pages/Draft";
import { LotteryDraft } from "../pages/LotteryDraft";

export const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/league-id" element={<LeagueId />}></Route>
        <Route path="/draft" element={<Draft />}></Route>
        <Route path="/lottery-draft" element={<LotteryDraft />}></Route>
      </Routes>
    </main>
  );
};
