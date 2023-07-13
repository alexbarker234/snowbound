import $ from "jquery";

import { randBetween, lerp, round } from "./mathUtils";
import "./scssLoad.ts";
import { saveData, load, save } from "./gameData";
import { initialiseStore, manageStoreVisuals } from "./economy";
import {clickers, research} from "./storeData";
import { addSnow, click, initScene } from "./scene";

let spin = 0;
let spinSpeed = 0;
const maxSpinSpeed = 5;
const spinPerClick = 0.3;

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

    let counter = 0;
    const interval = 50;

    // setInterval is not super accurate, work with time deltas
    var lastCheck = Date.now();
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
        spinSpeed = Math.min(spinSpeed + spinPerClick, maxSpinSpeed);
        addFrost(stats.frostPerClick);
        click(stats.frostPerClick);
    });
    setInterval(function () {
        spin = (spin + spinSpeed) % 360;
        spinSpeed = lerp(spinSpeed, 0, 0.01);
        if (spinSpeed < 0.01) spinSpeed = 0;
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
        frostPerClick: 1
    }

    const clickerMultipliers = Array.from({ length: clickers.length }, () => 1);

    // ADD UP RESEARCH BONUSES
    research.forEach((research, index) => {
        if (research.autoClickerBonus) {
            clickerMultipliers[research.autoClickerBonus.index] += research.autoClickerBonus.percent * saveData.research[index];
        }
        if (research.clickBonusPercent) {
            stats.frostPerClick *= research.clickBonusPercent * saveData.research[index];
        }
    })

    clickers.forEach((clicker, index) => {
        stats.frostPerSecond += clicker.basePerSecond * clickerMultipliers[index] * saveData.autoClickers[index];
    });

    stats.multiplier = 1 + spinSpeed / 5; 
    stats.frostPerSecond *= stats.multiplier;

    return stats;
}

interface Stats {
    frostPerSecond: number;
    multiplier: number;
    frostPerClick: number;
}