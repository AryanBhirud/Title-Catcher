document.addEventListener("DOMContentLoaded", function () {
  const likesInput = document.getElementById("likes");
  const commentsInput = document.getElementById("comments");
  const commentTextInput = document.getElementById("commentText");
  const startButton = document.getElementById("startButton");

  function validateInputs() {
    startButton.disabled = !likesInput.value || !commentsInput.value || !commentTextInput.value.trim();
  }

  likesInput.addEventListener("input", validateInputs);
  commentsInput.addEventListener("input", validateInputs);
  commentTextInput.addEventListener("input", validateInputs);

  startButton.addEventListener("click", function () {
    const likes = parseInt(likesInput.value.trim(), 10);
    const comments = parseInt(commentsInput.value, 10);
    const commentText = commentTextInput.value;

    chrome.storage.local.set({ likes, comments, commentText }, () => {
      chrome.tabs.create({ url: "https://www.linkedin.com/feed/" });
    });
  });
});
