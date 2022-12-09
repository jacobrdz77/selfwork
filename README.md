# selfwork (in development)

### A project management system targeted for freelancers.

# Tech Stack

![Tech Stack](https://user-images.githubusercontent.com/70309225/182041078-2d02c59a-87a6-48af-8b67-7493a7a3d74d.png)

# Features

- Full CRUD functionality for projects, clients, and tasks.
- Allows you to log in and register using Github.
- Add Tasks for projects which you can define the start date and due date, priority, and description.

# Notes

## Errors

- Had errors with API (ERR_HTTP_HEADERS_SENT) because in the api after successfully sending a response, it kept on checking on the other req.method.
- Had error with using fetch for a get request. It was because the get request had a body which is not supposed to.(weird tbh)

## Current State of Project

### August 6, 2022

- Projects page is mostly finished. It's able to fetch all projects from using userId. Still need to fetch all data for project detail page.

## Projects Page

![projects-page](https://user-images.githubusercontent.com/70309225/182730217-b7f123dd-d704-436c-a7a5-7a4bda8f947a.PNG)

## Projects Page with Projects

![projects-page-with-project](https://user-images.githubusercontent.com/70309225/182730249-58a2bf65-6ef7-4b32-ab6b-844631e00ebd.PNG)

## Create Project Modal

![modal](https://user-images.githubusercontent.com/70309225/182730274-0724d3ba-5a36-4f4b-8a82-241e72051f7f.PNG)

## Form Validation in Modal

![form-validation](https://user-images.githubusercontent.com/70309225/182730327-d4002e7c-f9f4-4ef4-aec3-eb2694c6bd77.PNG)
