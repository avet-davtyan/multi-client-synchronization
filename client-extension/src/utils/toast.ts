export function showToast(message: string = "success", duration: number = 3000) {

  let toastContainer = document.getElementById("custom-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "custom-toast-container";
    toastContainer.style.position = "fixed";
    toastContainer.style.top = "20px";
    toastContainer.style.right = "20px";
    toastContainer.style.zIndex = "9999";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.marginTop = "5px";
  toast.style.opacity = "1";
  toast.style.transition = "opacity 0.5s ease-out";

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

