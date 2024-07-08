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
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonInput, IonIcon, IonCard, IonCardContent,  IonButton, IonItem, IonLabel, RouterLink]
})
export class AuthPage implements OnInit {
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
  async login() {
    try {
      if (this.validatePassword(this.password)) {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);

        // Obtener el usuario actual
        const user = userCredential.user;

        // Verificar el correo electrónico para redirigir
        if (user.email === 'yuli123@gmail.com') {
          // Redirige al administrador
          this.router.navigate(['/admin']);
        } else {
          // Redirige al usuario normal
          this.router.navigate(['/home']);
        }
      } else {
        this.errorMessage = 'Contraseña no válida. Asegúrate de usar solo números, mayúsculas, minúsculas y caracteres especiales.';
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'Usuario no se encuentra registrado o hubo un error al iniciar sesión.';
      this.clearForm();
    }
  }

  
 changeBoxShadow() {
    this.isBoxShadowActive = !this.isBoxShadowActive;
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
