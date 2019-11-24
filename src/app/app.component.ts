import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';

export interface HotelOffer {
  hotelName: string
  type: number
  city: string
  totalCost: number
}

export interface PayloadData {
  'hotel_name': string
  type: number
  city: string
  'total_cost': number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  offers: HotelOffer[];
  isOffersLoaded: boolean = false;
  constructor(private http: HttpClient) {
  }

  doSearch({ fromDate, toDate, guestQuantity, minPrice, maxPrice }) {
    console.log('fromDate, toDate, guestQuantity, minPrice, maxPrice', fromDate, toDate, guestQuantity, minPrice, maxPrice)

    this.isOffersLoaded = false;

    const port = 3000;
    const url = `http://localhost/api/hotels`;
    const params = new HttpParams()
      .set('arrival', fromDate)
      .set('departure', toDate)
      .set('guest_quantity', guestQuantity)
      .set('min_price', minPrice)
      .set('max_price', maxPrice)

    this.offers = [];
    const url1 = 'http://localhost/api/hotels';
    this.http.get<PayloadData[]>(url1, { params })
      .pipe(delay(1000))
      .subscribe((payload) => {
        console.log('offers', payload)

        this.isOffersLoaded = true;

        this.offers = payload.map((val) => ({
          hotelName: val['hotel_name'],
          type: val.type,
          city: val.city,
          totalCost: val['total_cost']
        }))
      });
  }
}




