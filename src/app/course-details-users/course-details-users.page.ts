import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { CursoXProfesor } from '../modules';
import { StudentsService } from '../students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
@Component({
  selector: 'app-course-details-users',
  templateUrl: './course-details-users.page.html',
  styleUrls: ['./course-details-users.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AdminNavComponent]
})
export class CourseDetailsUsersPage implements OnInit {
  cursos: CursoXProfesor[] = [];
  id: string = ''; // ID del usuario específico

  constructor(private route: ActivatedRoute, private professorService: StudentsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Obtener el ID de usuario desde los parámetros de la URL
      this.loadCursos(); // Cargar cursos del usuario al inicializar el componente
    });
  }
  loadCursos(): void {
    if (!this.id) {
      console.error('ID de usuario no definido.');
      return;
    }
  
    this.professorService.getStudentCourses1(this.id).subscribe(
      cursos => {
        this.cursos = cursos; // Asignar los cursos obtenidos al arreglo local
      },
      error => {
        console.error('Error al cargar cursos:', error);
      }
    );
  }
  actualizarEstado(cursoId: string, nuevoEstado: string): void {
    this.professorService.updateCourseStatus(this.id, cursoId, nuevoEstado)
      .then(() => {
        console.log('Estado del curso actualizado correctamente.');
        this.loadCursos(); // Actualizar la lista de cursos después de la actualización
      })
      .catch(error => {
        console.error('Error al actualizar el estado del curso:', error);
      });
  }
}

