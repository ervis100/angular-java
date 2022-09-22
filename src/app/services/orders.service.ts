import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";

@Injectable({providedIn:"root"})
export class OrderService {

    constructor(
        private http:HttpClient
        ) {}
    
    newOrders = new Subject();
    
    getOrders(clientId) {
        return this.http.get<any>('http://localhost:8080/api/client/'+clientId+'/order')
    }

    getDetails(clientId , orderId) {
        return this.http.get<any>('http://localhost:8080/api/client/'+clientId+'/order/'+orderId)
    }

    getProducts(){
        return this.http.get<any>('http://localhost:8080/api/product').pipe(
            map(products=>{
                let productsArr = []
                products.content.map(element =>{
                    let newProd = {id: element.id , name:element.name}
                    productsArr.push(newProd) 
                })
                return productsArr
            })
        )
    }

    storeOrder(clientId, order){
        this.http.post('http://localhost:8080/api/client/'+clientId+'/order' , order).subscribe(
          result=>
           this.newOrders.next(null)
        )
    }
}