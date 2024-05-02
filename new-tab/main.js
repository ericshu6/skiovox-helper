import { DragController } from "./drag-controller.js";
import { FullscreenController } from "./fullscreen-controller.js";
import { BatteryDisplay } from "./battery-display.js";
import { DateDisplay } from "./date-display.js";
import { TimeDisplay } from "./time-display.js";
import { BackgroundController } from "./background-controller.js";

const WIFI_URL = "chrome://os-settings/networks?type=WiFi";
const BLUETOOTH_URL = "chrome://bluetooth-pairing";
const SETTINGS_URL = "chrome://settings";
const NEW_TAB_URL = "chrome://new-tab-page";
const FILES_URL = "chrome://file-manager";
const HELP_URL = "https://github.com/bypassiwastaken/skiovox-helper";
const WEBSTORE_URL = "chrome://extensions";
const ADDSESSION_URL = "https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&flowName=GlifWebSignIn&flowEntry=AddSession";

let [
    help,
    webStore,
    addAccount,
    move,
    fullscreen,
    reset,
    theme,
    colorChange,
    wifi,
    bluetooth,
    files,
    settings
] = document.querySelectorAll('svg')

let version = document.querySelector('.version')
let date = document.querySelector('.date')
let time = document.querySelector('.time')
let battery = document.querySelector('.battery')

version.textContent = "v" + chrome.runtime.getManifest().version

wifi.addEventListener('click', () => {
    chrome.tabs.update({ url: WIFI_URL })
})

bluetooth.addEventListener('click', () => {
    chrome.tabs.update({ url: BLUETOOTH_URL })
})

settings.addEventListener('click', () => {
    chrome.tabs.update({ url: SETTINGS_URL })
})

theme.addEventListener('click', () => {
    alert("The original New Tab page will now open. On that page, click the edit icon in the bottom right corner to edit your browser theme.")
    chrome.tabs.update({ url: NEW_TAB_URL })
})

files.addEventListener('click', () => {
    chrome.tabs.update({}, (tab) => {
        chrome.tabs.update(tab.id, { url: FILES_URL })
    })
})

help.addEventListener('click', () => {
    chrome.tabs.create({ url: "https://app.todoist.com/app/inbox", pinned: true })
    chrome.tabs.create({ url: "https://track.toggl.com/timer", pinned: true })
    chrome.tabs.create({ url: "https://docs.google.com/spreadsheets/d/1ujsnLFUMQCpyND8PYUr_vCblBaf4aLpMoyJvfRFx-cU/edit#gid=33385908", pinned: true })
})

webStore.addEventListener('click', () => {
    let version = Number(navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)/)[2]);
    if (version < 113) { // not sure if this is actually the version
        alert("This web store may not supported by your version");
    }

    chrome.tabs.update({ url: WEBSTORE_URL })
})

addAccount.addEventListener('click', () => {
    chrome.tabs.update({ url: ADDSESSION_URL })
})

reset.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset Skiovox helper settings?")) {
        localStorage.clear()
        chrome.runtime.reload()
    }
})

new DragController(move);
new FullscreenController(fullscreen);
new BatteryDisplay(battery);
new DateDisplay(date);
new TimeDisplay(time);
new BackgroundController(colorChange);
