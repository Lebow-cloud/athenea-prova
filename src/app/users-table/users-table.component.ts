import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { UserService, User } from '../services/UserService';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';

type UserKeys = keyof User

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  imports: [ReactiveFormsModule, MatDialogModule],
  standalone: true,
})
export class UsersTableComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  currentSortColumn: string = '';
sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openPopup() {
    var _popup = this.dialog.open(PopupComponent, {
      width: '400px',
      height: '500px',
      data: {
        title: 'Afegir Usuari (+)',
      },
    });

    _popup.afterClosed().subscribe((item) => {
      console.log(item);
    });
  }

  removeItem(dni: string): void {
    this.userService.removeUser(dni);
  }

  loadInitialUsers(): void {
    this.userService.initialUsers();
  }
  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.filterUsers();
  }
  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => 
        Object.values(user).some(value => 
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
  }

  onRowClicked(user: User): void {
    this.router.navigate(['/user-profile', user.dni]);
  }

  sortUsersBy(field: UserKeys): void {
    if (this.currentSortColumn === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = field;
      this.sortDirection = 'asc';
    }
  
    this.filteredUsers.sort((a, b) => {
      if (a[field] < b[field]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
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
      html2canvas(DATA as HTMLElement).then((canvas) => {
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
    this.userService.users.subscribe((updatedUsers) => {
      this.users = updatedUsers;
      this.filteredUsers = updatedUsers;
    });
  }
}
