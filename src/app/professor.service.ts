
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData, 
  collection,
  doc, 
  docData, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  DocumentReference, 
  query, 
  where,getFirestore,addDoc
  
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  constructor(private firestore: Firestore) {}

  getCollectionChanges<tipo>(path: string) {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection,  { idField: 'id' }) as Observable<tipo[]>;
  }

  // Método para crear un curso
  async crearProfesor(profesor: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'profesor'), profesor);
      console.log('Curso creado con ID: ', docRef.id);
    } catch (error) {
      console.error('Error al crear profesor: ', error);
      throw error;
    }
  }


   // Método para eliminar un profesor (Eliminación lógica)
   async eliminarProfesor(profesorId: string): Promise<void> {
    try {
      const profesorRef = doc(this.firestore, `profesor/${profesorId}`);
      await updateDoc(profesorRef, { deleted: true });
      console.log('Profesor marcado como eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar profesor: ', error);
      throw error;
    }
  }



  // Método para actualizar las credenciales de un profesor
  async actualizarCredencialesProfesor(profesorId: string, credenciales: any): Promise<void> {
    try {
      const profesorRef = doc(this.firestore, `profesor/${profesorId}`);
      await updateDoc(profesorRef, credenciales);
      console.log('Credenciales actualizadas con éxito');
    } catch (error) {
      console.error('Error al actualizar credenciales del profesor: ', error);
      throw error;
    }
  }


  
   // Método para eliminar un profesor (Eliminación lógica)
   async eliminarCXP(cursosxprofesoresId: string): Promise<void> {
    try {
      const profesorRef = doc(this.firestore, `cursosxprofesores/${cursosxprofesoresId}`);
      await updateDoc(profesorRef, { deleted: true });
      console.log('Profesor marcado como eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar profesor: ', error);
      throw error;
    }
  }



    // Método para actualizar las credenciales de un profesor
    async actualizarCredencialesCXP(cursosxprofesoresId:  string, credenciales: any): Promise<void> {
      try {
        const profesorRef = doc(this.firestore, `cursosxprofesores/${cursosxprofesoresId}`);
        await updateDoc(profesorRef, credenciales);
        console.log('Credenciales actualizadas con éxito');
      } catch (error) {
        console.error('Error al actualizar credenciales del profesor: ', error);
        throw error;
      }
    }
}