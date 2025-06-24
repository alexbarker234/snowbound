import type { SaveData } from "@/types/types";

export let saveData: SaveData = { version: 0, frost: 0, autoClickers: [], research: [] };

export const load = () => {
  const localJSON = localStorage.getItem("saveData");
  if (localJSON) saveData = Object.assign(saveData, JSON.parse(localJSON));
};

export const save = () => localStorage.setItem("saveData", JSON.stringify(saveData));
