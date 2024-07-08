import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfessorService } from '../professor.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CursosPage implements OnInit {
  cursos: any[] = [];
  nuevoCurso: any = {};
  cursosSelect: any = null;

  constructor(private profesorService: ProfessorService, private cursosService: CourseService) {}


  ngOnInit(): void {
    this.profesorService.getCollectionChanges<any>('cursos').subscribe(cursos => {
      this.cursos = cursos.filter(cursos => !cursos.deleted);
    });
  }



  eliminarCursos(cursosid: string): void {
    this.cursosService.eliminarCursos(cursosid).catch(error => {
      console.error('Error al eliminar profesor:', error);
    });
  }

  editarCurso(curso: any): void {
    this.cursosSelect = { ...curso };  // Clonamos el objeto para evitar ediciones directas
  }

  actualizarCredenciales(): void {
    this.cursosService.actualizarCredenciales(this.cursosSelect.id, this.cursosSelect).then(() => {
      this.cursosSelect = null;  // Limpiamos el formulario de actualización
    }).catch(error => {
      console.error('Error al actualizar credenciales del profesor:', error);
    });
  }


  cancelarActualizacion(): void {
    this.cursosSelect = null;
  }
}

