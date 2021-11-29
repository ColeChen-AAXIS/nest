import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import OrderUpdatePage from './order-update.page-object';

const expect = chai.expect;
export class OrderDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('nclApp.order.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-order'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OrderComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('order-heading'));
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
    await navBarPage.getEntityPage('order');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOrder() {
    await this.createButton.click();
    return new OrderUpdatePage();
  }

  async deleteOrder() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const orderDeleteDialog = new OrderDeleteDialog();
    await waitUntilDisplayed(orderDeleteDialog.deleteModal);
    expect(await orderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/nclApp.order.delete.question/);
    await orderDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(orderDeleteDialog.deleteModal);

    expect(await isVisible(orderDeleteDialog.deleteModal)).to.be.false;
  }
}
