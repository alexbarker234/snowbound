import $ from "jquery";

import { randBetween, lerp, round } from "./mathUtils";
import "./scssLoad.ts";
import { saveData, load, save } from "./gameData";
import { initialiseStore, manageStoreVisuals } from "./economy";
import {clickers, research} from "./storeData";
import { addSnow, click, initScene } from "./scene";

let spin = 0; // visual only
let spinBonus = 0;

let stats: Stats = undefined

$(document).ready(function () {
    load();
    initialiseStore();
    initScene();
    stats = calculateStats();

    // save every 2 seconds
    setInterval(function () {
        save();
    }, 2000);

    // setInterval is not super accurate, work with time deltas
    var lastCheck = Date.now();
    const interval = 50;
    setInterval(function () {
        stats = calculateStats();

        const perInterval = (stats.frostPerSecond / 1000) * interval;
        $("#frost-per-second").find("span").html(stats.frostPerSecond.toFixed(2));
        $("#multiplier").find("span").html(stats.multiplier.toFixed(2));

        var delta = Date.now() - lastCheck;
        if (delta > interval * 5) delta = interval; // no cheating by changing date thanks
        lastCheck = Date.now();

        var frostThisInterval = (delta / interval) * perInterval;

        addFrost(frostThisInterval);
        manageStoreVisuals();
    }, interval);

    $("#frost").find("span").html(saveData.frost.toString());

    const snowflake = $(".snowflake");
    snowflake.on("click", function () {
        addSnow()
        spinBonus = Math.min(spinBonus + stats.spinBonusPerClick, stats.spinBonusMax);

        addFrost(stats.frostPerClick);
        click(stats.frostPerClick);
    });
    setInterval(function () {
        spin = (spin + spinBonus * 5) % 360;

        spinBonus = lerp(spinBonus, 0, stats.spinBonusDecreaseRate);
        if (spinBonus < 0.01) spinBonus = 0;

        snowflake.find("svg").css("rotate", `${spin}deg`);
    }, 10);
});

function addFrost(amount: number) {
    saveData.frost += amount;
    $("#frost").find("span").html(Math.floor(saveData.frost).toString());
}

function calculateStats() {
    const stats: Stats = {
        frostPerSecond: 0,
        multiplier: 1,
        frostPerClick: 1,

        spinBonusMax: 5,
        spinBonusPerClick: 0.05,
        spinBonusDecreaseRate: 0.01,
    };

    const clickerMultipliers = Array.from({ length: clickers.length }, () => 1);

    // ADD UP RESEARCH BONUSES
    research.forEach((research, index) => {
        if (research.autoClickerBonus) {
            clickerMultipliers[research.autoClickerBonus.index] *= research.autoClickerBonus.percent * saveData.research[index];
        }
        if (research.clickBonusPercent) {
            stats.frostPerClick *= research.clickBonusPercent * saveData.research[index];
        }
        if (research.spinBonusMaxIncrease) {
            stats.spinBonusMax *= research.spinBonusMaxIncrease * saveData.research[index]
        }
        if (research.spinPerClick) {
            stats.spinBonusPerClick *= research.spinPerClick * saveData.research[index]
        }
        if (research.spinBonusSlowdownDecrease) {
            stats.spinBonusDecreaseRate *= 1 - (research.spinBonusSlowdownDecrease * saveData.research[index]);
        }
    })

    clickers.forEach((clicker, index) => {
        stats.frostPerSecond += clicker.basePerSecond * clickerMultipliers[index] * saveData.autoClickers[index];
    });

    stats.multiplier += spinBonus;
    stats.frostPerSecond *= stats.multiplier;

    return stats;
}

interface Stats {
    frostPerClick: number;
    
    frostPerSecond: number;
    multiplier: number;

    spinBonusPerClick: number;
    spinBonusMax: number;
    spinBonusDecreaseRate: number;
}