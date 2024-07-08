import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfessorService } from '../professor.service';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AdminNavComponent]
})
export class ProfesoresPage implements OnInit {
  profesores: any[] = [];
  nuevoProfesor: any = {};
  profesorSeleccionado: any = null;

  constructor(private profesorService: ProfessorService) {}

  ngOnInit(): void {
    this.profesorService.getCollectionChanges<any>('profesor').subscribe(profesores => {
      this.profesores = profesores.filter(profesor => !profesor.deleted);
    });
  }

  crearProfesor(): void {
    this.profesorService.crearProfesor(this.nuevoProfesor).then(() => {
      this.nuevoProfesor = {};  // Reseteamos el formulario
    }).catch(error => {
      console.error('Error al crear profesor:', error);
    });
  }

  eliminarProfesor(profesorId: string): void {
    this.profesorService.eliminarProfesor(profesorId).catch(error => {
      console.error('Error al eliminar profesor:', error);
    });
  }

  editarProfesor(profesor: any): void {
    this.profesorSeleccionado = { ...profesor };  // Clonamos el objeto para evitar ediciones directas
  }

  actualizarCredencialesProfesor(): void {
    this.profesorService.actualizarCredencialesProfesor(this.profesorSeleccionado.id, this.profesorSeleccionado).then(() => {
      this.profesorSeleccionado = null;  // Limpiamos el formulario de actualización
    }).catch(error => {
      console.error('Error al actualizar credenciales del profesor:', error);
    });
  }


  cancelarActualizacion(): void {
    this.profesorSeleccionado = null;
  }
}
