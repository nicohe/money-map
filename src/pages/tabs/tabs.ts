import { Component } from '@angular/core';

import { TransactionsPage } from '../transactions/transactions';
import { MapPage } from '../map/map';
import { WalletsPage } from '../wallets/wallets';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TransactionsPage;
  tab2Root: any = MapPage;
  tab3Root: any = WalletsPage;

  constructor() {

  }
}
