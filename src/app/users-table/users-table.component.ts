import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { UserService, User } from '../services/UserService';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class UsersTableComponent {
  userForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      cognom: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }

  public addItem(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      this.userForm.reset();
    }
    console.log()
  }

  reset() {
    this.userForm.reset();
  }

  removeItem(dni: string): void {
    this.userService.removeUser(dni);
  }

  onRowClicked(user: User): void {
    this.router.navigate(['/user-profile', user.dni]);
  }
  
  downloadAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    XLSX.writeFile(wb, 'UsersData.xlsx');
  }

  downloadAsPDF() {
    const DATA = document.getElementById('usersTable');
    if (DATA) {
      html2canvas(DATA as HTMLElement).then(canvas => {
        const fileWidth = 208;
        const fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('UsersData.pdf');
      });
    } else {
      console.error('Elemento de la tabla no encontrado');
    }
  }

  ngOnInit() {
    this.userService.users.subscribe(updatedUsers => {
      this.users = updatedUsers;
    });
  }
}
