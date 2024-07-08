import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StudentssComponent } from '../studentss/studentss.component';
import { ProfessorService } from '../professor.service';
import { Router } from '@angular/router';
import { CursoXProfesor } from '../modules';
import { SolicitudComponent } from '../solicitud/solicitud.component';
import { sortedChanges } from '@angular/fire/firestore';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, StudentssComponent, SolicitudComponent]
})
export class UsersPage implements OnInit {

  cursos: CursoXProfesor[] = [];
 

  constructor(private firestoreService: ProfessorService,
    private router: Router,
  ) { 
    this.load();
   
  }
  load() {
    this.firestoreService.getCollectionChanges<CursoXProfesor>('cursosxprofesores').subscribe( data => {
      if (data) {
        this.cursos = data
      }

    })
  }
  ngOnInit(): void {
    this.firestoreService.getCollectionChanges<any>('cursosxprofesores').subscribe(cursos => {
      this.cursos = cursos.filter(cursos => !cursos.deleted);
    });
  }

  details(id: string): void {
    this.router.navigateByUrl(`/details/${id}`);
  }

}
