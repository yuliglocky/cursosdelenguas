import { Injectable, inject } from '@angular/core';
import { getAuth  } from 'firebase/auth';
import {
  Firestore,
  collectionData, collection,
  doc, docData, getDoc, setDoc, updateDoc, deleteDoc,
  DocumentReference, query, where, addDoc
  
} from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { CursoXProfesor, StudentCourse, User } from './modules';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor( private firestore: Firestore) {
  
  }

  getCollectionChanges<T>(path: string): Observable<T[]> {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection, { idField: 'id' }) as Observable<T[]>;
  }

  async addCursoXProfesorToStudent(cursoXProfesor: CursoXProfesor): Promise<void> {
    const auth = getAuth();
    if (auth.currentUser) {
      const studentCoursesCollectionRef = collection(this.firestore, `users/${auth.currentUser.uid}/cursosXProfesor`);
      await addDoc(studentCoursesCollectionRef, cursoXProfesor);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  getStudentCourses(): Observable<CursoXProfesor[]> {
    const auth = getAuth();
    if (auth.currentUser) {
      const studentCoursesCollectionRef = collection(this.firestore, `users/${auth.currentUser.uid}/cursosXProfesor`);
      return collectionData(studentCoursesCollectionRef, { idField: 'id' }) as Observable<CursoXProfesor[]>;
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  
  getStudentCourses1(id: string): Observable<CursoXProfesor[]> {
    const userCoursesCollection = collection(this.firestore, `users/${id}/cursosXProfesor`);
    return collectionData(userCoursesCollection, { idField: 'id' }) as Observable<CursoXProfesor[]>;
  }


  async updateCourseStatus(userId: string, courseId: string, status: string): Promise<void> {
    const courseDocRef = doc(this.firestore, `users/${userId}/cursosXProfesor/${courseId}`);

    try {
      await updateDoc(courseDocRef, { status: status });
      console.log('Estado del curso actualizado correctamente.');
    } catch (error) {
      console.error('Error updating course status:', error);
      throw error;
    }
  }


  getAllUsers(): Observable<User[]> {
    const usersCollectionRef = collection(this.firestore, 'users');
    return collectionData(usersCollectionRef, { idField: 'id' }) as Observable<User[]>;
  }

}