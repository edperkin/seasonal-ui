import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduceService {
  private apiUrl = 'http://localhost:5064/api/Produce/week';

  constructor(private http: HttpClient) {}

  getItemsByWeek(weekNumber: number, produceType: number): Observable<any> {
    const url = `${this.apiUrl}/${weekNumber}?produceType=${produceType}`;
    return this.http.get<any>(url);
  }
}
