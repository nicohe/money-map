import { Injectable } from '@angular/core';
import { Wallet } from '../database';

export const StorageKey = "walletID";

@Injectable()
export class WalletService {

    setID(walletID){
        localStorage.setItem(StorageKey, walletID);
    }

    getID() : number {
        return parseInt(localStorage.getItem(StorageKey));
    }

    validateFirstWallet(){
        return new Promise((resolve,reject) => {

            Wallet.first().then((wallet) => {
            
                if(!wallet) {
                    Wallet.createFirst().then((resultado) => {
                        console.log("Creamos la 1ra cartera");
                        this.setID(resultado);
                        resolve();
                    })
                } else {
                    console.log("Ya habia una cartera");
                    this.setID(wallet.id);
                    resolve();
                }
            })
        });
    }
}