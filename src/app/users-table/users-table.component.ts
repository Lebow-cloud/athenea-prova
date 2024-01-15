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
import { UserUploadComponent } from '../user-json-upload/user-json-upload.component';

type UserKeys = keyof User;

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  imports: [ReactiveFormsModule, MatDialogModule, UserUploadComponent],
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
      this.filteredUsers = this.users.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
  }

  onRowClicked(user: User): void {
    this.router.navigate(['/user-profile', user.id]);
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
    if (!this.users || this.users.length === 0) {
      console.error('No hay datos para exportar');
      return;
    }
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
  
    ws['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 10 }];
  
    if (ws['!ref']) {
      const range = XLSX.utils.decode_range(ws['!ref']);
  
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const headerCellAddress = XLSX.utils.encode_col(C) + "1";
        if (!ws[headerCellAddress]) continue;
        ws[headerCellAddress].s = {
          font: {
            name: 'Arial',
            sz: 14,
            bold: true,
            color: { rgb: "FFFFFF" }
          },
          fill: {
            fgColor: { rgb: "4472C4" }
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          },
          border: {
            top: { style: "thin", color: { rgb: "FFFFFF" } },
            bottom: { style: "thin", color: { rgb: "FFFFFF" } },
            left: { style: "thin", color: { rgb: "FFFFFF" } },
            right: { style: "thin", color: { rgb: "FFFFFF" } }
          }
        };
      }
  
    } else {
      console.warn('No se pudo obtener el rango de la hoja de cálculo.');
    }
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'UsersData.xlsx');
  }
  

  downloadAsPDF() {
    const data = document.getElementById('usersTable');
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imageWidth = canvas.width * 0.264583;
        const imageHeight = canvas.height * 0.264583;
        const margin = 10;
        const xPos = (pageWidth - imageWidth) / 2;
        const yPos = margin;

        pdf.addImage(imgData, 'PNG', xPos, yPos, imageWidth, imageHeight);

        pdf.save('UsersData.pdf');
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
