import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../services/UserService';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  user: User | undefined

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  backHome(){
    this.router.navigate(['', ])
  }

  ngOnInit(): void {
    const dni = this.route.snapshot.paramMap.get('dni');
    if (dni) {
      this.user = this.userService.getUserByDni(dni);
    }
  }
}
