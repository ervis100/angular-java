import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { OrderService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private activatedRoute:ActivatedRoute
    ) { }

  newOrderForm: FormGroup;
  clientId;
  products;

  @ViewChild('sel') select: ElementRef; 

  ngOnInit(): void {
    /**
     * get client id from parent route params 
     */
     this.activatedRoute.parent.params.pipe(tap(
      result =>{
        this.clientId = result['id'];
      }
    )).subscribe()

    /**
     * initialise form
     */
    this.newOrderForm = new FormGroup({
      'address': new FormControl('',[ Validators.required ,Validators.minLength(10)]),
      'orderDetails': new FormArray([])
    })

    /**
     * get products
     */
    this.orderService.getProducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products)
      }
    )    
  }

  onSubmit() {
    if( this.newOrderForm.valid  ) {
      this.orderService.storeOrder(this.clientId ,this.newOrderForm.value)
    } else {
      console.log(this.newOrderForm.value)
    }
  }

  onReset() {
    this.newOrderForm.reset()
  }

  addProduct() {
    (<FormArray>this.newOrderForm.get('orderDetails')).push(
      new FormGroup({
        'productId': new FormControl('', Validators.required),
        'quantity': new FormControl('', Validators.required),
      })
    )
  }

  get controls() {
    //console.log((<FormArray>this.newOrderForm.get('orderDetails')).controls)
    return (<FormArray>this.newOrderForm.get('orderDetails')).controls;
  }

  deleteControl(index) {
    (<FormArray>this.newOrderForm.get('orderDetails')).controls.splice(index, 1)
  }
}
