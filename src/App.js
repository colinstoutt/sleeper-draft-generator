import "./App.css";
import { Main } from "./components/Main";
import ReactGA from "react-ga";

const TRACKING_ID = "G-5LR0C8CXSG";
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
