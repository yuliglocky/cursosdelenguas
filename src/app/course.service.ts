
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, getDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Curso, CursoXProfesor, Profesor } from './modules';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private firestore: Firestore) {}


  async crearCursoXProfesor(cursoXProfesor: CursoXProfesor): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'cursosxprofesores'), cursoXProfesor);
      console.log('Relación cursosxprofesores creada con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al crear relación cursosxprofesores: ', error);
      throw error;
    }
  }

  

  public generatePDF(element: HTMLElement): void {
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('planificador-semanal.pdf');
    });
  }

  // Método para crear un curso
  async crearCurso(curso: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'cursos'), curso);
      console.log('Curso creado con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al crear curso: ', error);
      throw error;
    }
  }


   // Método para eliminar un profesor (Eliminación lógica)
   async eliminarCursos(cursosid: string): Promise<void> {
    try {
      const profesorRef = doc(this.firestore, `cursos/${cursosid}`);
      await updateDoc(profesorRef, { deleted: true });
      console.log('Profesor marcado como eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar profesor: ', error);
      throw error;
    }
  }

  

  // Método para actualizar las credenciales de un profesor
  async actualizarCredenciales(cursosid: string, credenciales: any): Promise<void> {
    try {
      const profesorRef = doc(this.firestore, `cursos/${cursosid}`);
      await updateDoc(profesorRef, credenciales);
      console.log('Credenciales actualizadas con éxito');
    } catch (error) {
      console.error('Error al actualizar credenciales del profesor: ', error);
      throw error;
    }
  }

}
