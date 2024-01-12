import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import usersData from '../resources/users.json'; 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  getUsers(): User[] {
    return usersData.map(user => new User(user.name, user.surname, user.email, user.id));
  }

  ngOnInit() {
    this.users = usersData as User[];
  }
}
