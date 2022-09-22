import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/general/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Output() newUser = new EventEmitter<User>();
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
  ) { }

  userForm: FormGroup;
  edit: boolean = !!this.data;
  nameError = 'Name field is required';
  usernameError = 'Username should be longer than 6 charachters';
  emailError = 'Enter a valid email address';
  passwordError = "Password field is required";
  
  hide = true; //password field
  submitted = false; //add user form

  backendErrors:string[]=[];

  showErrors(control) {
    return !this.userForm.get(control).valid && this.userForm.get(control).touched;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'name': new FormControl(this.get('name'), Validators.required),
      'username': new FormControl(this.get('username'), [
        Validators.required,
        //Validators.minLength(5)
      ]),
      'email': new FormControl(this.get('email'), [
        Validators.required,
        //Validators.email
      ]),
    })
    if (!this.edit) {
      this.userForm.addControl('password', new FormControl('', Validators.required));
    }
  }
  /** 
   * decides what will be placed inside the fields of the modal
   */
  get(property: string) {
    if (!!this.data && !!this.data.user[property]) {
      return this.data.user[property]
    }
    return null
  }

  onSubmit() {
    this.backendErrors = [];
    if (this.userForm.valid) {
      if (!this.edit) {
        this.userService.storeUser(this.userForm.value).subscribe({
          next: result => {
            this.userService.fetchUsers(1, 5).subscribe(
              result => {
                this.userService.usersChanged.next(result.users)
                this.userService.paramsChanged.next({
                  'pageNo': result.pageNo,
                  'pageSize': result.pageSize,
                  'totalElements': result.totalElements,
                  'totalPages': result.totalPages
                })
              }
            )
          },
          error: error=>{
            console.log(error.error.errors)
            const errorObj = error.error.errors;
            for (const property in errorObj) {
              console.log(errorObj[property])
              this.backendErrors.push(errorObj[property])
            }
          },
          complete: () =>{
            this.dialogRef.close();
          }
      })
      } else {
        this.userService.updateUser(this.data.user.id  ,this.userForm.value ).subscribe({
          next: result => {
            this.userService.fetchUsers(this.userService.paramsChanged.value.pageNo , this.userService.paramsChanged.value.pageSize).subscribe(
              result => {
                this.userService.usersChanged.next(result.users)
                this.userService.paramsChanged.next({
                  'pageNo': result.pageNo,
                  'pageSize': result.pageSize,
                  'totalElements': result.totalElements,
                  'totalPages': result.totalPages
                })
              }
            )
          },
          error: error=>{
            console.log(error.error.errors)
            const errorObj = error.error.errors;
            for (const property in errorObj) {
              this.backendErrors.push(errorObj[property])
            }
          },
          complete: () =>{
            this.dialogRef.close();
          }
        }
          // result => {
          //   this.userService.fetchUsers(1, 5).subscribe(
          //     result => {
          //       this.userService.usersChanged.next(result.users)
          //       this.userService.paramsChanged.next({
          //         'pageNo': result.pageNo,
          //         'pageSize': result.pageSize,
          //         'totalElements': result.totalElements,
          //         'totalPages': result.totalPages
          //       })
          //     }
          //   )
          // }
        )
      }
      //this.dialogRef.close({ user: this.userForm.value, edit: this.edit })
    } else {
      this.submitted = true
    }
    //this.dialogRef.close();
  }

  closeDialog() { //mund te kalosh te dhena si parameter
    this.dialogRef.close();
  }
}
