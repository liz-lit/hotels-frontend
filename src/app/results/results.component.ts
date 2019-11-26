import { HotelsService, HotelOffer, SearchParams } from './../hotels.service';
import { Component, OnInit, Input, DoCheck, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['results.scss']
})
export class ResultsComponent implements DoCheck, OnInit {

  offers: HotelOffer[]
  isOffersLoaded: boolean = false
  offers$: Observable<HotelOffer[]>
  searchParams: SearchParams

  constructor(private hotelsService: HotelsService,
    private route: Router,
  ) { }

  ngOnInit() {
    console.log('ngOnInit')
    //this.offers = [];
    this.searchParams = this.hotelsService.searchParams
    console.log('this.searchParams: ', this.searchParams);
    this.offers$ = this.hotelsService.offers$
    console.log('this.offers$: ', this.offers$)
    //this.hotelsService.offers$.subscribe(offers => this.offers = offers);
 

  }

  ngDoCheck() {
    console.log('ngDoCheck')
    /*  this.offers = [];*/
    this.searchParams = this.hotelsService.searchParams
    this.offers$ = this.hotelsService.offers$
    console.log('this.offers$ : ', this.offers$ )
    //this.hotelsService.offers$.subscribe(offers => this.offers = offers)
  }


  clickHandler(hotelName:string, searchParams: SearchParams) {
    
    const {fromDate, toDate, guestQuantity} = searchParams

    this.route.navigate(['/results', hotelName])
    this.hotelsService.getAvailableRooms(hotelName, searchParams)
  }

  getDescriptionById(id) {
    return this.offers.find(offer => offer.hotelName === id)
  }

}
