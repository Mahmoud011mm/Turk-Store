import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import { EcommerceStor } from '../../ecommerce-store';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { SignUpDialog } from '../../components/sign-up-dialog/sign-up-dialog';
import { SignInDialog } from '../../components/sign-in-dialog/sign-in-dialog';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge, MatMenu, MatMenuItem, MatMenuTrigger,MatDivider],
  templateUrl: './header-actions.html',
  styleUrl: './header-actions.css',
})
export class HeaderActions {
  store = inject(EcommerceStor);
  matDialog = inject(MatDialog)

  openSignInDialog(){
    this.matDialog.open(SignInDialog,{
      disableClose: true
    })
  }
  openSignUpDialog() {
     this.matDialog.open(SignUpDialog,{
      disableClose: true
    })
  }
}
