import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import usersData from '../assets/users.json'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers(): User[] {
    return usersData.map(user => new User(user.name, user.surname, user.email, user.id));
  }
}
