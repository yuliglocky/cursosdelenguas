import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel,
  IonInput, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
  import { getFirestore, Firestore, setDoc, doc} from '@angular/fire/firestore'; // Importa Firestore
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {  createUserWithEmailAndPassword, Auth } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel,
    IonInput, IonIcon, IonCard, IonCardContent, RouterLink]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  cardColor = '#191b1a';
  name: string = '';
  last_name: string = '';
  location: string = ''; 
  confirmPassword: string = '';
  isBoxShadowActive: boolean = false;
  constructor(private router: Router, private firestore: Firestore) {}

 

  validatePassword(password: string): boolean {
    const passwordPattern = /^[A-Za-z0-9!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]*$/;
    return passwordPattern.test(password);
  }

  clearForm() {
    this.email = '';
    this.password = '';
  }


  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (!this.validatePassword(this.password)) {
      this.errorMessage = 'Contraseña no válida. Asegúrate de usar solo números, mayúsculas, minúsculas y algunos caracteres especiales (!@#$%^&*).';
      return;
    }
    try {
      const auth: Auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid  
      // Guardar datos adicionales en Firestore
      await this.saveUserData(userId, this.name, this.last_name, this.location)
      this.router.navigate(['/auth']);
      this.errorMessage = 'Usuario Creado';
    } catch (error: any) {
      console.error('Error al registrar:', error);
      this.errorMessage = error.message || 'Error al registrar.';
    }
  }

  private async saveUserData(userId: string, name: string, last_name: string, location: string ): Promise<void> {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { name, last_name, location });
  }


 
  ngOnInit() {
    // Puedes realizar inicializaciones adicionales aquí si es necesario
  }
}