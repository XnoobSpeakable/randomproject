if(localStorage.getItem('savefile') == null) {
    player = {
        number: 0,
        test: 5,
        text: "aDFSSDFDVF"
    }
} else {
    str = localStorage.getItem("savefile")
    player = JSON.parse(str)
}


function add() {
    player.number += 67
}
function ab() {
    player.number += 2
}

const TPS = 20;

// game loop
setInterval(() => {
    document.getElementById("sk").textContent = player.number
}, 1000 / TPS);

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
}, 4000);

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