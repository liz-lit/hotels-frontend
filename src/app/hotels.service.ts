import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { delay } from 'rxjs/operators';


export interface HotelOffer {
  hotelName: string
  type: number
  city: string
  totalCost: number
}

@Injectable({ providedIn: 'root' })
export class HotelsService {

  hotelOffers: HotelOffer[] = [];

  constructor(private http: HttpClient) {
  }

  getOffers(
    fromDate: string,
    toDate: string,
    guestQuantity: string,
    minPrice: string,
    maxPrice: string
  ) {
    this.hotelOffers = [];
    const url = '/api/hotels';
    const url1 = 'http://localhost:3000/posts';

    const params = new HttpParams()
      .set('arrival', fromDate)
      .set('depature', toDate)
      .set('guest_qunantity', guestQuantity)
      .set('min_price', minPrice)
      .set('max_price', maxPrice)

    this.http.get<HotelOffer[]>(url1)
      .pipe(delay(100))
      .subscribe((response) => {
        console.log('response: ', response);
        this.hotelOffers = response
      });

  }
}