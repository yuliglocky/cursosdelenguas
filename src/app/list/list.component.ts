import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Curso, CursoXProfesor } from '../modules';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonLabel,
  IonButton, 
  IonInput, 
  IonIcon,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption } from '@ionic/angular/standalone';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [CommonModule, FormsModule, IonSelect, IonButton],
  standalone: true,
})
export class ListComponent  implements OnInit {
  cursosXProfesores: CursoXProfesor[] = [];
  profesor: any[] = [];
  cursos: any[] = [];
  profesorSeleccionado: any;   // Variable para almacenar el profesor seleccionado
  cursoSeleccionado: any;
  diaSeleccionado: string = '';     
  Dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  status: string = 'En curso';
  // Variable para almacenar el curso seleccionado
  constructor(private firestoreService: ProfessorService, private services: CourseService, private router: Router) { }

  ngOnInit() {
    this.firestoreService.getCollectionChanges<any>('cursosxprofesores').subscribe(cursosXProfesores => {
      this.cursosXProfesores = cursosXProfesores.filter(cursoXProfesor => !cursoXProfesor.deleted);
    });
    this.firestoreService.getCollectionChanges<any>('cursos').subscribe(cursos => {
      this.cursos = cursos.filter(cursos => !cursos.deleted);
    });
    this.firestoreService.getCollectionChanges<any>('profesor').subscribe(profesores => {
      this.profesor = profesores.filter(profesor => !profesor.deleted);
    });

    this.getProfesoresYCursos();
   this.getCursosXProfesores();
  }

    crearCursoXProfesor() {
      if (this.profesorSeleccionado && this.cursoSeleccionado) {
        // Verificar si el profesor seleccionado está marcado como eliminado
        if (this.profesorSeleccionado.delete) {
          console.error('No puedes seleccionar un profesor marcado como eliminado.');
          return;
        }
  
        const profesorNombre = this.profesorSeleccionado.nombre;
        const cursoNombre = this.cursoSeleccionado.nombre;
        const cursoHora = this.cursoSeleccionado.hora;
        const cursoNivel = this.cursoSeleccionado.nivel;
  
        const cursoXProfesor: CursoXProfesor = {
          id: '',
          profesorId: this.profesorSeleccionado.id,
          cursoId: this.cursoSeleccionado.id,
          profesorNombre,
          cursoNombre,
          hora: cursoHora,
          nivel: cursoNivel,
          dia: this.diaSeleccionado,
          deleted: false,
          status: this.status
        };

      // Llamar a la función para crear en Firebase
      this.services.crearCursoXProfesor(cursoXProfesor).then(() => {
        console.log('Relación cursoxprofesor creada correctamente.');
        // Agregar la relación creada a la lista local
        this.cursosXProfesores.push(cursoXProfesor);
      }).catch(error => {
        console.error('Error al crear relación cursoxprofesor:', error);
      });
    } else {
      console.error('Debes seleccionar un profesor y un curso.');
    }
  }
  
  getCursosPorDia(dia: string): any[] {
    return this.cursosXProfesores.filter(curso => curso.dia === dia);
  }

  getCursosXProfesores() {
    this.firestoreService.getCollectionChanges<any>('cursosxprofesores').subscribe(
      cursosXProfesores => {
        this.cursosXProfesores = cursosXProfesores;
      },
      error => {
        console.error('Error al obtener cursosxprofesores:', error);
      }
    );
  }
  getProfesoresYCursos() {
    // Obtener cursos
    this.firestoreService.getCollectionChanges<any>('cursos').subscribe(
      cursos => {
        this.cursos = cursos.filter(curso => !curso.deleted);
      },
      error => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }
  isBoxShadowActive: boolean = false;
  changeBoxShadow() {
    this.isBoxShadowActive = !this.isBoxShadowActive;
    // Aquí puedes agregar la lógica para redirigir a otra página usando el Router
    this.router.navigateByUrl('/profesores');
  }

  changeBoxShadow1() {
    this.isBoxShadowActive = !this.isBoxShadowActive;
    // Aquí puedes agregar la lógica para redirigir a otra página usando el Router
    this.router.navigateByUrl('/clases');
  }

  
  changeBoxShadow2() {
    this.isBoxShadowActive = !this.isBoxShadowActive;
    // Aquí puedes agregar la lógica para redirigir a otra página usando el Router
    this.router.navigateByUrl('/users-course');
  }

}

