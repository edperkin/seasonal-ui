import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon'
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produce',
  standalone: true,
  imports: [RouterLink, MatIcon, FormsModule, CommonModule],
  templateUrl: './produce.component.html',
  styleUrl: './produce.component.css'
})

export class ProduceComponent implements OnInit {
  produceType: string | null = '';
  selectedItem: string = '';
  items: string[] = ['Fruit', 'Vegetables'];
  dropdownOpen: boolean = false; 
  date: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.produceType = this.route.snapshot.paramMap.get('id');

     this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 

      if (id && this.items.includes(id)) {
        this.selectedItem = id; 
      } else {
        this.selectedItem = this.items[0];
      }
    });

    this.date = this.getDate();
  }

  onDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value; 

    this.router.navigate(['/produce', selectedValue]);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getDate(): string {
const date = new Date();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayOfWeek = daysOfWeek[date.getDay()];

const dayOfMonth = ('0' + date.getDate()).slice(-2);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = months[date.getMonth()];

return `${dayOfWeek}, ${dayOfMonth} ${month}`;

  }
}