import { saveData } from "./gameData";
import { randBetween } from "./mathUtils";
import $ from "jquery";

let backCanvas: HTMLCanvasElement = undefined;
let frontCanvas: HTMLCanvasElement = undefined;

let snowList: SnowParticle[] = [];
let clickList: ClickParticle[] = [];

let mouseX = 0;
let mouseY = 0;

let timer = 0;

// bruh
const randomNumbers = Array.from({ length: 50 }, () => Math.random());
const randomNumbers2 = Array.from({ length: 50 }, () => Math.random());
const randomNumbers3 = Array.from({ length: 50 }, () => Math.random());

export function addSnow(x?: number, y?: number) {
    if (snowList.length > 500) return;
    if (!x) x = Math.random() * backCanvas.width;
    if (!y) y = -20;
    snowList.push({ x, y, size: randBetween(2, 8), vel: { y: randBetween(0.7, 1), x: randBetween(-0.1, 0.1) } });
}

export function click(amount: number) {
    clickList.push({ x: mouseX + randBetween(-10,10), y: mouseY, opacity: 1, amount });
}

export function initScene() {
    backCanvas = $("#back-canvas").get(0) as HTMLCanvasElement;
    frontCanvas = $("#front-canvas").get(0) as HTMLCanvasElement;
    backCanvas.width = window.innerWidth;
    backCanvas.height = window.innerHeight;
    frontCanvas.width = window.innerWidth;
    frontCanvas.height = window.innerHeight;

    $(window).on("resize", function () {
        backCanvas.width = window.innerWidth;
        backCanvas.height = window.innerHeight;
        frontCanvas.width = window.innerWidth;
        frontCanvas.height = window.innerHeight;
    });
    $(window).on("mousemove", function (event: JQuery.Event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    window.requestAnimationFrame(drawCanvas);
    houseSmoke();
    loadStars();
}
function drawCanvas() {
    timer++;
    const ctx = backCanvas.getContext("2d");
    const frontCtx = frontCanvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    frontCtx.globalCompositeOperation = "destination-over";
    // clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    frontCtx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 

    let remainingSnow = [];
    for (let i = 0; i < snowList.length; i++) {
        const snow = snowList[i];

        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        snow.y += snow.vel.y;
        snow.x += snow.vel.x;
        if (snow.y < ctx.canvas.height + 20) remainingSnow.push(snow);
    }
    snowList = remainingSnow;

    // clicks
    let remainingClicks = [];
    for (let i = 0; i < clickList.length; i++) {
        const click = clickList[i];

        frontCtx.font = "24px Fredoka";
        frontCtx.fillStyle = "#293a4c";
        frontCtx.textAlign = "center"

        frontCtx.globalAlpha = click.opacity;
        frontCtx.fillText(`+${click.amount}`, click.x, click.y);

        click.y--;
        click.opacity -= 0.01;
        if (click.opacity > 0) remainingClicks.push(click);
    }
    ctx.globalAlpha = 1;
    clickList = remainingClicks;

    // buildings
    drawClouds(ctx);

    window.requestAnimationFrame(drawCanvas);
}

function drawClouds(ctx: CanvasRenderingContext2D) {
    let num = Math.min(saveData.autoClickers[0], 50);
    let delay = 500;

    for (let i = 0; i < num; i++) {
        ctx.font = "48px serif";
        ctx.fillStyle = "white";
        var speed = 1 - randomNumbers3[i] * 0.2;
        let x = ctx.canvas.width * ((1 + Math.sin((timer / 1000) * speed + randomNumbers[i] * 6.28)) / 2);
        let y = 50 + randomNumbers2[i] * 30;
        ctx.fillText("☁", x, y);
        if (Math.floor(timer + randomNumbers3[i] * delay) % delay == 0) addSnow(x + 10, y - 20);
    }
}

function loadStars() {
    const stars = $(".stars");
    for (let i = 0; i < 50; i++) {
        const star = $("<div>").addClass("star");
        star.css("left", `${Math.random() * 100}%`);
        star.css("top", `${Math.random() * 80}%`);
        const size = randBetween(5, 10);
        star.css("width", `${size}px`);
        star.css("height", `${size}px`);
        star.css("animation-delay", `${Math.random() * -0.3}s`);
        stars.append(star);
    }
}

function houseSmoke() {
    const house = $(".house");
    setInterval(function () {
        const smoke = $("<div>").addClass("smoke");
        house.append(smoke);

        setTimeout(function () {
            smoke.remove();
        }, 10000);
    }, 1000);
}

interface ClickParticle {
    x: number;
    y: number;
    opacity: number;
    amount: number;
}

interface SnowParticle {
    x: number;
    y: number;
    size: number;
    vel: {
        x: number;
        y: number;
    };
}
