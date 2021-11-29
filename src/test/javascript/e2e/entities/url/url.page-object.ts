import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UrlUpdatePage from './url-update.page-object';

const expect = chai.expect;
export class UrlDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('nclApp.url.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-url'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UrlComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('url-heading'));
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
    await navBarPage.getEntityPage('url');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUrl() {
    await this.createButton.click();
    return new UrlUpdatePage();
  }

  async deleteUrl() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const urlDeleteDialog = new UrlDeleteDialog();
    await waitUntilDisplayed(urlDeleteDialog.deleteModal);
    expect(await urlDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/nclApp.url.delete.question/);
    await urlDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(urlDeleteDialog.deleteModal);

    expect(await isVisible(urlDeleteDialog.deleteModal)).to.be.false;
  }
}
