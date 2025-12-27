import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatFormField, MatSuffix, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { EcommerceStor } from '../../ecommerce-store';
import { signInParams } from '../../models/user';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatPrefix,
    MatSuffix,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.css',
})
export class SignInDialog {
  store = inject(EcommerceStor);
  fb = inject(NonNullableFormBuilder);
  passwordVisible = signal(false);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);

  signInForm = this.fb.group({
    email: ['medo@gmail.com', Validators.required],
    password: ['test123', Validators.required],
  });
  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({
      email,
      password,
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id,
    } as signInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close()
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
  }
}
