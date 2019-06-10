import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '@core/auth/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/dialog/dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public async signUp() {
    const { email, password, name } = this.signUpForm.value;
    const msg = await this.auth.signUpWithEmailAndPassword(
      email,
      password,
      name
    );

    if (msg) {
      const dialog = this.dialog.open(DialogComponent, {
        width: '250px',
        data: msg
      });

      dialog
        .afterClosed()
        .toPromise()
        .then(() => this.router.navigate(['/login']));
    }
  }

  public getNameError() {
    return this.signUpForm.get('name').hasError('required') ||
      this.signUpForm.get('name').hasError('minLength')
      ? 'Ingresa tu nombre'
      : 'Tu nombre de demasiado largo (Max: 50 caracteres)';
  }

  public getEmailError() {
    return this.signUpForm.get('email').hasError('required')
      ? 'Debes ingresar un email'
      : 'Email no válido';
  }

  public getPasswordError() {
    return (
      this.signUpForm.get('password').hasError('required') &&
      'Debes ingresar un password'
    );
  }
}
