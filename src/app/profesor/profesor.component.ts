import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class ProfesorComponent  implements OnInit {
  profesor: any = {
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    correo: ''

  };
  idiomasOptions = ['Inglés', 'Español', 'Francés', 'Alemán'];
  constructor(private professorService: ProfessorService) { }
  async crearProfesor() {
    try {
      await this.professorService.crearProfesor(this.profesor);
      console.log('Profesor creado correctamente');
      // Limpia el formulario o realiza otra acción después de crear el profesor
    } catch (error) {
      console.error('Error al crear profesor: ', error);
      // Manejo de errores
    }
  }
  ngOnInit() {}

}
