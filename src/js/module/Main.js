import $ from "jquery"
import Router from "./Router"

export default class Main {
  constructor(...optArr) {
    console.log("Hello, world!")

    this.initialize();

    console.log("Thanks, world!");
  }

  initialize() {
    $(_ => {
      this.router = new Router();
    });
  }
}
