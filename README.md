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


