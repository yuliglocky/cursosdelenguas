import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { User } from '../modules';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
@Component({
  selector: 'app-users-course',
  templateUrl: './users-course.page.html',
  styleUrls: ['./users-course.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,AdminNavComponent]
})
export class UsersCoursePage implements OnInit {
  users: User[] = [];

  constructor(private professorService: StudentsService, private router: Router) {}

  ngOnInit(): void {
    this.professorService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  viewUserCourses(id: string): void {
    if (id) {
      this.router.navigateByUrl(`/course-details-users/${id}`);
    } else {
      console.error('El ID del usuario no está definido');
    }
  }
}
