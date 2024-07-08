import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfessorService } from '../professor.service';
import { CourseService } from '../course.service';
import { CursoXProfesor } from '../modules';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AdminNavComponent]
})
export class ClasesPage implements OnInit {

  cursosXProfesores: any[] = [];
  nuevoCursoXProfesor: any = {};
  cursoXProfesorSeleccionado: any = null;

  constructor(private profesorService: ProfessorService) {}

  ngOnInit(): void {
    this.profesorService.getCollectionChanges<any>('cursosxprofesores').subscribe(cursosXProfesores => {
      this.cursosXProfesores = cursosXProfesores.filter(cursoXProfesor => !cursoXProfesor.deleted);
    });
  }

  eliminarCursoXProfesor(cursoXProfesorId: string): void {
    this.profesorService.eliminarCXP(cursoXProfesorId).catch(error => {
      console.error('Error al eliminar curso por profesor:', error);
    });
  }

  editarCursoXProfesor(cursoXProfesor: any): void {
    this.cursoXProfesorSeleccionado = { ...cursoXProfesor };  // Clonamos el objeto para evitar ediciones directas
  }

  actualizarCredencialesCursoXProfesor(): void {
    this.profesorService.actualizarCredencialesCXP(this.cursoXProfesorSeleccionado.id, this.cursoXProfesorSeleccionado).then(() => {
      this.cursoXProfesorSeleccionado = null;  // Limpiamos el formulario de actualización
    }).catch(error => {
      console.error('Error al actualizar credenciales del curso por profesor:', error);
    });
  }

  cancelarActualizacion(): void {
    this.cursoXProfesorSeleccionado = null;
  }
}