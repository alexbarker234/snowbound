import { saveData } from "./gameData";
import clickers from "./storeData";
import $ from "jquery";

import Upgrade from "./components/upgrade";

// STORE
let store: JQuery<HTMLElement> = undefined;
let upgrades: JQuery<HTMLElement> = undefined;

export function initialiseStore() {
    store = $(".store");
    upgrades = store.find("#upgrades");
    const tabList = store.find(".tabs").find(".tab");

    clickers.forEach((clicker, index) => {
        saveData.autoClickers[index] ??= 0;
        let cost = Math.floor(clicker.baseCost * 1.15 ** saveData.autoClickers[index]);
        const upgrade = Upgrade({ title: clicker.name, cost, total: saveData.autoClickers[index] });

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

    console.log(tabList);
    // buttons to switch stores
    store.find(".tab-button").each(function () {
        $(this).on("click", function () {
            const tab = tabList.filter(`#${$(this).data('target')}`);
            if (!tab) return;
            tabList.each(function () {
                $(this).addClass("disabled");
            });
            tab.removeClass("disabled");
        });
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
