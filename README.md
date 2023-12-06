# PollIT
PollIT este o aplicatie web care permite utilizatorilor sa creeze si sa participe la poll-uri pentru a culege opinii si feedback direct. Aceasta platforma le ofera utilizatorilor o modalitate simpla si eficienta de a elabora sondaje personalizate, incluzand si optiuni pentru a-si exprima opiniile in legatura cu o gama larga de teme. 

## Cuprins
- Caracteristici
- Cerinte Preliminare
- Instalare
- Utilizare
- Backend API
	Autentificare
	Operatii CRUD

## Caracteristici
- Autentificare utilizator (Register and Login)
- Operatii de creare, citire, actualizare si stergere (CRUD) a poll-urilor
- Encriptarea parolei pentru securitate
- Validarea credentialelor pentru inregistrare si logare
- Interfata grafica user-friendly
- Design responsive pentru diferite dimensiuni ale ecranului

## Cerinte Preliminare
Inainte de a incepe, asigurati-va ca ati instalat urmatoarele:

- Node.js
- npm (Node Package Manager)
- MongoDB (pentru baza de date)

## Instalare
Clonati repostory-ul pe masina locala:
```
git clone https://github.com/catalina72/probaIT.git
```
Mergeti in directorul proiectului:
```
cd probaIT
```
Instalati dependentele pentru backend:
```
cd server
npm install
```
Instalati dependentele pentru frontend:
```
cd pollit
npm install
```

## Utilizare
Porniti serverul pentru backend:
```
cd server
npm start
```
Serverul la rula la adresa http://localhost:3000.

Porniti serverul pentru frontend:
```
cd pollit
npm start
```
Frontend-ul va rula la adresa http://localhost:3001.

Deschideti browser-ul la adresa frontend-ului pentru a utiliza aplicatia PollIT.

## Backend API
### Autentificare
- Register
	Endpoint: POST /register
	Creeaza un nou cont.

- Login
	Endpoint: POST /login
	Autentifica credentialele utilizatorului si furnizeaza un token JWT pentru verificarile ulterioare.

### Operatii CRUD
