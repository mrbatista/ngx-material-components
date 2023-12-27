import { browser, by, element, promise } from "protractor";

export class AppPage {
  navigateTo(): promise.Promise<unknown> {
    return browser.get("/");
  }

  getParagraphText(): unknown {
    return element(by.css("app-root h1")).getText();
  }
}
