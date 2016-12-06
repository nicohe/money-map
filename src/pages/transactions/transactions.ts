import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Transaction } from '../../database';
import { AddingPage } from '../adding/adding';
/*

  Generated class for the Transactions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {

  transactions : any;
  title : string = "Movimientos";
  addingPage = AddingPage;

  constructor(public navCtrl: NavController) {}

  ionViewWillEnter() {

    this.loadTransactions();
  }

  loadTransactions(){
    Transaction.all()
               .then((resultados) => this.transactions = resultados);
  }

}
