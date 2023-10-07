import { createContext } from "react";

export type Game = {
    playerID: number | null;
    gameID: string | null;
};

type DispatchGame = React.Dispatch<React.SetStateAction<Game>>;

interface GameContextType {
    gameSettings: Game;
    setGameSettings: DispatchGame;
}

export const GameContext = createContext<GameContextType>({} as GameContextType);
