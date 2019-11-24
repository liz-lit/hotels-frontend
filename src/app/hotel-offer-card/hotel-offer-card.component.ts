import { Component, Input } from '@angular/core';
import {HotelOffer} from '../hotels.service'

@Component({
  selector: 'app-hotel-offer-card',
  templateUrl: './hotel-offer.component.html',
  styleUrls: ['./hotel-offer-card.component.scss']
})
export class HotelOfferCardComponent  {
  @Input() hotelOffer: HotelOffer
}
