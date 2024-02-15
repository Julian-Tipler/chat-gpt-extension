export function addPrompt(text) {
  const textarea = document.querySelector("textarea");
  if (textarea) {
    const currentText = textarea.value.trim();
    if (currentText !== "") {
      textarea.value += "\n\n" + text;
    } else {
      textarea.value += text;
    }
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
  }
}
