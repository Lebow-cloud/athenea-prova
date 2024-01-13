import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface User {
  nom: string;
  cognom: string;
  email: string;
  dni: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class UsersTableComponent {
  userForm: FormGroup;
  listData: User[] = [];

  constructor(private fb: FormBuilder) {
    this.listData = [];
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      cognom: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  public addItem(): void {
    if (this.userForm.valid) {
      this.listData.push(this.userForm.value);
      this.userForm.reset();
    }
  }

  reset() {
    this.userForm.reset();
  }

  removeItem(element: User) {
    this.listData.forEach((value, index) => {
      if (value === element) this.listData.splice(index, 1);
    });
  }

  ngOnInit() {}
}
