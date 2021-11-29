import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UrlComponentsPage from './url.page-object';
import UrlUpdatePage from './url-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Url e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let urlComponentsPage: UrlComponentsPage;
  let urlUpdatePage: UrlUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    urlComponentsPage = new UrlComponentsPage();
    urlComponentsPage = await urlComponentsPage.goToPage(navBarPage);
  });

  it('should load Urls', async () => {
    expect(await urlComponentsPage.title.getText()).to.match(/Urls/);
    expect(await urlComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Urls', async () => {
    const beforeRecordsCount = (await isVisible(urlComponentsPage.noRecords)) ? 0 : await getRecordsCount(urlComponentsPage.table);
    urlUpdatePage = await urlComponentsPage.goToCreateUrl();
    await urlUpdatePage.enterData();

    expect(await urlComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(urlComponentsPage.table);
    await waitUntilCount(urlComponentsPage.records, beforeRecordsCount + 1);
    expect(await urlComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await urlComponentsPage.deleteUrl();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(urlComponentsPage.records, beforeRecordsCount);
      expect(await urlComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(urlComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
