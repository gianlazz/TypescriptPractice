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
    - createdb -U test postgres
2. Run `npm install` in both server and client dirs
3. cd into client dir and run `npm run serve` which will launch both the server and client

- Add an ormconfig.json to the server based on ormconfig.sample.json
- Add a .env file to the server based on .env.sample

# VSCode Automated Tasks & Debugging
A number of build tasks have been automated in .vscode/tasks.json by opening this repo in VSCode you'll have access to them by typing cmd + shift + p then typing in Run Task and hitting enter.

You'll then see a list of task options including npm installing all of the projects, various build and launching options for the project and also tasks for managing typeorm migrations.


# Development Notes
***For reference only and not necessarlily up to date:***

[Root DEVLOG.md](DEVLOG.md)

[Client DEVLOG.md](client/DEVLOG.md)