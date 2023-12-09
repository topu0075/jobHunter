# jobHunter

jobHunter is a web application that allows users to search for job postings posted by employers and facilitates the job application process. The application streamlines the job hunting experience by providing a user-friendly interface for job seekers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Job Search:** Easily search for job postings based on various criteria such as location, industry, and job title.
- **Job Application:** Submit job applications directly through the platform, making the application process more convenient.
- **User Accounts:** Create and manage user accounts to save preferences and track application history.
- **Responsive Design:** The application is designed to be responsive and accessible from different devices.

## Technologies Used

- **Frontend:**

  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Redux](https://redux.js.org/) - State management library for React applications.
  - [Axios](https://axios-http.com/) - Promise-based HTTP client for making requests to the backend.

- **Backend:**

  - [Node.js](https://nodejs.org/) - JavaScript runtime for server-side development.
  - [Express](https://expressjs.com/) - Web application framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing job postings and user data.

- **Authentication:**

  - [JWT (JSON Web Tokens)](https://jwt.io/) - Token-based authentication for securing user sessions.

- **Styling:**
  - [Sass](https://sass-lang.com/) - CSS preprocessor for more maintainable and organized styles.

## Getting Started

To get started with jobHunter, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/topu0075/jobHunter.git
   ```

2. Set up the MongoDB database:
   -Create a MongoDB database and update the connection string in
   ```bash
    server/config/default.json.
   ```
3. Start the application::

   ```bash
   # Navigate to the frontend directory
    cd jobHunter/client
    npm install

    # Navigate to the backend directory
    cd ../server
    npm install
   ```

4. Run the Application:
   - Open your browser and navigate to http://localhost:3000 to access the application.
