import { WtAngularAuthDemoPage } from './app.po';

describe('wt-angular-auth-demo App', () => {
  let page: WtAngularAuthDemoPage;

  beforeEach(() => {
    page = new WtAngularAuthDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('wt works!');
  });
});
