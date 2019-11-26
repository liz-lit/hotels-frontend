import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { delay, map, catchError } from 'rxjs/operators';
import { Observable, throwError, Subject, of } from 'rxjs';

export interface HotelOffer {
  hotelName: string
  type: number
  city: string
  totalCost: number
}

export interface OffersPayloadData {
  'hotel_name': string
  type: number
  city: string
  'total_cost': number
}

export interface RoomsPayloadData {
  'type_name': string
  'rooms_quantity': number
  price: string
  'total_cost': number
}

export interface RoomsAvailable {
  typeName: string
  roomsQuantity: number
  pricePerDay: string
  totalCost: number
}


export interface SearchParams {
  fromDate: string
  toDate: string
  guestQuantity: string
  minPrice: string
  maxPrice: string
}

@Injectable({ providedIn: 'root' })
export class HotelsService {

  offers: HotelOffer[] = []
  offers$: Observable<HotelOffer[]>

  searchParams: SearchParams

  roomsAvailable$: Observable<RoomsAvailable[]>

  constructor(private http: HttpClient) {
  }

  getOffers(
    fromDate: string,
    toDate: string,
    guestQuantity: string,
    minPrice: string,
    maxPrice: string
  ) {

    this.searchParams = { fromDate, toDate, guestQuantity, minPrice, maxPrice }
    console.log('guestQuantity: ', guestQuantity);
    const url = '/api/hotels';
    const url1 = 'http://localhost/api/results';

    const params = new HttpParams()
      .set('arrival', fromDate)
      .set('departure', toDate)
      .set('guest_quantity', guestQuantity)
      .set('min_price', minPrice)
      .set('max_price', maxPrice)

    this.offers$ = this.http.get<OffersPayloadData[]>(url1, { params })
      .pipe(delay(1000),
        catchError(this.handleError),
        map((array) => {
          return array.map((val) => ({
            hotelName: val['hotel_name'],
            type: val.type,
            city: val.city,
            totalCost: val['total_cost']
          }))
        }))
    /*.subscribe((offers) => {
     this.offers = offers;
   }); */

  }

  private handleError(error: HttpErrorResponse) {
    console.log('error: ', error);
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }

    return throwError('Something bad happened; please try again later.')
  }

  getAvailableRooms(hotelName, searchParams) {

    const {fromDate, toDate, guestQuantity} = searchParams
    const url = '/api/rooms';
    const url1 = 'http://localhost/api/rooms';

    const params = new HttpParams()
      .set('hotel_name', hotelName)
      .set('arrival', fromDate)
      .set('departure', toDate)
      .set('guest_quantity', guestQuantity)

    this.roomsAvailable$ = this.http.get<RoomsPayloadData[]>(url1, { params })
    
      .pipe(delay(1000),
        catchError(this.handleError),
        map((array) => {
          return array.map((val) => ({
            typeName: val['type_name'],
            roomsQuantity: val['rooms_quantity'],
            pricePerDay: val.price,
            totalCost: val['total_cost']
          }))
        }))

        console.log('this.roomsAvailable$: ', this.roomsAvailable$);
  }

}
