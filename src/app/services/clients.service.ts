import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { Client } from "../general/Client";

@Injectable({ providedIn: 'root' })
export class ClientsService {
    constructor(private http: HttpClient) { }
    clientsChanged = new Subject<Client[]>();
    parametersChanged = new Subject<{
        pageNo:number,
        pageSize:number,
        totalElements:number
    }>();

    fetchClients(pageNo , pageSize) {
        return this.http.get<any>('http://localhost:8080/api/client', { params: { pageNo: pageNo, pageSize: pageSize } })
            .pipe(map(result => {
                result.content = result.content.map( client => {
                    return new Client(client.name, client.email, client.id)
                })
                return result;
            })).subscribe(
                result => {
                    this.clientsChanged.next(result.content)
                    console.log(result)
                    this.parametersChanged.next({pageNo:result.pageNo ,pageSize:result.pageSize , totalElements:result.totalElements})
            })
    }

    getClient(id) {
       return this.http.get<{createdAt:Date,email:string,id:number,name:string,updatedAt:Date}>('http://localhost:8080/api/client/'+id)
    }

    updateClient(client:{name:string , email:string} , id:number) {
       return this.http.put( 'http://localhost:8080/api/client/'+id ,client)
    }

    storeClient(client:{name:string , email:string} ) {
        return this.http.post('http://localhost:8080/api/client' , client)
    }
}
