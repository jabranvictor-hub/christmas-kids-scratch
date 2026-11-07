// CHRISTMAS KIDS SCRATCH 🎄

const homePage = document.getElementById("homePage");
const editorPage = document.getElementById("editorPage");
const character = document.getElementById("stageCharacter");
const codeArea = document.getElementById("code");
const stage = document.querySelector(".stage");

let myBlocks = [];
let currentX = 45;
let currentY = 55;
let isRunning = false;

let voiceRecordings = {};
let voiceNumber = 0;

// HOME AND PROJECT
document.getElementById("newProjectBtn").onclick = function () {
    homePage.hidden = true;
    editorPage.hidden = false;
};

document.getElementById("backHomeBtn").onclick = function () {
    editorPage.hidden = true;
    homePage.hidden = false;
};

// HELP
function showHelp() {
    alert(
        "🎄 CHRISTMAS KIDS SCRATCH HELP!\n\n" +
        "1. Choose coding blocks.\n" +
        "2. Add a character.\n" +
        "3. Choose a background.\n" +
        "4. Record your voice with Play Sound.\n" +
        "5. Press Green Flag!"
    );
}

document.getElementById("homeHelpBtn").onclick = showHelp;
document.getElementById("editorHelpBtn").onclick = showHelp;

// SETTINGS
document.getElementById("settingsBtn").onclick = function () {
    alert("⚙️ Christmas Kids Scratch Settings");
};

// ADD BLOCK
function addBlock(block) {
    myBlocks.push(block);

    const item = document.createElement("div");

    if (block.startsWith("SAY:")) {
        item.textContent = "💬 " + block.substring(4);
    } else if (block.startsWith("WAIT:")) {
        item.textContent = "⏱️ Wait 1 second";
    } else if (block.startsWith("VOICE:")) {
        item.textContent = "🎙️ Play My Voice";
    } else {
        item.textContent = block;
    }

    item.style.padding = "10px";
    item.style.margin = "5px";
    item.style.background = "#c8f7c5";
    item.style.borderRadius = "8px";

    codeArea.appendChild(item);
}

// MOVEMENT
document.querySelectorAll(".move").forEach(function (button) {
    button.onclick = function () {
        addBlock(this.textContent.trim());
    };
});

// SAY
document.querySelectorAll(".looks").forEach(function (button) {
    button.onclick = function () {
        const message = prompt(
            "What should your character say?",
            "Merry Christmas!"
        );

        if (message && message.trim()) {
            addBlock("SAY:" + message);
        }
    };
});

// WAIT
document.querySelectorAll(".control").forEach(function (button) {
    button.onclick = function () {
        addBlock("WAIT:1");
    };
});

// RECORD MY VOICE
async function recordMyVoice() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Microphone recording needs localhost or a secure website.");
        return;
    }

    let stream;

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
    } catch (error) {
        alert("Microphone permission was not granted. Please allow microphone access.");
        return;
    }

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    const panel = document.createElement("div");

    panel.style.cssText =
        "position:fixed;top:25%;left:10%;width:80%;" +
        "background:white;padding:20px;border-radius:15px;" +
        "z-index:20000;text-align:center;box-shadow:0 0 20px gray;";

    const heading = document.createElement("h2");
    heading.textContent = "🎙️ Voice Recording Studio";

    const status = document.createElement("p");
    status.textContent = "Ready to record!";

    const startButton = document.createElement("button");
    startButton.textContent = "🔴 Start Recording";

    const stopButton = document.createElement("button");
    stopButton.textContent = "⏹️ Stop & Save";
    stopButton.disabled = true;

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    [startButton, stopButton, cancelButton].forEach(function (button) {
        button.style.padding = "12px";
        button.style.margin = "6px";
        button.style.cursor = "pointer";
    });

    panel.appendChild(heading);
    panel.appendChild(status);
    panel.appendChild(startButton);
    panel.appendChild(stopButton);
    panel.appendChild(cancelButton);

    document.body.appendChild(panel);

    let cancelled = false;

    function closePanel() {
        stream.getTracks().forEach(track => track.stop());
        panel.remove();
    }

    startButton.onclick = function () {
        chunks.length = 0;

        recorder.start();

        status.textContent = "🔴 Recording... Speak now!";

        startButton.disabled = true;
        stopButton.disabled = false;
    };

    stopButton.onclick = function () {
        if (recorder.state === "recording") {
            recorder.stop();
        }

        status.textContent = "Saving your recording...";

        stopButton.disabled = true;
    };

    cancelButton.onclick = function () {
        cancelled = true;

        if (recorder.state === "recording") {
            recorder.stop();
        }

        closePanel();
    };

    recorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };

    recorder.onstop = async function () {
        if (cancelled) return;

        const audioBlob = new Blob(chunks, {
            type: recorder.mimeType || "audio/webm"
        });

        const reader = new FileReader();

        reader.onloadend = function () {
            voiceNumber++;

            const voiceID = "voice-" + voiceNumber;

            voiceRecordings[voiceID] = reader.result;

            closePanel();

            addBlock("VOICE:" + voiceID);

            alert("🎉 Your voice recording has been saved!");
        };

        reader.readAsDataURL(audioBlob);
    };
}

// PLAY SOUND BUTTON OPENS RECORDING STUDIO
document.querySelectorAll(".sound").forEach(function (button) {
    button.onclick = recordMyVoice;
});

// ADD CHARACTER
function chooseCharacter() {
    const choice = prompt(
        "Choose a character:\n\n" +
        "1. 🎅 Santa\n" +
        "2. ⛄ Snowman\n" +
        "3. 🦌 Reindeer\n" +
        "4. 🐧 Penguin"
    );

    const characters = {
        "1": "🎅",
        "2": "⛄",
        "3": "🦌",
        "4": "🐧"
    };

    if (characters[choice]) {
        character.textContent = characters[choice];
    }
}

