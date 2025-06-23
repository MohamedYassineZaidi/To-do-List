import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createTask(task: any) {
    return this.http.post(this.apiUrl, task, { headers: this.getHeaders() });
  }

  
  getTasks() {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }
}