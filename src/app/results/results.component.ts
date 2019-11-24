import { Component, OnInit, Input } from '@angular/core';
import { HotelsService, HotelOffer } from '../hotels.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['results.scss']
})
export class ResultsComponent{

@Input() offers;

}
