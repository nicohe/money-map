import { Injectable } from '@angular/core';
import { Wallet } from '../database';

@Injectable()
export class WalletService {
    validateFirstWallet(){
        return new Promise((resolve,reject) => {

            Wallet.first().then((wallet) => {
            
                if(!wallet) {
                    Wallet.createFirst().then((resultado) => {
                        console.log("Creamos la 1ra cartera");
                        resolve();
                    })
                } else {
                    console.log("Ya habia una cartera");
                    resolve();
                }
            })
        });
    }
}