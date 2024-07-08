import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
  standalone: true,
   imports: [RouterLink]
})
export class SolicitudComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
