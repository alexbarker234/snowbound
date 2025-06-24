import { GameDataContext } from "@/providers/GameDataProvider";
import { useContext } from "react";

export function useGameData() {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error("useGameData must be used within a GameDataProvider");
  }
  return context;
}
