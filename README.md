# Hackathon 2023

Hackathon Repository of the EDAG Mobility IT Team.

## Required 
- ### Database
    - Docker
- ### Backend
  - Poetry (Install it by running ```curl -sSL https://install.python-poetry.org | python3 -``` in your terminal and don't forget adding it to your PATH)
- ### Frontend
  - NodeJS
  - Bun (Install it by running ```sudo npm install -g bun```)

## How to run
### Database
Start the database by running ```docker-compose up``` in the root folder of the project. The ```docker-compose.yml``` takes care of setting up a basic database for you.

### Backend
Run ```poetry install``` in the sub-folder of the backend. Then you can start the server by executing ```poetry run chalice local --stage dev --no-autoreload```.
The server will accept requests on ```http://localhost:8000```.

### Frontend
The frontend is using ```bun``` instead of ```npm```. So you have to install the dependencies by running ```bun install``` in the frontend folder.
After that you can start the frontend by executing ```bun dev```. 
Open ```http://localhost:3000``` in your browser to access the frontend.