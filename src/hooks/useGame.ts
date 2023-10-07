import { useContext } from "react";
import { GameContext } from "../Contexts/gameContext";

const useGame = () => useContext(GameContext);

export default useGame;