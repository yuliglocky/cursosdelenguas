import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CourseComponent  {
  curso: any = {
    nombre: '',
    idioma: '',
    nivel: '',
    hora: '',
    capacidad: '',
    estado: ''
  };
  horasOptions: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  estadoOptions: string[] = ['habilitado', 'deshabilitado'];
  niveles: string[] = ['nivel 1', 'nivel 2', 'nivel 3', 'nivel 4'];

  constructor(private firestoreService: CourseService) { }

  async crearCurso() {
    try {
      await this.firestoreService.crearCurso(this.curso);
      console.log('Curso creado correctamente');
      this.limpiarFormulario(); // Limpia el formulario después de crear el curso
    } catch (error) {
      console.error('Error al crear curso: ', error);
      // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    }
  }

  limpiarFormulario() {
    this.curso = {
      nombre: '',
      idioma: '',
      nivel: '',
      hora: '',
      capacidad: '',
      estado: ''
    };
  }
}