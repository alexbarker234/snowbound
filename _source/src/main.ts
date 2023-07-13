import $ from "jquery";

import { randBetween, lerp, round } from "./mathUtils";
import "./scssLoad.ts";
import { saveData, load, save } from "./gameData";
import { initialiseStore, manageUpgradeVisuals } from "./economy";
import clickers from "./autoClickers";
import { addSnow, initScene } from "./scene";

let spin = 0;
let spinSpeed = 0;
const maxSpinSpeed = 5;
const spinPerClick = 0.3;

$(document).ready(function () {
    load();
    initialiseStore();
    initScene();

    // save every 2 seconds
    setInterval(function () {
        save();
    }, 2000);

    let counter = 0;
    const interval = 50;

    // setInterval is not super accurate, work with time deltas
    var lastCheck = Date.now();
    setInterval(function () {
        let perSecond = 0;
        clickers.forEach((clicker, index) => {
            perSecond += clicker.basePerSecond * saveData.autoClickers[index];
        });

        const multiplier = 1 + spinSpeed / 5; 
        perSecond *= multiplier;


        perSecond = perSecond, 2;
        const perInterval = (perSecond / 1000) * interval;
        $("#frost-per-second").find("span").html(perSecond.toFixed(2));
        $("#multiplier").find("span").html(multiplier.toFixed(2));

        var delta = Date.now() - lastCheck;
        if (delta > interval * 5) delta = interval; // no cheating by changing date thanks
        lastCheck = Date.now();

        var frostThisInterval = (delta / interval) * perInterval;

        addFrost(frostThisInterval);
        manageUpgradeVisuals();
    }, interval);

    $("#frost").find("span").html(saveData.frost.toString());

    const snowflake = $(".snowflake");
    snowflake.on("click", function () {
        addSnow()
        spinSpeed = Math.min(spinSpeed + spinPerClick, maxSpinSpeed);
        addFrost(1);
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
