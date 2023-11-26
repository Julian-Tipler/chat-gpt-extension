import { fetchStates } from "./constants/fetchStates";

export default class FetchController {
  constructor() {
    this.lastInput = 0;
    this.fetchState = fetchStates.idle;
    this.controller = new AbortController();
  }

  // This cancels the fetch request and resets the fetch state
  reset() {
    this.resetLastInput();
    this.resetFetchState();
    this.resetAbortController();
  }

  resetLastInput() {
    this.lastInput = Date.now();
  }

  resetFetchState() {
    this.fetchState = fetchStates.idle;
  }

  resetAbortController() {
    this.controller.abort();
    this.controller = new AbortController();
  }

  startFetch() {
    this.fetchState = fetchStates.fetching;
  }

  successfulFetch() {
    this.fetchState = fetchStates.fetched;
  }

  fetchError() {
    console.log("fetch error");
    this.fetchState = fetchStates.error;
  }
}
