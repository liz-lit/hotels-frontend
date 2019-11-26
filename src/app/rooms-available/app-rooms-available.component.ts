import { HotelsService, RoomsAvailable } from '../hotels.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-available',
  templateUrl: './app-rooms-available.component.html',
  styleUrls: ['./app-rooms-available.component.scss']
})
export class RoomsAvailableComponent implements OnInit {

  description: any
  data: any

  roomsAvailable$: Observable<RoomsAvailable[]>
  rooms: RoomsAvailable[]

  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService
  ) { }

  ngOnInit() {

    this.roomsAvailable$ = this.hotelsService.roomsAvailable$

  }

}
