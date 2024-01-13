import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  inputData: any;
  myform: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private fb: FormBuilder,
    private buildr: FormBuilder
  ) {
    this.myform = this.fb.group({
      nom: [''],
      cognoms: [''],
      email: [''],
      dni: ['']
    });
  }

  /* myform = this.buildr.group({
    nom: this.buildr.control(''),
    cognoms: this.buildr.control(''),
    email: this.buildr.control(''),
    dni: this.buildr.control(''),
  }); */

  closePopup() {
    this.ref.close('import { BrowserModule } from @angular/platform-browser;'); 
  }

  saveUser() {
    console.log( 'import { BrowserModule } from @angular/platform-browser;', this.myform.value)
  }

  ngInit(): void {
    this.inputData = this.data;
  }
}
