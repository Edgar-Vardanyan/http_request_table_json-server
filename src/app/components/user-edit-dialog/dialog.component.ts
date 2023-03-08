import { User } from '../../common/interfaces/user';
import { ApiService } from '../../common/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public userForm: FormGroup;
  public actionBtn = 'Save';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: User
  ) {}

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        suite: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipcode: ['', [Validators.required]],
        geo: this.fb.group({
          lat: ['', [Validators.required]],
          lng: ['', [Validators.required]],
        }),
      }),
      company: this.fb.group({
        name: ['', [Validators.required]],
        catchPhrase: ['', [Validators.required]],
        bs: ['', [Validators.required]],
      }),
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.userForm.patchValue(this.editData);
    }
  }

  public createUser(): void {
    if (!this.editData) {
      if (this.userForm.valid) {
        this.api.createUser(this.userForm.value).subscribe({
          next: (res: User) => {
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error adding the user');
          },
        });
      }
    } else {
      this.updateUser();
    }
  }

  public updateUser(): void {
    this.api.updateUser(this.userForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('error updating');
      },
    });
  }
}
