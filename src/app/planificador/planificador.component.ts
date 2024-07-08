import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { CursoXProfesor } from '../modules';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../course.service';
@Component({
  selector: 'app-planificador',
  templateUrl: './planificador.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./planificador.component.scss'],
  standalone: true,
})
export class PlanificadorComponent  implements OnInit {
  cursosXProfesores: CursoXProfesor[] = [];
  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']; 
  horas: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];// Ajusta según los días de tu semana
  constructor(private firestoreService: ProfessorService, private pdfService: CourseService) { }


    
  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<any>('cursosxprofesores').subscribe(cursosXProfesores => {
      this.cursosXProfesores = cursosXProfesores.filter(cursoXProfesor => !cursoXProfesor.deleted);
    });

    this.getCursosXProfesores();
  }

  getCursosXProfesores() {
    this.firestoreService.getCollectionChanges<any>('cursosxprofesores').subscribe(
      cursosXProfesores => {
        this.cursosXProfesores = cursosXProfesores.filter(cursosXProfesores => !cursosXProfesores.deleted);

      },
      error => {
        console.error('Error al obtener cursosxprofesores:', error);
      }
    );
  }
  getCursosPorHoraYDia(hora: string, dia: string): CursoXProfesor[] {
    return this.cursosXProfesores.filter(curso => curso.hora === hora && curso.dia === dia);
  }

  downloadPDF() {
    const element = document.getElementById('planificador');
    if (element) {
      this.pdfService.generatePDF(element);
    }
  }
}
