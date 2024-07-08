import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Profesor } from '../modules';
import { ProfessorService } from '../professor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanificadorComponent } from '../planificador/planificador.component';
import { SolicitudComponent } from '../solicitud/solicitud.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, SolicitudComponent, PlanificadorComponent],
})
export class HomePage {
profesor : Profesor[] = [];
  constructor(private firestoreService: ProfessorService) {}

}
