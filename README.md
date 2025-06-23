Running Both Applications Together
Open two terminal windows

cd backend
php artisan serve

cd frontend
ng serve

Backend works fine with postman.

POST http://localhost:8000/api/auth/register
POST http://localhost:8000/api/auth/login
GET http://localhost:8000/api/auth/user-profile
GET http://localhost:8000/api/tasks
POST http://localhost:8000/api/tasks
PUT http://localhost:8000/api/tasks/1
DELETE http://localhost:8000/api/tasks/1
Some of them requires a bearer token.

Frontend works but I'm not really proud of it :'( 
you can check it http://localhost:4200/test-services
hope everything goes well.
