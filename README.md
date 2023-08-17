<img src="https://github.com/jacobrdz77/selfwork/assets/70309225/da0b6a11-3cab-4ca5-b2a4-f3b6fa69bdfe" style="width:475px; margin-bottom:36px;"/>

A project management system for small teams and freelancers. Organize your projects and members in different workspaces you create. 

# Tech Stack

## Front-end
<img src="https://skillicons.dev/icons?i=react,ts,nextjs,scss" style="width:400px"/>

## Back-end
<img src="https://skillicons.dev/icons?i=nodejs,ts,prisma,postgres" style="width:400px"/>

# Features

- CRUD functionality for projects, clients, sections, tasks, and workspaces.
- Manage multiple workspaces that contain different projects, members, and tasks.
- Invite members to your workspace.
- View your project's tasks in different views such as:
  - List
  - Board (Kanban)
- Use intigrated [Excalidraw](https://excalidraw.com/) to create whiteboards in the sketch view.
- Allows you to log in and register using Google.

# Local Setup
```sh
# Install project dependencies.
npm install
# Copies .env.example file to a new .env file.
cp .env.example .env   
# Make sure you have Docker Desktop installed for this step.
# In a separate terminal, create a docker container for database.
docker compose up
# Updates database with schema.
npx prisma migrate dev --name init
# Initializes database sample data.
npm run seed              
# Starts the project's development server.
npm run dev                               
```
# Showcase
## Creating project
<img id="creating-project" src="https://github.com/jacobrdz77/selfwork/assets/70309225/05bd4b80-57ad-4553-9b3b-8990432c7c5f" />

## Creating task
<img id="creating-task" src="https://github.com/jacobrdz77/selfwork/assets/70309225/3dad93cc-1e7b-451c-9b0b-3d0861543a44" />


# Photos
### Board view of tasks
![board-project](https://github.com/jacobrdz77/selfwork/assets/70309225/20f465eb-49a5-4363-9b97-260a40bfe08e)
### List view of tasks
![list-view](https://github.com/jacobrdz77/selfwork/assets/70309225/f94a93e3-6738-45bc-901e-9e4192fb7999)
### Excalidraw 
![sketch-example](https://github.com/jacobrdz77/selfwork/assets/70309225/d008b68c-1cc8-406c-ade0-13926f3c0c99)
### Adding New Client
![clients-new](https://github.com/jacobrdz77/selfwork/assets/70309225/408b9923-c151-454c-8544-3eab11c9a2dd)
### Clients Page
![no-clients](https://github.com/jacobrdz77/selfwork/assets/70309225/ed1b58d9-c735-4111-98c2-e5062d89669d)
### New Project Form
![project-new](https://github.com/jacobrdz77/selfwork/assets/70309225/d2b19bcc-7b2b-40f1-b18b-5ed20b998fcc)
### Design Photos
![selfwork-figma-designs](https://github.com/jacobrdz77/selfwork/assets/70309225/0569895b-52fa-434a-a2dc-4ae690573ad6)
