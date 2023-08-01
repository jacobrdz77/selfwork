<img src="https://user-images.githubusercontent.com/70309225/215390454-95f72343-f8b3-495e-bebf-7a42ab16c2a5.png" style="width:220px;"/>


A project management system for small teams and freelancers. Organize your projects and members in different workspaces you create. 

# Tech Stack

## Front-end

- TypeScript
- React
- Next.js
- SCSS

## Back-end

- Next.js API Routes (Nodejs)
- Prisma (TypeScript ORM)
- PostgreSQL

# Features

- CRUD functionality for projects, clients, sections, tasks, and workspaces.
- Manage multiple workspaces that contain different projects, members, and tasks.
- Invite members to your workspace.
- View your project's tasks in different views such as:
  - List
  - Board (Kanban)
- Use intigrated [Excalidraw](https://excalidraw.com/) to create whiteboards in the sketch view.
- Allows you to log in and register using Google.

# Setup
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

![board-project](https://github.com/jacobrdz77/selfwork/assets/70309225/20f465eb-49a5-4363-9b97-260a40bfe08e)
![list-view](https://github.com/jacobrdz77/selfwork/assets/70309225/f94a93e3-6738-45bc-901e-9e4192fb7999)
![clients-new](https://github.com/jacobrdz77/selfwork/assets/70309225/408b9923-c151-454c-8544-3eab11c9a2dd)
![no-clients](https://github.com/jacobrdz77/selfwork/assets/70309225/ed1b58d9-c735-4111-98c2-e5062d89669d)
![project-new](https://github.com/jacobrdz77/selfwork/assets/70309225/d2b19bcc-7b2b-40f1-b18b-5ed20b998fcc)

