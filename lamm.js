/*
 * Easter Egg - easteregg.js
 *
 * To use, add `<script src="easteregg.js" type="module"></script>` to the head
 * of your main document.
 * 
 * To use, add the following to the header of your main document:
 * ```html
 * <script type="module" src="easteregg.js"></script>
 * <link rel="stylesheet" href="easteregg.css" />
 * ```
 *
 * Copyright 2021 Nicholas Hollander <nhhollander@wpi.edu>
 * 
 * Licensed under the MIT license
 */

// Change to point to your images of choice
let egg_images = [
    "osterlamm.png"
];
// Too many eggs causes performance issues!
let egg_count = 100;
// Update rate, 60 is good
let framerate = 60;

let anim_interval = undefined;
var code_index = 0;

document.addEventListener("onload", onload);

function rand(min, max) {
    return (Math.random() * (max - min)) + min;
}

/*!
 * Incremental Update Function.
 *
 * Unfortunately due to current limitations in CSS, the animation must be
 * executed through javascript.
 */
function update() {
    let rotate = 2;
    let fall = 0.5;
    let eggs = document.querySelectorAll("div.easter_egg");
    if(eggs.length == 0) {
        clearInterval(anim_interval);
    }
    for(const egg of eggs) {
        // Update numerical values
        egg.egg_rot_x += rotate * egg.egg_factor_x;
        egg.egg_rot_y += rotate * egg.egg_factor_y;
        egg.egg_rot_z += rotate * egg.egg_factor_z;
        egg.egg_fall  += fall * egg.egg_factor_fall;
        // Convert numerical values to css variables
        egg.style.setProperty("--rotx", `${egg.egg_rot_x}deg`);
        egg.style.setProperty("--roty", `${egg.egg_rot_x}deg`);
        egg.style.setProperty("--rotz", `${egg.egg_rot_x}deg`);
        egg.style.setProperty("top", `${egg.egg_fall}vh`);
        // Remove eggs once they've fallen off the bottom of the screen
        if(egg.egg_fall > 110) {
            egg.parentElement.removeChild(egg);
        }
    }
}

function deploy_eggs() {
    console.log("Deploying eggs!");
    for(let i = 0; i < egg_count; i++) {
        deploy_egg();
    }
    clearInterval(anim_interval);
    anim_interval = setInterval(update, 1000 / framerate);
}

function deploy_egg() {
    let egg = document.createElement("div");
    egg.className = "easter_egg";
    egg.egg_rot_x = 0;
    egg.egg_rot_y = 0;
    egg.egg_rot_z = 0;
    // Generate random egg factors
    egg.style.left = `${rand(-2,100)}vw`;
    egg.style.setProperty("--scale", `${rand(.5,1.5)}`);
    egg.egg_fall = rand(-120, -10);
    egg.egg_factor_x = rand(-1, 1);
    egg.egg_factor_y = rand(-1, 1);
    egg.egg_factor_z = rand(-1, 1);
    egg.egg_factor_fall = rand(0.5, 1.2);
    // Pick image
    let index = Math.floor(rand(0, egg_images.length));
    egg.style.backgroundImage = `url('${egg_images[index]}')`;

    document.body.appendChild(egg);
}
