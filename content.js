function waitForElement(selector, timeout = 10000) {
	return new Promise((resolve, reject) => {
		const interval = 100;
		const endTime = Date.now() + timeout;
		const check = () => {
			const elements = document.querySelectorAll(selector);
			if (elements.length > 0) {
				resolve(elements);
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

function waitForTag(selector, timeout = 10000) {
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

chrome.storage.local.get(["likes", "comments", "commentText"], async (data) => {
	const likes = parseInt(data.likes, 10);
	const comments = parseInt(data.comments, 10);
	const commentText = data.commentText;
	let likedCount = 0;
	let commentedCount = 0;
	const commentedPosts = []; 
	while (likedCount < likes || commentedCount < comments) {
	  let likebuttons = await waitForElement(".reactions-react-button.feed-shared-social-action-bar__action-button button.react-button__trigger");
		for (let i = 0; i < likebuttons.length && likedCount < likes; i++) {
			const button = likebuttons[i];
			if (button.getAttribute("aria-pressed") === "false") {
				button.click();
				console.log(`Liked post ${likedCount + 1}`);
				likedCount++;
				await new Promise((resolve) => setTimeout(resolve, 500)); 
			}
		}

		let commentButtons = await waitForElement("button.comment-button");
		for (let i = 0; i < commentButtons.length && commentedCount < comments; i++) {
			const button = commentButtons[i];
			const postElement = button.closest("div.feed-shared-update-v2");
			const postId = postElement.getAttribute("data-urn"); 

			if (postId && !commentedPosts.includes(postId)) {
				button.click();
				await new Promise((resolve) => setTimeout(resolve, 500)); 
				let commentBoxes = await waitForElement("div.ql-editor p");
				commentBoxes = Array.from(commentBoxes).filter((box) => !commentedPosts.includes(postId));
				const lastCommentBox = commentBoxes[commentBoxes.length - 1];
				if (lastCommentBox) {
					lastCommentBox.innerText = commentText;
					const submitButton = await waitForTag("button.comments-comment-box__submit-button");
					if (submitButton) {
						submitButton.click();
						console.log(`Commented on post ${commentedCount + 1}`);
						commentedCount++;
						commentedPosts.push(postId);
						await new Promise((resolve) => setTimeout(resolve, 500)); 
					}
				}
			}
		}
		if (likedCount < likes || commentedCount < comments) {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}

});
