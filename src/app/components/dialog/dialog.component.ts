import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/general/User';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Output() newUser =new EventEmitter<User>();
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  userForm: FormGroup;
  edit:boolean = !!this.data;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'name': new FormControl(this.get('name') , Validators.required),
      'username': new FormControl(this.get('username') ,[
        Validators.required ,
        Validators.minLength(5)
      ]),
      'email': new FormControl(this.get('email') , [
        Validators.required ,
        Validators.email
      ]), 
    })
  }

  /** 
   * decides what will be placed inside the fields of the modal
   */
  get(property:string) {
    if(!!this.data && !!this.data.user[property]){
      return this.data.user[property]
    }
    return null
  }

  onSubmit() {
    if(this.userForm.valid){
     this.dialogRef.close({user : this.userForm.value , edit: this.edit})
    }
  }

  closeDialog() { //mund te kalosh te dhena si parameter
    this.dialogRef.close();
  }
}
