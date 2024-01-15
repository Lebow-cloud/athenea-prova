import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import usersData from '../resources/users.json'

export interface User {
  name: string;
  surname: string;
  email: string;
  id: string;
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
  }

  removeUser(id: string): void {
    const currentUsers = this.usersSource.getValue();
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersSource.next(updatedUsers);
  }

  getUserByid(id: string): User | undefined {
    const currentUsers = this.usersSource.getValue();
    return currentUsers.find(user => user.id === id);
  }

  initialUsers(): void {
    const currentUsers = this.usersSource.getValue();
    const combinedUsers = [...currentUsers];
  
    usersData.forEach((jsonUser) => {
      if (!combinedUsers.some(user => user.id === jsonUser.id)) {
        combinedUsers.push(jsonUser);
      }
    });
  
    this.usersSource.next(combinedUsers);
  }

  importUsers(usersData: User[]) {
    const currentUsers = this.usersSource.getValue();
    const combinedUsers = [...currentUsers];

    usersData.forEach((jsonUser) => {
      if (!combinedUsers.some(user => user.id === jsonUser.id)) {
        combinedUsers.push(jsonUser);
      }
    });

    this.usersSource.next(combinedUsers);
  }
}
