# Garden City Academy

![alt text](<react-vite/public/Screenshot 2024-08-30 131010.png>)

## Introduction

Garden City Academy is an online school platform that is modeled after a K-12 school that my church started.  It has different user types for parents, students, teachers, and administrators.  Based on the type of user logged in the different areas of the site render the relevent data for that user.

## Technologies Used

### Backend

- Python
- Flask
- SQLAlchemy
- PostgreSQL

### Frontend

- JavaScript
- React
- Redux

### Development

- SQLite3

## Live Site:

https://gca-qap8.onrender.com

## Setup Instructions for Local Use

### Prerequisites
- Node.js

### Steps to Launch the Application Locally

1. **Clone the GitHub repository**

   ```sh
   git clone https://github.com/Big-Hdub/GCA.git
   cd GCA
   ```

2. **Install dependencies.**

   ```bash
   pipenv install -r requirements.txt
   ```

3. **Create a __.env__ file based on the example with proper settings for your development environment.**

4. **Get into your pipenv, migrate your database, seed your database, and run your Flask app:**

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run -p 5001
   ```

5. **In a second terminal you need to start your react app:**

   React app:
   ```bash
   cd react-vite
   npm install
   npm run dev
   ```
