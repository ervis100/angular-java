import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Client } from 'src/app/general/Client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(
    private clientService: ClientsService,
    ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  clients: Client[];
  totalElements = 0;
  pageNo = 0;
  pageSize = 5;
  totalPages;

  ngOnInit(): void {
    this.clientService.fetchClients(this.pageNo,this.pageSize);
    this.clientService.parametersChanged.subscribe(
      result => {
        this.totalElements = result.totalElements;
        this.pageSize = result.pageSize;
        this.pageNo = result.pageNo;
      }
    ) 
    this.clientService.clientsChanged.subscribe(
      result => {
        this.clients = result;
      }
    );   
  }

  onPaginatorChange(event) {
    this.pageNo = event.pageIndex;
    this.pageSize = event.pageSize;
    this.clientService.fetchClients(this.pageNo , this.pageSize);
  }
}

