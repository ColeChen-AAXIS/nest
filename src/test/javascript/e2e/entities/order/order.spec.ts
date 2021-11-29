import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OrderComponentsPage from './order.page-object';
import OrderUpdatePage from './order-update.page-object';
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

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderComponentsPage: OrderComponentsPage;
  let orderUpdatePage: OrderUpdatePage;
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
    orderComponentsPage = new OrderComponentsPage();
    orderComponentsPage = await orderComponentsPage.goToPage(navBarPage);
  });

  it('should load Orders', async () => {
    expect(await orderComponentsPage.title.getText()).to.match(/Orders/);
    expect(await orderComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Orders', async () => {
    const beforeRecordsCount = (await isVisible(orderComponentsPage.noRecords)) ? 0 : await getRecordsCount(orderComponentsPage.table);
    orderUpdatePage = await orderComponentsPage.goToCreateOrder();
    await orderUpdatePage.enterData();

    expect(await orderComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(orderComponentsPage.table);
    await waitUntilCount(orderComponentsPage.records, beforeRecordsCount + 1);
    expect(await orderComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await orderComponentsPage.deleteOrder();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(orderComponentsPage.records, beforeRecordsCount);
      expect(await orderComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(orderComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
