import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/general/Client';
import { ClientsService } from 'src/app/services/clients.service';
import { OrderService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {

  constructor(
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  client: Client
  orders;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.clientService.getClient(params['id']).subscribe(
          client => {
            this.client = client;
          })
        this.orderService.getOrders(params['id']).subscribe(
          result => {
            this.orders = result.content;
          }
        )
      }
    )
    this.orderService.newOrders.subscribe(
      result => {
        this.orderService.getOrders(this.client.id).subscribe(
          result => {
            this.orders = result.content;
          }
        )
      }
    )
  }

}
