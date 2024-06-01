function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const interval = 100;
        const endTime = Date.now() + timeout;
        const check = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (Date.now() < endTime) {
                setTimeout(check, interval);
            } else {
                reject(
                    new Error(
                        `Element with selector "${selector}" not found within ${timeout}ms`
                    )
                );
            }
        };
        check();
    });
}

async function extractLinkedInData() {
    try {
        const nameElement = await waitForElement("h1");
        const bioElement = await waitForElement(".text-body-medium");
        const locElement = await waitForElement(
            ".text-body-small.inline.t-black--light.break-words"
        );
        const followersElement = await waitForElement(
            '.artdeco-card .rQrgCqdAxxLhIAcLhxdsifdagjxISOpE span'
        );
        const aboutElement = await waitForElement(
            ".JSzNEGEyfojpwDGomLCFeVXPtVfgJfKE span"
        );
        const connectionElement = await waitForElement(
            ".OnsbwwsPVDGkAkHfUohWiCwsWEWrcqkY "
        );

        const followerCount = parseInt(
            followersElement.innerText
                .replace(/,/g, "")
                .replace(" followers", "")
        );

        const user = {
            name: nameElement.innerText,
            bio: bioElement.innerText,
            location: locElement.innerText,
            followerCount: followersElement.innerText
                .replace(/,/g, "")
                .replace(" followers", ""),
            about: aboutElement.innerText,
            url: document.URL,
        };

        const connectionText = connectionElement.innerText.replace("\n", "");
        if (/\d+([+])? connections/.test(connectionText)) {
            user.connectionCount = 501;
        } else if (/\d+([+])? connections/.test(connectionText)) {
            const connectionCount = parseInt(
                connectionText.replace(" connections", "")
            );
            user.connectionCount = connectionCount;
        }
        console.log(user);
        chrome.runtime.sendMessage({ type: "user_data", data: user });
    } catch (error) {
        console.error("Error fetching elements:", error);
    }
}

extractLinkedInData();
