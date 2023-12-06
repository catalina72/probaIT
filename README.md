# PollIT
PollIT este o aplicatie web care permite utilizatorilor sa creeze si sa participe la poll-uri pentru a culege opinii si feedback direct. Aceasta platforma le ofera utilizatorilor o modalitate simpla si eficienta de a elabora sondaje personalizate, incluzand si optiuni pentru a-si exprima opiniile in legatura cu o gama larga de teme. 
<img src="https://github.com/catalina72/probaIT/blob/main/1.png">

## Cuprins
- Caracteristici
- Cerinte Preliminare
- Instalare
- Utilizare
- Backend API
	- Autentificare
	- Operatii CRUD
	- Criptarea Parolei
	- Validare email si parola
- Frontend UI
	- Navbar
	- Autentificare
	- Pagina de Poll-uri
	- Creare Poll
	- Stergere Poll
	- Votare Poll
	- Multiple Options Poll
	- Multiple Answers Poll
	- Responsiveness

## Caracteristici
- Autentificare utilizator (Register si Login)
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
	- Endpoint: POST /register
	- Creeaza un nou cont.

- Login
	- Endpoint: POST /login
	- Autentifica credentialele utilizatorului si furnizeaza un token JWT pentru verificarile ulterioare.

### Operatii CRUD
- Obtine toate sondajele
	- Endpoint: GET /polls
	- Intoarce toate sondajele din baza de date.

- Creare Poll
	- Endpoint: POST /polls
	- Creeaza un nou sondaj cu o intrebare si mai multe optiuni.

- Stergere Poll
	- Endpoint: DELETE /polls/:id
	- Sterge un sondaj dupa ID-ul acestuia.
	- Doar owner-ul sondajului permisiuni de stergere asupra acestuia.

- Votare Poll
	- Endpoint: PATCH /polls/vote/:id
	- Voteaza in cadrul unui sondaj selectand optiunea/optiunile dorite.
	- Doar utilizatorii logati pot vota in cadrul sondajelor, avand dreptul la maxim un vot.

### Criptarea parolei
- Cripteaza parola folosind bcrypt pentru un nivel ridicat de securitate.

### Validare email si parola
- Valideaza emailul si parola in procesul de autentificare.

## Frontend UI
### Navbar
Navbar-ul contine link-uri catre Register si Login, in cazul in care utilizatorul este autentificat, iar in caz contrar catre Create a Poll si Logout.

### Autentificare
- Modal pentru Register
	- Se deschide dand click pe link-ul de Register din navbar.
	- Permite utilizatorilor sa isi creeze un nou cont.

- Modal pentru Login
	- Se deschide dand click pe link-ul de Login din navbar.
	- Permite utilizatorilor sa se autentifice cu datele lor.

### Pagina de Poll-uri
- Afiseaza lista de poll-uri sub forma de card.
- Fiecare sondaj contine intrebarea si optiunile corespunzatoare.
- Utilizatorii pot interactiona cu acestea alegandu-si optiunea, votand si stergand sondajele.

### Creare Poll
- Se deschide dand click pe link-ul de 'Create a Poll' din navbar.
- Utilizatorii pot creea sondaje noi cu o intrebare si optiuni multiple.

### Stergere Poll
- Utilizatorii pot sterge un poll pe care l-au creat apasand butonul de Delete.

### Votare Poll
- Utilizatorii pot vota in cadrul unui poll selectand optiunea dorita.

### Multiple Options Poll
- Utilizatorii pot creea sondaje cu un numar variabil de optiuni (in mod default, 3 optiuni).

### Multiple Answers Poll
- Permite utilizatorilor sa creeze sondaje cu mai multe raspunsuri.

### Responsiveness
Site-ul este facut pentru a se adapta si a afisa in mod corespunzator componentele pe dispozitive cu diferite dimensiuni ale ecranului 