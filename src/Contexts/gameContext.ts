import { createContext } from "react";

export type Game = {
    playerID: Number | null;
    gameID: String | null;
    me?: any | null;
    opponent?: any | null;
};

type DispatchGame = React.Dispatch<React.SetStateAction<Game>>;

interface GameContextType {
    gameSettings: Game;
    setGameSettings: DispatchGame;
}

export const GameContext = createContext<GameContextType>({} as GameContextType);
