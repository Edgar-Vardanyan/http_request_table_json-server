import { User } from './common/interfaces/user';
import { ApiService } from './common/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/user-edit-dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'phone',
    'website',
    'street',
    'suite',
    'city',
    'zipcode',
    'lat',
    'lng',
    'Company name',
    'catchPhrase',
    'bs',
    'action',
  ];
  public dataSource: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  public ngOnInit(): void {
    this.getAllUsers();
  }

  public openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllUsers();
        }
      });
  }

  private getAllUsers(): void {
    this.api.getUser().subscribe({
      next: (res: User[]) => {
        this.dataSource = new MatTableDataSource<any>(res);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  public editUser(row: User): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllUsers();
        }
      });
  }

  public removeUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Are you sure?',
        message: 'You are about to delete user ',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.api.removeUser(id).subscribe({
          next: (res: User) => {
            this.getAllUsers();
          },
          error: (err) => {
            alert(err);
          },
        });
      } else {
        return;
      }
    });
  }
}
