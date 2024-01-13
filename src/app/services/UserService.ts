import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  nom: string;
  cognom: string;
  email: string;
  dni: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSource = new BehaviorSubject<User[]>([]);
  users = this.usersSource.asObservable();

  constructor() { }

  addUser(user: User): void {
    const currentUsers = this.usersSource.getValue();
    this.usersSource.next([...currentUsers, user]);
    console.log("AAAA", user)
  }

  removeUser(dni: string): void {
    const currentUsers = this.usersSource.getValue();
    const updatedUsers = currentUsers.filter(user => user.dni !== dni);
    this.usersSource.next(updatedUsers);
  }

  getUserByDni(dni: string): User | undefined {
    const currentUsers = this.usersSource.getValue();
    return currentUsers.find(user => user.dni === dni);
  }

  
}
