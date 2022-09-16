import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { User } from 'src/app/general/User';
import { UsersService } from 'src/app/services/users.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( private userService:UsersService, private elRef:ElementRef, private dialog: MatDialog ) { }

  @ViewChild('searchTable') searchParam: ElementRef

  updating = false;
  users:User[];
  page = 0;
  pageCount = 10;
  start = 0;
  end;
  keyWord = '';
  total;

  ngOnInit(): void {
    this.userService.fetchUsers()
    .pipe( map( result =>{
      return result.content.map(user =>{
        return new User(
          user.id , 
          user.name ,
          user.username,
          user.email,
          user.roles[0].name,
          new Date(
            user.createdAt[0],
            user.createdAt[1],
            user.createdAt[2],
            user.createdAt[3],
            user.createdAt[4],
            user.createdAt[5]
            ),
          new Date(  
            user.createdAt[0],
            user.createdAt[1],
            user.createdAt[2],
            user.createdAt[3],
            user.createdAt[4],
            user.createdAt[5]
            )
          )
      })
    })
    )
    .subscribe(
       (result) => {
        console.log(result)
        this.users = result        
      }
    )
  }

  /**
   * Table functions
   */
  nextPage() {
    let pages = 0;
    if (this.total % this.pageCount == 0) {
      pages = this.total / this.pageCount - 1;
    } else {
      pages = Math.floor(this.total / this.pageCount);
    }
    if (this.page < pages) {
      console.log(Math.floor(this.total / this.pageCount))
      this.page++;
    }
  }

  prevPage() {
    if (this.page != 0) {
      this.page--;
    }
  }

  search() {
    this.keyWord = this.searchParam.nativeElement.value;
    this.page = 0;
  }

  // fetchUsers() {
  //   const data = {
  //     page: this.page,
  //     count: this.pageCount,
  //     keyWord: this.keyWord
  //   }
  //   this.http.get<any>('http://localhost:8080/api/users', { params: data }
  //   ).subscribe(resData => {
  //       this.users = resData.users;
  //       this.total = resData.total;
  //       this.calculateLimits();
  //     })
  // }

  calculateLimits() {
    this.start = this.page * this.pageCount;
    this.end = this.total < this.page * this.pageCount + this.pageCount ? this.total : this.page * this.pageCount + this.pageCount;
  }


  /**
   * Modal functions
   */
   openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
   });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
      console.log(result)
    });
  }
  
  openEditDialog(index:number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: { user: this.users[index] }
   });

   /**
    * store or edit user
    */
    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined) {
        if(result.edit) {

        } else {
          this.userService.storeUser(result.user)
        }
      }
    });
  }

}
