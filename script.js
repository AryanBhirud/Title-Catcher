document.getElementById('record').addEventListener('click', async () => {
	try {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tab.id) {
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ['content.js']
			});
		} else {
			console.error('No active tab found');
		}
	} catch (error) {
		console.error('Error injecting script: ', error);
	}
});
