import { load, save, saveData } from "@/lib/gameData";
import type { SaveData } from "@/types/types";
import { createContext, useEffect, useState } from "react";

interface GameDataContextType {
  gameData: SaveData;
  updateGameData: (newData: Partial<SaveData>) => void;
}

export const GameDataContext = createContext<GameDataContextType | null>(null);

export function GameDataProvider({ children }: { children: React.ReactNode }) {
  const [gameData, setGameData] = useState<SaveData>(saveData);

  // Load saved data on mount
  useEffect(() => {
    load();
    setGameData(saveData);
  }, []);

  // Auto-save every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      save();
    }, 3000);

    return () => clearInterval(interval);
  }, [gameData]);

  const updateGameData = (newData: Partial<SaveData>) => {
    const updatedData = { ...gameData, ...newData };
    setGameData(updatedData);
    saveData.frost = updatedData.frost;
    saveData.autoClickers = updatedData.autoClickers;
    saveData.research = updatedData.research;
  };

  return <GameDataContext.Provider value={{ gameData, updateGameData }}>{children}</GameDataContext.Provider>;
}
