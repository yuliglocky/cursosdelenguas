import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class AdminNavComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
