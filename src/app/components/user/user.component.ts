import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/general/User';
import { UsersService } from 'src/app/services/users.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UsersService, private elRef: ElementRef, private dialog: MatDialog) { }

  @ViewChild('searchTable') searchParam: ElementRef

  users: User[];
  page = 0;
  pageCount = 5;
  start = 0;
  end;
  keyWord = '';
  total;

  ngOnInit(): void {
    this.userService.fetchUsers(this.page , this.pageCount)
      .subscribe(
        result => {
          this.dataFetch(result)
        }
      );
    this.userService.usersChanged.subscribe(
      users => {
        this.users = users
      }
    )
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userService.storeUser(result.user).subscribe(() => {
        this.userService.fetchUsers(this.page , this.pageCount).subscribe(
          result => {
            this.dataFetch(result)
          }
        )
      });
    })
  }


  openEditDialog(index: number , id:number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: { user: this.users[index] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result)
        this.userService.updateUser(id , result.user).subscribe(
          (result) => {
            this.userService.fetchUsers(this.page , this.pageCount).subscribe(result=>{
              this.dataFetch(result)
            })
          }
        )
      }
    });
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
    this.userService.fetchUsers(this.page , this.pageCount).subscribe(
      result => {
        this.dataFetch(result)
      }
    );
  } 
  prevPage() {
    if (this.page != 0) {
      this.page--;
    }
    this.userService.fetchUsers(this.page , this.pageCount).subscribe(
      result => {
        this.dataFetch(result)
      }
    );
  }

  search() {
    this.keyWord = this.searchParam.nativeElement.value;
    console.log(this.keyWord);
  }

  dataFetch(result) {
    this.userService.usersChanged.next(result.users);
    this.total = result.totalElements;
    this.page = result.pageNo;
    this.pageCount = result.pageSize;
    this.start = result.pageNo * result.pageSize;
    this.end = this.total < this.page * this.pageCount + this.pageCount ? this.total : this.page * this.pageCount + this.pageCount;
  }
}
