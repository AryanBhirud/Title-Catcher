document.getElementById('extractButton').addEventListener('click', async () => {
    const urls = document.getElementById('linkedinUrls').value.split('\n').filter(url => url.trim());
    if (urls.length < 3) {
      alert('Please provide at least 3 LinkedIn profile URLs');
      return;
    }

    for (const url of urls) {
        await chrome.tabs.create({ url }); 
    }
});
