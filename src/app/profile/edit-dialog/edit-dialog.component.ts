import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

import { IUser } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  public newName = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(100)
  ]);

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public userService: UserService
  ) {}

  submit() {
    this.userService.editName(this.data.uid, this.newName.value);
    this.dialogRef.close();
    alert('Se ha cambiado el nombre');
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
