chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'capture') {
		chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], sender.tab, (streamId) => {
			if (!streamId) {
				sendResponse({ type: 'error', message: 'Failed to get stream ID' });
			} else {
				sendResponse({ type: 'success', streamId: streamId });
			}
		});
		return true; 
	}
});
