import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent],
  template: `<app-user-list></app-user-list>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'athenea-prova';
}
