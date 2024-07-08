import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StudentsService } from '../students.service';
import { CursoXProfesor } from '../modules';
import { SolicitudComponent } from '../solicitud/solicitud.component';
import { PlanificadorComponent } from '../planificador/planificador.component';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SolicitudComponent, PlanificadorComponent]
})
export class DetailsPage implements OnInit {
  cursos: CursoXProfesor[] = [];
userId: string = ''
  constructor(private professorService: StudentsService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.professorService.getStudentCourses().subscribe((cursos) => {
      this.cursos = cursos;
    });
  }



  // Método para filtrar cursos eliminados y mostrar solo los activos
  getCursosActivos(): CursoXProfesor[] {
    return this.cursos.filter(curso => !curso.deleted);
  }
}


