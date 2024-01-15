import { Component } from '@angular/core';
import { UserService } from '../services/UserService';

@Component({
  standalone: true,
  selector: 'app-user-upload',
  templateUrl: './user-json-upload.component.html'
})
export class UserUploadComponent {
  constructor(private userService: UserService) {}
  fileName = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.fileName = file.name
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");

      fileReader.onload = () => {
        const usersData = JSON.parse(fileReader.result as string);
        this.userService.importUsers(usersData);
      };

      fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
    this.fileName = ''
  }
}
