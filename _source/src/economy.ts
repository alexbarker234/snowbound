// FROST

import { saveData } from "./gameData";
import clickers from "./autoClickers";
import $ from "jquery";

import Upgrade from "./components/upgrade";
// STORE

export function initialiseStore() {    
    const store = $(".store")
    const upgrades = store.find(".upgrades");
    const upgradeList = store.find(".upgrade");


    clickers.forEach(clicker => {
        console.log(clicker)
        console.log(Upgrade({title: clicker.name, cost: clicker.baseCost}))
        upgrades.append(Upgrade({title: clicker.name, cost: clicker.baseCost}))
    });

    upgradeList.each(function (index) {
        saveData.autoClickers[index] ??= 0;
        $(this).on("click", function () {
            saveData.autoClickers[index]++;
            console.log(saveData)
            console.log({upgrades, upgradeList})
        });
    });    
}