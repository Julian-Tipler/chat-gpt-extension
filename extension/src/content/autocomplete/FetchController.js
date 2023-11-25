import { fetchStates } from "./constants/fetchStates";

export default class FetchController {
  constructor() {
    this.lastInput = 0;
    this.fetchState = fetchStates.idle;
    this.controller = new AbortController();
  }

  reset() {
    this.lastInput = Date.now();
    this.fetchState = fetchStates.idle;
  }
}
