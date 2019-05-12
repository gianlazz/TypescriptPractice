# Description

### Google Assistant:
[Google Assitant README.md](googleAssistant/README.md)

### Server:
[Server README.md](server/README.md)

### Client:
[Client README.md](client/README.md)

### Models:
Training weights for face-api.js

# Quick Start
1. Install Postgresql
    - brew install postgresql
    - brew services start postgresql
    - [Create user with password](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
        - psql postgres
        - \du
        - CREATE ROLE test WITH LOGIN PASSWORD 'Password123';
        - ALTER ROLE test CREATEDB;
        - \du
        - exit
    - createdb -U test postgres
    - createdb -U test postgres-test
2. Run `npm install` in server/ googleAssistant/function /ionic/Face & /client
3. Modify the server/.env
    - cd server/
    - touch .env
    - copy over and modify values in the .env.sample
4. Launch server and it will also run the db migrations
    - F5
5. Launch ionic front end
    - cd ionic/face
    - ionic serve
    - Or for mobile:
    - ionic cordova prepare
    - ionic serve --devapp

# Build Docker

- Launch solution with Docker-Compose
    - Create docker-compose.yml based off of the docker-compose.yml
    - docker-compose build --force-rm --no-cache
    - docker-compose up

- Build Server Container Alone
    - cd server/
    - docker build -t gianlazzarini/ts_face_server .
    - docker run gianlazzarini/ts_face_server

If you're having issues you can clear out the images:
- docker kill $(docker ps -q)
- docker rm $(docker ps -a -q)
- docker rmi $(docker images -q)

- Add an ormconfig.json to the server based on ormconfig.sample.json
- Add a .env file to the server based on .env.sample

# VSCode Automated Tasks & Debugging
A number of build tasks have been automated in .vscode/tasks.json by opening this repo in VSCode you'll have access to them by typing cmd + shift + p then typing in Run Task and hitting enter.

You'll then see a list of task options including npm installing all of the projects, various build and launching options for the project and also tasks for managing typeorm migrations.


# Development Notes
***For reference only and not necessarlily up to date:***

[Root DEVLOG.md](DEVLOG.md)

[Client DEVLOG.md](client/DEVLOG.md)