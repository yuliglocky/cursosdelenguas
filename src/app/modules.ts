export interface Profesor {
    id: string;
   nombre: string;
   apellido: string;
   telefono: string;
   correo: string;
   especialidad: string;
   especialidades: string;
   delete: boolean;
  }

  export interface Curso {
    id: string;
   capacidad: string;
   estado: string;
   hora: string;
   idioma: string;
   nivel: string;
   nombre: string;
   delete: boolean;
  }

  export interface CursoXProfesor {
    id: string;  // Puedes usar el ID del curso o una combinación de IDs
    profesorId: string;
    cursoId: string;
    profesorNombre?: string; // Propiedad para almacenar el nombre del profesor
    cursoNombre?: string;    // Propiedad para almacenar el nombre del curso
    hora?: string;           // Propiedad para almacenar la hora del curso
    nivel?: string;          // Propiedad para almacenar el nivel del curso
    dia: string;  
    deleted: boolean;  
    status: string; // Agregando la propiedad status
}

export interface StudentCourse {
    cursoId: string;
    profesorNombre: string;
    cursoNombre: string;
    dia: string;
    hora: string;
    nivel: string;
    status: 'aprobado' | 'en curso' | 'desaprobado';
  }

  
export interface User {
    id: string;
    name: string;
    last_name: string;
    location: string;
  }