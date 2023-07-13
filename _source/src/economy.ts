import { saveData } from "./gameData";
import { ClickerDetails, ResearchDetails, clickers, research as researchList } from "./storeData";
import $ from "jquery";

import Upgrade from "./components/upgrade";
import { lerp } from "./mathUtils";
import Research from "./components/research";

// STORE
let store: JQuery<HTMLElement> = undefined;
let upgradesTab: JQuery<HTMLElement> = undefined;
let researchTab: JQuery<HTMLElement> = undefined;

export function initialiseStore() {
    store = $(".store");
    upgradesTab = store.find("#upgrades");
    researchTab = store.find("#research");
    const tabList = store.find(".tabs").find(".tab");

    // CLICKERS
    clickers.forEach((clicker, index) => {
        saveData.autoClickers[index] ??= 0;
        let cost = calculateClickerCost(saveData.autoClickers[index], clicker);
        const upgrade = Upgrade({ title: clicker.name, cost, total: saveData.autoClickers[index] });

        $(upgrade).on("click", function () {
            if (saveData.frost < cost) return;

            saveData.autoClickers[index]++;
            saveData.frost -= cost;

            cost = calculateClickerCost(saveData.autoClickers[index], clicker);
            $(this).find(".purchase-cost").find(".amount").html(cost.toString());
            $(this).find(".upgrade-total").html(saveData.autoClickers[index].toString());
        });

        upgradesTab.append(upgrade);
    });
    // RESEARCH
    researchList.forEach((research, index) => {
        saveData.research[index] ??= 0;

        let cost = calculateResearchCost(saveData.research[index], research);
        const researchDiv = Research({ title: research.name, cost, total: saveData.research[index], max: research.max });

        $(researchDiv).on("click", function () {
            if (saveData.frost < cost || saveData.research[index] >= research.max) return;

            saveData.research[index]++;
            saveData.frost -= cost;

            cost = calculateResearchCost(saveData.research[index], research);

            $(this).find(".purchase-cost").find(".amount").html(cost.toString());
            $(this).find(".progress-bar").find(".inner").css('width', `${(saveData.research[index] / research.max) * 100}%`);
        });

        researchTab.append(researchDiv);
    });

    // STORE TABS
    const buttons = store.find(".tab-button");
    buttons.each(function () {
        $(this).on("click", function () {
            // select buttons
            buttons.each(function () {
                $(this).removeClass("selected");
            });
            $(this).addClass("selected");

            // switch tab
            const tab = tabList.filter(`#${$(this).data("target")}`);
            if (!tab) return;
            tabList.each(function () {
                $(this).addClass("disabled");
            });
            tab.removeClass("disabled");
        });
    });
}
export function manageStoreVisuals() {
    const clickerDivs = store.find(".upgrade");
    const researchDivs = store.find(".research");

    clickers.forEach((clicker, index) => {
        let cost = calculateClickerCost(saveData.autoClickers[index], clicker);
        const upgrade = $(clickerDivs.get(index));
        if (saveData.frost < cost) upgrade.addClass("disabled");
        else upgrade.removeClass("disabled");
    });

    researchList.forEach((research, index) => {
        let cost = calculateResearchCost(saveData.research[index], research);
        const researchDiv = $(researchDivs.get(index));
        if (saveData.frost < cost) researchDiv.addClass("disabled");
        else researchDiv.removeClass("disabled");
    });
}

const calculateClickerCost = (total: number, clicker: ClickerDetails) => Math.floor(clicker.baseCost * 1.15 ** total);
const calculateResearchCost = (total: number, research: ResearchDetails) => Math.floor(lerp(research.firstCost, research.lastCost, total / research.max));