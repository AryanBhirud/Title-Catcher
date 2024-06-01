chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "user_data") {
      fetch("http://localhost:5555/getinfo/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(message.data),
      })
          .then((response) => response.json())
          .then((result) => {
              console.log("Success:", result);
          })
          .catch((error) => {
              console.log("Error:", error);
          });
  }
});
