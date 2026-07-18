const torchBtn = document.getElementById("torchBtn");
const lightOverlay = document.getElementById("lightOverlay");
const popup = document.getElementById("premiumPopup");
const closePopup = document.getElementById("closePopup");
const music = document.getElementById("bgMusic");
const upgradeBtn = document.getElementById("upgradeBtn");
const facePopup = document.getElementById("facePopup");
const camera = document.getElementById("camera");
const scanBtn = document.getElementById("scanBtn");
const scanStatus = document.getElementById("scanStatus");
const closeFacePopup = document.getElementById("closeFacePopup");

let stream;

let torchOn = false;
let memesStarted = false;

// Put ALL your meme filenames here
const memes = [
    "images/aa-a-athu.gif",
    "images/aluu-ke-parathe-aloo-arjun.gif",
    "images/arpit-bala.webp",
    "images/arpit-bala-arpit-bala-meme.gif",
    "images/ishowspeed-the-walking-dead-crying-speed-twd.webp",
    "images/junior-ntr-funny-dance-dance.gif",
    "images/mabbu-mahesh-babu.gif",
    "images/prabhas-prabhas-salaar.gif",
];

let memeIndex = 0;

// Torch Button
torchBtn.addEventListener("click", () => {

    if (!torchOn) {

        torchOn = true;

        lightOverlay.classList.add("on");

        torchBtn.textContent = "Turn OFF";

        // Start music
        music.play().catch(() => {});

    } else {

        popup.style.display = "flex";

        if (!memesStarted) {

            memesStarted = true;

            unleashChaos();

        }

    }

});

// Close Popup Button
closePopup.addEventListener("click", () => {

    popup.style.display = "none";

});
upgradeBtn.addEventListener("click", async () => {

    popup.style.display = "none";
    facePopup.style.display = "flex";

    stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });

    camera.srcObject = stream;

});
scanBtn.addEventListener("click", () => {

    scanBtn.disabled = true;

    scanStatus.innerHTML = "📷 Scanning Face...";

    setTimeout(() => {

        scanStatus.innerHTML = "✔ Face Detected";

    },1000);

    setTimeout(() => {

        scanStatus.innerHTML = "🧠 Checking Premium Status...";

    },2000);

    setTimeout(() => {

        scanStatus.innerHTML =
        "❌ You don't look like someone who pays to turn OFF a flashlight.";

        closeFacePopup.style.display = "inline-block";

        scanBtn.style.display = "none";

    },3000);

});
closeFacePopup.addEventListener("click", () => {

    facePopup.style.display = "none";

    if(stream){

        stream.getTracks().forEach(track => track.stop());

    }

    camera.srcObject = null;

    scanBtn.disabled = false;
    scanBtn.style.display = "inline-block";

    closeFacePopup.style.display = "none";

    scanStatus.innerHTML = "";

});

// Create One Meme
function createMeme() {

    const img = document.createElement("img");

    img.src = memes[memeIndex];

    img.className = "floatingMeme";

    img.style.left = Math.random() * (window.innerWidth - 180) + "px";
    img.style.top = Math.random() * (window.innerHeight - 180) + "px";

    document.body.appendChild(img);

    let x = parseFloat(img.style.left);
    let y = parseFloat(img.style.top);

    let dx = (Math.random() * 0.8 + 0.8);
    let dy = (Math.random() * 0.8 + 0.8);
    function move() {

        x += dx;
        y += dy;

        if (x <= 0 || x >= window.innerWidth - img.offsetWidth)
            dx *= -1;

        if (y <= 0 || y >= window.innerHeight - img.offsetHeight)
            dy *= -1;

        img.style.left = x + "px";
        img.style.top = y + "px";

        requestAnimationFrame(move);

    }

    move();

    memeIndex++;

    if (memeIndex >= memes.length)
        memeIndex = 0;

}

// Spawn Memes One by One
function unleashChaos() {

    let count = 0;

    const interval = setInterval(() => {

        createMeme();

        count++;

        if (count >= 40)
            clearInterval(interval);

    }, 300);
// Set initial volume (0.0 to 1.0)
music.volume = 0.9;

// Play music when torch turns on
music.play().then(() => {
    console.log("Music started");
}).catch((err) => {
    console.log("Browser blocked autoplay:", err);
});

}