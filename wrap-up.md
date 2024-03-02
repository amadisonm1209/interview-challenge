## Questions

### Please provide instructions on how to run your project in a bulleted list below.
- Install dependencies by running ```npm install``` from the root directory
- Change directory to `frontend` and install dependencies by running ```npm install```

- Start up Docker Postgres DB
    - Set up your .env file with the values given for the coding challenge, adding in the value ```PORT=5000```
    - In a terminal, run the command ```docker compose up -d```

- Start up the API
    - In a terminal, from the root folder, run the command ```npm run dev```
    - If successful, you should see 'Application listening on port 5000'

- Start up the Frontend
    - In a separate terminal, change directory into the 'frontend' folder by running ```cd frontend```
    - From this directory, run the command ```npm run dev```

- Go to http://localhost:3000 and enter your account number to get started

### Were there any pieces of this project that you were not able to complete that you'd like to mention?
I would have loved to add some jest tests to make sure I covered all the logic. 

### If you were to continue building this out, what would you like to add next?
I would like to add a feature for a user to be able to create an account. It would also be nice to be able to transfer money inbetween the types of accounts.

### If you have any other comments or info you'd like the reviewers to know, please add them below.
First time using Next and thought it would be fun to give it a shot. Definitely a little overkill,  but I feel like it was a fun little project to work on.