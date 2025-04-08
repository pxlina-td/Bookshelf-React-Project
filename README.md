# Virtual Bookshelf

React.js Project for Softuni ReactJS Course

## Overview

This is a front-end web application built with React.js for tracking and managing books. The application allows users to view a catalog of books, manage their own library, and interact with books. The project also includes user authentication, allowing users to register, log in, and manage their profiles.

The main "unit" in this platform is the **books catalog**, which can be **viewed, added to shelf, and edited** depending on user roles.

*Guests* can view the **books catalog** and **register/login** for more functionality.

*Users* can view and  **add books to their shelf**, add and **edit** books they've added to the catalog.

**This project was created by Polina for the Softuni ReactJS course, April 2025.**

## Public Part

This part of the application is accessible to non-registered users. These users can access:

- **Home Page** -> Basic information about the Virtual Bookshelf project.
- **Books Catalog** -> A catalog of books with the ability to view brief information, sort, filter, and paginate the list of books.
- **Book Details** -> Detailed information about a specific book, with option to add it to the shelf if logged in.
- **Login/Register** -> Pages for users to register a new account or log in.

## Private Part

### Users

- **Add books to shelf** -> Users can add books to their shelf. The shelf is tied to their user profile.
- **Profile Page** -> Users can view their profile, including their bookshelf.
- **Create/Edit/Delete Books** -> Users can add new books to the catalog, edit their details, and delete books they've added.

## Users on the Server

The following users are pre-configured on the server:

- **Peter** (email: peter@abv.bg)
  - **Password**: peter123

  
- **George** (email: george@abv.bg)
  - **Password**: george123

  
- **Admin** (email: admin@abv.bg)
  - **Password**: admin123


These users are initialized on the server and have access to the platform as described above.

## Technical Details

**The client application is built with:**
- React.js
- Vite for fast development and bundling
- External CSS files for component styling

If you want to run the project locally, you can use the following commands:

```bash
npm install
npm start