document.querySelectorAll("#addCharacterBtn").forEach(function (button) {
    button.onclick = chooseCharacter;
});

// ADD BACKGROUND
function chooseBackground() {
    const choice = prompt(
        "Choose a background:\n\n" +
        "1. ❄️ Snow\n" +
        "2. 🌲 Forest\n" +
        "3. 🌌 Night"
    );

    const backgrounds = {
        "1": "linear-gradient(#dff6ff, white)",
        "2": "linear-gradient(#8bd18b, #e8ffe8)",
        "3": "linear-gradient(#172554, #64748b)"
    };

    if (backgrounds[choice]) {
        stage.style.background = backgrounds[choice];
    }
}

document.querySelectorAll("#addBackgroundBtn").forEach(function (button) {
    button.onclick = chooseBackground;
});

// SAVE PROJECT
document.getElementById("saveBtn").onclick = function () {
    const name = prompt("Enter your project name:", "Christmas Project");

    if (!name || !name.trim()) return;

    const projects = JSON.parse(
        localStorage.getItem("christmasProjects") || "[]"
    );

    const project = {
        name: name.trim(),
        blocks: [...myBlocks],
        character: character.textContent,
        background: stage.style.background,
        recordings: { ...voiceRecordings }
    };

    projects.push(project);

    localStorage.setItem(
        "christmasProjects",
        JSON.stringify(projects)
    );

    alert("🎉 Project saved successfully!");
};

// MY PROJECTS
document.getElementById("projectsBtn").onclick = function () {
    const projects = JSON.parse(
        localStorage.getItem("christmasProjects") || "[]"
    );

    if (projects.length === 0) {
        alert("📂 No saved projects yet!");
        return;
    }

    const panel = document.createElement("div");

    panel.style.cssText =
        "position:fixed;top:10%;left:10%;width:80%;" +
        "max-height:75%;overflow:auto;background:white;" +
        "padding:20px;border-radius:15px;z-index:10000;" +
        "box-shadow:0 0 20px gray;";

    const heading = document.createElement("h2");
    heading.textContent = "🎄 My Projects";
    panel.appendChild(heading);

    projects.forEach(function (project) {
        const button = document.createElement("button");

        button.textContent = "📁 " + project.name;
        button.style.cssText =
            "display:block;width:100%;padding:15px;margin:8px 0;";

        button.onclick = function () {
            myBlocks = [];
            codeArea.innerHTML = "";

            voiceRecordings = project.recordings || {};

            project.blocks.forEach(addBlock);

            character.textContent = project.character;
            stage.style.background = project.background;

            currentX = 45;
            currentY = 55;

            character.style.left = "45%";
            character.style.top = "55%";

            panel.remove();

            homePage.hidden = true;
            editorPage.hidden = false;

            alert("🎉 Project opened: " + project.name);
        };

        panel.appendChild(button);
    });

    const close = document.createElement("button");
    close.textContent = "✖ Close";

    close.onclick = function () {
        panel.remove();
    };

    panel.appendChild(close);
    document.body.appendChild(panel);
};

// RUN PROJECT
async function runScripts() {
    if (isRunning) return;

    isRunning = true;

    for (const block of myBlocks) {
        if (!isRunning) break;

        // CHARACTER SPEECH
        if (block.startsWith("SAY:")) {
            const bubble = document.createElement("div");

            bubble.textContent = block.substring(4);

            bubble.style.cssText =
                "position:absolute;left:" + currentX +
                "%;top:" + (currentY - 15) +
                "%;background:white;padding:10px;" +
                "border-radius:12px;z-index:100;";

            stage.appendChild(bubble);

            await new Promise(resolve => setTimeout(resolve, 2000));

            bubble.remove();
            continue;
        }

        // WAIT
        if (block.startsWith("WAIT:")) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }

        // PLAY RECORDED VOICE
        if (block.startsWith("VOICE:")) {
            const voiceID = block.substring(6);
            const recording = voiceRecordings[voiceID];

            if (recording) {
                const audio = new Audio(recording);

                try {
                    await audio.play();

                    await new Promise(resolve => {
                        audio.onended = resolve;
                        audio.onerror = resolve;
                    });
                } catch (error) {
                    alert("Could not play your recording.");
                }
            }

            continue;
        }

        // MOVEMENT
        if (block.includes("Right")) currentX += 10;
        if (block.includes("Left")) currentX -= 10;
        if (block.includes("Up")) currentY -= 10;
        if (block.includes("Down")) currentY += 10;

        currentX = Math.max(0, Math.min(90, currentX));
        currentY = Math.max(0, Math.min(85, currentY));

        character.style.left = currentX + "%";
        character.style.top = currentY + "%";

        await new Promise(resolve => setTimeout(resolve, 500));
    }

    isRunning = false;
}

// GREEN FLAG AND RUN
document.getElementById("greenFlag").onclick = runScripts;
document.getElementById("runBtn").onclick = runScripts;

// STOP
function stopScripts() {
    isRunning = false;
}

document.getElementById("stopButton").onclick = stopScripts;
document.getElementById("stopBtn").onclick = stopScripts;

// RESET
document.getElementById("resetBtn").onclick = function () {
    stopScripts();

    currentX = 45;
    currentY = 55;

    character.style.left = "45%";
    character.style.top = "55%";

    myBlocks = [];
    codeArea.innerHTML = "Your coding blocks will appear here!";
};

console.log("🎄 CHRISTMAS KIDS SCRATCH READY!");