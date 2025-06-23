import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-services-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Auth Service Test</h2>
      
      <div class="card mb-4">
  <div class="card-body">
    <h4 class="card-title">Register</h4>
    <form (ngSubmit)="onRegister()" #registerForm="ngForm">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" [(ngModel)]="registerData.name" name="name" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" [(ngModel)]="registerData.email" name="email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" [(ngModel)]="registerData.password" name="password" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Confirm Password</label>
        <input type="password" class="form-control" [(ngModel)]="registerData.password_confirmation" name="password_confirmation" required>
      </div>
      <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || registerData.password !== registerData.password_confirmation">
        Register
      </button>
      <div *ngIf="registerData.password && registerData.password_confirmation && registerData.password !== registerData.password_confirmation" 
           class="text-danger mt-2">
        Passwords do not match!
      </div>
      <p *ngIf="registerResult" class="mt-2">Result: {{ registerResult | json }}</p>
    </form>
  </div>
</div>

      <div class="card mb-4">
        <div class="card-body">
          <h4 class="card-title">Login</h4>
          <div class="mb-3">
            <input [(ngModel)]="loginData.email" placeholder="Email" class="form-control">
          </div>
          <div class="mb-3">
            <input [(ngModel)]="loginData.password" type="password" placeholder="Password" class="form-control">
          </div>
          <button (click)="onLogin()" class="btn btn-success">Login</button>
          <p *ngIf="loginResult" class="mt-2">Result: {{ loginResult | json }}</p>
          <p *ngIf="token" class="mt-2">Token: {{ token }}</p>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <h4 class="card-title">Task Service Test</h4>
          <div class="mb-3">
            <input [(ngModel)]="newTask.title" placeholder="Task title" class="form-control">
          </div>
          <button (click)="createTask()" class="btn btn-info me-2">Create Task</button>
          <button (click)="getTasks()" class="btn btn-secondary">Get Tasks</button>
          <button (click)="logout()" class="btn btn-danger float-end">Logout</button>
          
          <div *ngIf="tasks" class="mt-3">
            <h5>Tasks:</h5>
            <ul class="list-group">
              <li class="list-group-item" *ngFor="let task of tasks">
                {{ task.title }} (ID: {{ task.id }})
              </li>
            </ul>
          </div>
          <p *ngIf="taskResult" class="mt-2">Result: {{ taskResult | json }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-bottom: 20px;
    }
  `]
})
export class ServicesTestComponent {
  registerData = { name: '', email: '', password: '', password_confirmation: ''  };
  loginData = { email: '', password: '' };
  newTask = { title: '' };
  
  registerResult: any;
  loginResult: any;
  taskResult: any;
  tasks: any[] = [];
  token: string | null = null;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {
    this.token = localStorage.getItem('token');
  }

 onRegister() {

  if (this.registerData.password !== this.registerData.password_confirmation) {
    this.registerResult = { error: "Passwords do not match!" };
    return;
  }

  this.authService.register(
    this.registerData.name,
    this.registerData.email,
    this.registerData.password,
    this.registerData.password_confirmation 
  ).subscribe({
    next: (res) => {
      this.registerResult = res;
      console.log('Register success:', res);
    },
    error: (err) => {
      this.registerResult = err.error;
      console.error('Register error:', err);
    }
  });
}

  onLogin() {
    this.authService.login(
      this.loginData.email,
      this.loginData.password
    ).subscribe({
      next: (res) => {
        this.loginResult = res;
        this.token = localStorage.getItem('token');
        console.log('Login success:', res);
      },
      error: (err) => {
        this.loginResult = err.error;
        console.error('Login error:', err);
      }
    });
  }

  createTask() {
    this.taskService.createTask(this.newTask).subscribe({
      next: (res) => {
        this.taskResult = res;
        this.newTask.title = '';
        console.log('Task created:', res);
        this.getTasks(); // Refresh task list
      },
      error: (err) => {
        this.taskResult = err.error;
        console.error('Create task error:', err);
      }
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res as any[];
        console.log('Tasks:', res);
      },
      error: (err) => {
        this.taskResult = err.error;
        console.error('Get tasks error:', err);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.token = null;
    this.tasks = [];
    console.log('Logged out');
  }
}