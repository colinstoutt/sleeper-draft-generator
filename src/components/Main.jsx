import { Route, Routes } from "react-router-dom";

import { Index } from "../pages/Index";
import { Home } from "../pages/Home";
import { Draft } from "../pages/Draft";
import { LotteryDraft } from "../pages/LotteryDraft";

export const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/draft" element={<Draft />}></Route>
        <Route path="/lottery-draft" element={<LotteryDraft />}></Route>
      </Routes>
    </main>
  );
};
