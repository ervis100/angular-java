import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private orderService:OrderService
    ) { }

  details;
  user;
  parentParam;

  ngOnInit(): void {
    this.activatedRoute.parent.params.pipe(tap(
      result =>{
        this.parentParam = result['id'];
      }
    )).subscribe(
      result=>{}
    )
    this.activatedRoute.params.subscribe(
      (params:Params) =>{
        this.orderService.getDetails(this.parentParam, params['order']).subscribe(
          details => {
            this.details = details;
            this.user = details.user;
          }
        )
      }
    )
  }

}
