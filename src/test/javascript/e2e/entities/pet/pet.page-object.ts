import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PetUpdatePage from './pet-update.page-object';

const expect = chai.expect;
export class PetDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('nclApp.pet.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-pet'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PetComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('pet-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('pet');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePet() {
    await this.createButton.click();
    return new PetUpdatePage();
  }

  async deletePet() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const petDeleteDialog = new PetDeleteDialog();
    await waitUntilDisplayed(petDeleteDialog.deleteModal);
    expect(await petDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/nclApp.pet.delete.question/);
    await petDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(petDeleteDialog.deleteModal);

    expect(await isVisible(petDeleteDialog.deleteModal)).to.be.false;
  }
}
