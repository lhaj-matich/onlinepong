import { ReactNode, useState } from "react";
import { Game, GameContext } from "../Contexts/gameContext";

interface BoardProps {
    children: ReactNode;
}

const GameProvider = ({ children }: BoardProps) => {
    const [game, setGameSettings] = useState<Game>({ playerID: 0, gameID: null });
    return <GameContext.Provider value={{ gameSettings: game, setGameSettings }}>{children}</GameContext.Provider>;
};

export default GameProvider;
