import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { CourseComponent } from '../course/course.component';
import { ProfesorComponent } from '../profesor/profesor.component';
import { ListComponent } from '../list/list.component';
import { Router } from '@angular/router';
import { PlanificadorComponent } from '../planificador/planificador.component';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader,
     IonTitle, IonToolbar, CommonModule, FormsModule, CourseComponent, ProfesorComponent, ListComponent,IonButton,PlanificadorComponent, AdminNavComponent]
})
export class AdminPage implements OnInit {
  isBoxShadowActive: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
  }
  changeBoxShadow() {
    this.isBoxShadowActive = !this.isBoxShadowActive;
    // Aquí puedes agregar la lógica para redirigir a otra página usando el Router
    this.router.navigateByUrl('/profesores');
  }
}
