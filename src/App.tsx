import { useState } from "react";
import Snowflake from "./assets/snowflake.svg?react";
import Store from "./components/Store";
import { useGameData } from "./hooks/useGameData";

function App() {
  const [frostPerSecond, setFrostPerSecond] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const { gameData, updateGameData } = useGameData();

  return (
    <>
      <div className="clicker-container">
        <div className="snowflake">
          <Snowflake />
        </div>
        <div className="stat" id="frost">
          <span>{gameData.frost}</span> Frost
        </div>
        <div className="stat small" id="frost-per-second">
          <span>{frostPerSecond}</span> per second
        </div>
        <div className="stat small" id="multiplier">
          <span>{multiplier}</span>x
        </div>
      </div>

      <Store />

      <div className="scene">
        <div className="ground"></div>
        <div className="stars"></div>
        <canvas id="back-canvas"></canvas>
        <canvas id="front-canvas"></canvas>
        <div className="house">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
            <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default App;
