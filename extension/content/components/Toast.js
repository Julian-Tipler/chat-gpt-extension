import "./Toast.css";

export const showToast = (text) => {
  // Create the notification element
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = text;

  // Append the toast to the body
  document.body.appendChild(toast);

  // Remove the toast after 2 seconds
  setTimeout(() => {
    toast.remove();
  }, 2000); // Adjust timing as needed
};

// Assuming you have a button with an ID 'copyButton'
