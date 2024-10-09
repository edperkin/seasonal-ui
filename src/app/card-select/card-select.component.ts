import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-select',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-select.component.html',
  styleUrl: './card-select.component.css'
})
export class CardSelectComponent {
  @Input() tag: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
}
