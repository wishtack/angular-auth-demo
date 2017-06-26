import { browser, element, by } from 'protractor';

export class WtAngularAuthDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('wt-root h1')).getText();
  }
}
