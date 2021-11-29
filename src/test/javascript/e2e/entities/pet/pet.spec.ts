import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PetComponentsPage from './pet.page-object';
import PetUpdatePage from './pet-update.page-object';
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

describe('Pet e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let petComponentsPage: PetComponentsPage;
  let petUpdatePage: PetUpdatePage;
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
    petComponentsPage = new PetComponentsPage();
    petComponentsPage = await petComponentsPage.goToPage(navBarPage);
  });

  it('should load Pets', async () => {
    expect(await petComponentsPage.title.getText()).to.match(/Pets/);
    expect(await petComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Pets', async () => {
    const beforeRecordsCount = (await isVisible(petComponentsPage.noRecords)) ? 0 : await getRecordsCount(petComponentsPage.table);
    petUpdatePage = await petComponentsPage.goToCreatePet();
    await petUpdatePage.enterData();

    expect(await petComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(petComponentsPage.table);
    await waitUntilCount(petComponentsPage.records, beforeRecordsCount + 1);
    expect(await petComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await petComponentsPage.deletePet();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(petComponentsPage.records, beforeRecordsCount);
      expect(await petComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(petComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
