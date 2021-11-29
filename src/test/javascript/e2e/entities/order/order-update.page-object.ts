import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class OrderUpdatePage {
  pageTitle: ElementFinder = element(by.id('nclApp.order.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quantityInput: ElementFinder = element(by.css('input#order-quantity'));
  shipDateInput: ElementFinder = element(by.css('input#order-shipDate'));
  statusSelect: ElementFinder = element(by.css('select#order-status'));
  completeInput: ElementFinder = element(by.css('input#order-complete'));
  petIdSelect: ElementFinder = element(by.css('select#order-petId'));
  userSelect: ElementFinder = element(by.css('select#order-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return this.quantityInput.getAttribute('value');
  }

  async setShipDateInput(shipDate) {
    await this.shipDateInput.sendKeys(shipDate);
  }

  async getShipDateInput() {
    return this.shipDateInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  getCompleteInput() {
    return this.completeInput;
  }
  async petIdSelectLastOption() {
    await this.petIdSelect.all(by.tagName('option')).last().click();
  }

  async petIdSelectOption(option) {
    await this.petIdSelect.sendKeys(option);
  }

  getPetIdSelect() {
    return this.petIdSelect;
  }

  async getPetIdSelectedOption() {
    return this.petIdSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setQuantityInput('5');
    expect(await this.getQuantityInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setShipDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getShipDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    const selectedComplete = await this.getCompleteInput().isSelected();
    if (selectedComplete) {
      await this.getCompleteInput().click();
      expect(await this.getCompleteInput().isSelected()).to.be.false;
    } else {
      await this.getCompleteInput().click();
      expect(await this.getCompleteInput().isSelected()).to.be.true;
    }
    await this.petIdSelectLastOption();
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
