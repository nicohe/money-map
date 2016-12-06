import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';
import { GeolocationService } from '../../services/geolocation.service';
import { Transaction } from '../../database';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map : GoogleMap = null;

  constructor(public navCtrl: NavController, public geolocator : GeolocationService) {}

  ionViewDidEnd() {
    this.geolocator.get().then((result) => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    }).catch((err) => console.log(err));

  }

  loadMap(lat,lng) {

   let location: GoogleMapsLatLng = new GoogleMapsLatLng(lat,lng);

   this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => this.loadMarkers())

  }

  loadMarkers(){
    Transaction.all().then((results) => this.loadTransactionMarkers(results));
  }

  loadTransactionMarkers(transactions){
    for (var i = 0; i < transactions.lenght; ++i){
      let transaction = transactions[i];

      if(!transaction.hasLocation()) continue;

      let markerLocation : GoogleMapsLatLng = new GoogleMapsLatLng(transaction.lat, transaction.lng);

      let markerOptions : GoogleMapsMarkerOptions = {
        position: markerLocation,
        title: transaction.title,
        icon: transaction.getImage()
      };

      this.map.addMarker(markerOptions).then((marker : GoogleMapsMarker) => {
        marker.showInfoWindow();
      }).catch(err => console.log(err));
    }
  }
}
