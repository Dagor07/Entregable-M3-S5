# Event Manager - Performance test M3 JavaScript

**Daniel González**  
**Clan:** Berners Lee  
**C.C.:** 1004612007  
**Email:** danielgonzaortiz@gmail.com

## Instructions

###  To run the project:

1. Clone the repository:
   ```bash
   git clone <REPO_URL>
* Install json-server if you don't have it:
   ```bash
    Copy
    Edit
    json-server --watch db.json --port 3000
    Open index.html in your browser (use Live Server or a local environment).

### Features
* Role-based registration and login (admin and visitor)

* Role-based protected routes

* Session persistence with localStorage

* Event CRUD with json-server

* User registration for events with capacity

* Custom 404 view

### Project Structure
- index.html
- README.md
- db.json
- collection_postman.json
- styles/
  - style.css
- js/
  - auth.js
  - events.js
  - main.js
  - router.js
  - views/
    - login.js
    - register.js
    - dashboardAdmin.js
    - dashboardVisitor.js
    - createEvent.js
    - enrollments.js
    - notFound.js

### Requirements
Node.js and json-server installed


### Pendientes
* Enrollments in dashboardVisitor
* POSTMAN
