const htmlForm = document.getElementById("createRoomForm") as HTMLFormElement;

console.log(htmlForm);

htmlForm.addEventListener("submit", (event) => {

  event.preventDefault();
  console.log("submitting form");

  //@ts-ignore
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id && htmlForm) {
      console.log("chrome tabs");
      //@ts-ignore
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "SEND_FORM",
            data: {
              roomName: "test-room-001",
              roomPassword: "test-room-001",
            }
        });
    }
  });
})