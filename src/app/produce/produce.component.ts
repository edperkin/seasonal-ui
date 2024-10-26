import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon'
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ProduceService} from '../services/produce.service';

@Component({
  selector: 'app-produce',
  standalone: true,
  imports: [RouterLink, MatIcon, FormsModule, CommonModule],
  templateUrl: './produce.component.html',
  styleUrl: './produce.component.css',
  providers: [ProduceService]
})

export class ProduceComponent implements OnInit {
  produceType: string | null = '';
  produceTypes: string[] = ['Fruit', 'Vegetables'];
  selectedProduceType: string = '';
  selectedProduceTypeIndex: number = 0;
  produceThisWeek: any | null = null;
  dropdownOpen: boolean = false;
  date: string = '';
  errorMessage: string | undefined;
  produce: string = '';
  imageUrl: string = '';
  weeksRemaining: string = '';
  fontColour: string = '#ffffff';

  constructor(private route: ActivatedRoute, private router: Router, private produceService: ProduceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id && this.produceTypes.includes(id)) {
        this.selectedProduceType = id;
      } else {
        this.selectedProduceType = this.produceTypes[0];
      }

      this.selectedProduceTypeIndex = this.produceTypes.indexOf(this.selectedProduceType);

      this.fetchProduceItems();
    });

    this.date = this.getDate();
  }

  fetchProduceItems(): void {
    const date = new Date();
    const week = this.getWeekNumber(date);

    this.produceService.getItemsByWeek(10, this.selectedProduceTypeIndex).subscribe({
      next: (data) => {
        this.produceThisWeek = data;
        console.log(this.produceThisWeek);
        if (this.produceThisWeek) {
          this.produce = this.produceThisWeek[0].name
          this.imageUrl = this.produceThisWeek[0].imageUrl;
          this.fontColour = this.produceThisWeek[0].colour;
          this.weeksRemaining = this.produceThisWeek[0].weeksRemaining;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching data';
        console.error(error);
      }
    });
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

  getWeekNumber(d: Date): number {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}
