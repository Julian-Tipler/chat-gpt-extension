export const processStream = async ({ body, autocompleteText, textarea }) => {
  const reader = body.getReader();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      const chunkString = new TextDecoder("utf-8").decode(value);

      const dataChunks = chunkString.split("data: ");
      const nonEmptyChunks = dataChunks.filter((chunk) => chunk.trim() !== "");
      const jsonStrings = nonEmptyChunks.map((chunk) => {
        const trimmedChunk = chunk.trim();
        if (trimmedChunk === "[DONE]") {
          return null; // Skip further processing for [DONE] case
        }
        return trimmedChunk.replace(/^data:\s*/, "");
      });
      const validJsonStrings = jsonStrings.filter(
        (jsonString) => jsonString !== null
      );

      const content = validJsonStrings
        .map((jsonObject) => JSON.parse(jsonObject).choices[0].delta.content)
        .join("");
      addContentWithPossibleSpace({ autocompleteText, textarea, content });
    }
  } catch (error) {
    return;
  }
};

const addContentWithPossibleSpace = ({
  autocompleteText,
  textarea,
  content,
}) => {
  autocompleteText.textContent +=
    !autocompleteText.textContent.length && textarea.value.slice(-1) !== " "
      ? " " + content
      : content;
};
