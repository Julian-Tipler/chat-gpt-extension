export const resetFetchState = ({ controller }) => {
  controller.abort();
  controller = new AbortController();
};
