import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public auth: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public async signIn() {
    const { email, password } = this.loginForm.value;
    const response = await this.auth.signInWIthEmailAndPassword(
      email,
      password
    );

    const msg =
      response === 'auth/user-not-found'
        ? 'Usuario no existe, es necesario crear una cuenta'
        : response === 'auth/wrong-password'
        ? 'Password incorrecto'
        : '';

    if (msg) {
      this.openDialog(msg);
      this.loginForm.get('password').reset();
    }
  }

  public openDialog(msg: string) {
    this.dialog.open(DialogComponent, {
      width: '250px',
      data: msg
    });
  }

  public getEmailError() {
    return this.loginForm.get('email').hasError('required')
      ? 'Debes ingresar un email'
      : 'Email no válido';
  }

  public getPasswordError() {
    return (
      this.loginForm.get('password').hasError('required') &&
      'Debes ingresar un password'
    );
  }
}
