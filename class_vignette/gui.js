const hideShowSettingsButton = document.querySelector("#settings-panel #settings_hide-hover");
const settingsContent = document.querySelector("#settings-panel #content");
const allowFullscreenBtn = document.getElementById("allow_fullscreen");
const saveData = new CustomEvent("savedata", {
    propEdit: null
});
document.addEventListener("savedata", () => {
    window.localStorage.properties = properties;
});
saveData.a
function hideAndShowSettings() {
    const settingsContentVisibleAtrib = settingsContent.getAttribute("hide");
    const settingsContentVisibleBoollean = settingsContentVisibleAtrib == "true" ? true : false;
    settingsContent.setAttribute("hide", !settingsContentVisibleBoollean);
    hideShowSettingsButton.setAttribute("settings-hover", !!settingsContentVisibleBoollean);
}
hideShowSettingsButton.addEventListener("click", hideAndShowSettings);
function reqFullscreen() {
    const DOM = document.body;
    if(!window.fullScreen) {
        DOM.requestFullscreen();
        return;
    }
    document.exitFullscreen().catch((e) => {
        throw new Error("Exit fullscreen error", e);
    });
}
allowFullscreenBtn.addEventListener("click", reqFullscreen);
function loadFromStorage() {
    const propertiesInStorage = window.localStorage.properties;
    if (propertiesInStorage != undefined) {
        //properties = propertiesInStorage;
    }
}
window.addEventListener("DOMContentLoaded", () => {
    loadFromStorage();
});
const fovTextInput = document.querySelector("#settings-panel label[for=\"fov\"] #fov-text");
const fovRangeInput = document.querySelector("#settings-panel #fov");
function fovChange(fov) {
    properties.fieldOfView = Number(fov);
}
fovRangeInput.addEventListener("input", () => {
    fovTextInput.innerHTML = fovRangeInput.value;
    document.dispatchEvent(saveData);
    fovChange(fovRangeInput.value);
});
fovTextInput.addEventListener("input", () => {
    fovRangeInput.value = fovTextInput.innerHTML;
    fovChange(fovTextInput.innerHTML);
});