player = {
    number: 0,
    time: 0,
    upgrades: {
        clickUp: {
            cost: 100,
            timesBought: 0,
            scaling: 1.2
        },
        multUp: {
            cost: 1000,
            timesBought: 0,
            scaling: 3
        },
        autUp: {
            cost: 50,
            timesBought: 0,
            scaling: 1.15
        },
        autMultUp: {
            cost: 700,
            timesBought: 0,
            scaling: 2.6
        },
    }
}

str = localStorage.getItem("savefile")
if(str != null) {
    parsed = JSON.parse(str)
    deepMerge(player, parsed);
}
pastTime = player.time;

function add() {
    player.number += gain
}

function buyUpgrade(upgradeName) {
    cost = player.upgrades[upgradeName].cost
    if(player.number >= cost) {
        player.number -= cost
        player.upgrades[upgradeName].timesBought += 1
        player.upgrades[upgradeName].cost *= player.upgrades[upgradeName].scaling
    }
}
function timesBought(upgradeName) {
    return player.upgrades[upgradeName].timesBought
}

function timerFunc() {
    player.time = performance.now() + pastTime
    seconds = Math.round(player.time/1000)
    minutes = Math.floor(seconds/60)
    seconds = seconds%60
    document.getElementById("timer").textContent = `Goal: Reach 67,000,000,000 points. Time elapsed: ${minutes}m${seconds}s`
}

function updateTexts() {
    document.getElementById("counter").textContent = Math.round(player.number)
    document.getElementById("addb").textContent = `${gain}/click`

    document.getElementById("clickUpCost").textContent = `Cost: ${Math.round(player.upgrades.clickUp.cost)}`
    document.getElementById("multUpCost").textContent = `Cost: ${Math.round(player.upgrades.multUp.cost)}`
    document.getElementById("autUpCost").textContent = `Cost: ${Math.round(player.upgrades.autUp.cost)}`
    document.getElementById("autMultUpCost").textContent = `Cost: ${Math.round(player.upgrades.autMultUp.cost)}`
}

const TPS = 30;
const ITPS = 1/TPS;

// game loop
setInterval(() => {
    gain = (timesBought("clickUp") + 1) * Math.pow(2, timesBought("multUp"))
    player.number += timesBought("autUp") * Math.pow(2, timesBought("autMultUp")) * ITPS
    timerFunc()
    updateTexts()
}, 1000 / TPS);

firstloop = true;
setInterval(() => {
    newnum = player.number
    if(firstloop) {
        firstloop = false;
        oldnum = player.number
    }
    diff = newnum - oldnum
    document.getElementById("rate").textContent = ` (${Math.round(diff)}/s)`
    oldnum = player.number
}, 1000);

function save() {
    savefile = JSON.stringify(player);
    localStorage.setItem("savefile", savefile)
}

function wipe() {
    localStorage.removeItem("savefile");
    window.location.reload()
}

// save loop
setInterval(() => {
    save()
}, 3000);


























function deepMerge(source, data) {
    for (const key in data) {
        const value = data[key];
        if (
            typeof value === "object" &&
            value !== null
        ) {
            const newSource = source[key];
            if (!(key in source)) {
                source[key] = Array.isArray(value) ? [] : {};
            }
            if (typeof newSource === "object" && newSource !== null) {
                deepMerge(newSource, value);
            }
        } else source[key] = value;
    }
}

const themes = [
   {
        textColor: "#EBEBEB",
        bgColor: "#696969",
        buttonColor: "#999999",
        borderColor: "#000000",
        gradientColor: "transparent",
        themeName: "Classic Colors",
        disableGradient: false,
    }
]
const divEntireBody = document.getElementById("diventirebody");
function themeExec() {
    const theme = themes[0];
    if (theme === undefined) {
        throw new Error("theme dosen't exist!");
    }
    const {
        textColor,
        bgColor,
        buttonColor,
        borderColor,
        gradientColor,
        buttonGradientOverride,
        themeName,
        disableGradient,
    } = theme;

    divEntireBody.style.opacity = "1";
    divEntireBody.style.color = textColor;
    document.body.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;

    const className = document.getElementsByClassName("button");
    for (const element of className) {
        if (!(element instanceof HTMLElement)) {
            throw new Error(`element is not an HTMLElement`);
        }
        element.style.backgroundColor = buttonColor;

        if (themeName === "Classic") {
            element.style.border = "1px solid black";
            element.style.borderRadius = "2px";
            element.style.background = buttonColor;
            element.style.color = "black";
            element.style.fontWeight = "400";
        } else if (themeName === "Classic Colors") {
            element.style.border = "";
            element.style.borderRadius = "8px";
            element.style.color = "black";
            element.style.fontWeight = "500";
        } else {
            element.style.border = "";
            element.style.borderRadius = "8px";
            element.style.color = "snow";
            element.style.fontWeight = "500";

            if (buttonGradientOverride === undefined && disableGradient) {
                element.style.background = `linear-gradient(45deg, ${gradientColor}, transparent)`;
            } else if (disableGradient) {
                element.style.background = `linear-gradient(45deg, black, transparent)`;
            } else {
                element.style.background = buttonColor;
            }
        }
    }

    const className2 = document.getElementsByClassName("withtheoutline");
    for (const element of className2) {
        if (!(element instanceof HTMLElement)) {
            throw new Error(`element is not an HTMLElement`);
        }
        element.style.border = `0.2em solid ${borderColor}`;
    }

    const className3 = document.getElementsByClassName("redb");
    for (const element of className3) {
        if (!(element instanceof HTMLElement)) {
            throw new Error(`element is not an HTMLElement`);
        }
        element.style.backgroundColor = buttonColor;
    }
}
themeExec()