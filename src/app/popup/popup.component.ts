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
import { UserService } from '../services/UserService';

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
    private service: UserService
  ) {
    this.myform = this.fb.group({
      nom: ['', Validators.required],
      cognom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
    });
  }

  closePopup() {
    this.ref.close();
  }

  saveUser() {
    this.service.addUser(this.myform.value);
    this.closePopup();
  }

  ngInit(): void {
    this.inputData = this.data;
  }
}
