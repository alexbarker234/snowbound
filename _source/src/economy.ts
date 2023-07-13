import { saveData } from "./gameData";
import clickers from "./autoClickers";
import $ from "jquery";

import Upgrade from "./components/upgrade";

// STORE
let store: JQuery<HTMLElement> = undefined;
let upgrades: JQuery<HTMLElement> = undefined;

export function initialiseStore() {
    store = $(".store");
    upgrades = store.find(".upgrades");

    clickers.forEach((clicker, index) => {
        saveData.autoClickers[index] ??= 0;
        let cost = Math.floor(clicker.baseCost * 1.15 ** saveData.autoClickers[index]);
        const upgrade = Upgrade({ title: clicker.name, cost, total: saveData.autoClickers[index]});

        $(upgrade).on("click", function () {
            if (saveData.frost < cost) return;

            saveData.autoClickers[index]++;
            saveData.frost -= cost;

            cost = Math.floor(clicker.baseCost * 1.15 ** saveData.autoClickers[index]);
            $(this).find(".upgrade-cost").find(".amount").html(cost.toString());
            $(this).find(".upgrade-total").html(saveData.autoClickers[index].toString());
        });

        upgrades.append(upgrade);
    });
}
export function manageUpgradeVisuals() {
    const upgradeList = store.find(".upgrade");

    clickers.forEach((clicker, index) => {
        let cost = Math.floor(clicker.baseCost * 1.15 ** saveData.autoClickers[index]);
        const upgrade = $(upgradeList.get(index));
        if (saveData.frost < cost) upgrade.addClass('disabled')
        else upgrade.removeClass('disabled')
    });
}
