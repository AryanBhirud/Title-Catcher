document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("get-title-button")
        .addEventListener("click", catchTitle);
});
function catchTitle() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            document.getElementById("tab-title").textContent =
                "No active tab found";
            console.log("No Active Tabs Found!");
            return;
        }
        document.getElementById("tab-title").textContent = tabs[0].title;
        resizeExtension(tabs[0].title.length);
    });
}
function resizeExtension(titleLength) {
    const baseWidth = 250;
    const newWidth = baseWidth + titleLength * 4;
    document.body.style.width = `${newWidth}px`;
}
