import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  templateUrl: './help.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./help.component.css']
})
export class HelpComponent {}
