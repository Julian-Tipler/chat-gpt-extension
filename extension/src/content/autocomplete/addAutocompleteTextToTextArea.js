export const addAutocompleteTextToTextArea = ({
  textarea,
  autocompleteText,
}) => {
  textarea.value += autocompleteText.innerText;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.focus();
  autocompleteText.innerText = "";
};
