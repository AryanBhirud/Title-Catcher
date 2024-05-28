document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("get-title-button")
        .addEventListener("click", catchTitle);
});
function catchTitle() {
    const tabTitle = document.getElementById("tab-title")
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tabTitle.textContent = tabs[0].title;
        resizeExtension(tabs[0].title.length);
    });
}
function resizeExtension(titleLength) {
    const baseWidth = 250;
    const newWidth = baseWidth + titleLength * 4;
    document.body.style.width = `${newWidth}px`;
}
