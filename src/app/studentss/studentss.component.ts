import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service';
import { CursoXProfesor } from '../modules';
  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel,
  IonInput, IonIcon, IonCard, IonCardContent , IonSelectOption} from '@ionic/angular/standalone';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-studentss',
  templateUrl: './studentss.component.html',
  styleUrls: ['./studentss.component.scss'],
  standalone: true,
  imports: [IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel,
    IonInput, IonIcon, IonCard, IonCardContent, RouterLink, IonSelectOption]
})
export class StudentssComponent  implements OnInit {

  @Input() curso!: CursoXProfesor;


  cursos: CursoXProfesor[] = [];
  constructor( private router: Router,
    private  CarsServices: StudentsService ) { }

  ngOnInit() {}
  addCursos(cursos: CursoXProfesor): void {
    this.CarsServices.addCursoXProfesorToStudent(cursos)
      .then(() => {
        // Redirige al usuario a la página del carrito de compras
        this.addcurso();
      })
      .catch(error => {
        console.error('Error al agregar al carrito:', error);
      });
  }
  addcurso(): void {
    this.router.navigate(['/details']); // Ajusta '/add-car' con la ruta de tu página de carrito de compras
  }
}

