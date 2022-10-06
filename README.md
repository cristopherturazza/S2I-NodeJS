# :pray: MeditAPI

REST API for a meditation application.

## :question: Why

This project is the final practice for start2impact Node.js course.

## :bulb: How it works

This API has three data Schemas:

- Users: data of the subscripted users
- Intervals: timeframes where the users try to achieve their targets
- Targets: the challenges that the users tries to win

Using the correct [endpoints](#endpoints) you can Create, Read, Update ore Delete (CRUD) what do you want.
Finally, you can search through the intervals with some queries.
For this project where used Node.js (with Express framework) and MongoDB database.

## :books: Libraries

- Express
- dotenv
- Helmet
- Morgan
- Mongoose
- Celebrate

## :floppy_disk: Installation

First of all, you need Node.js installed.  
If you don't have it, you can download it here:
[Node.js](https://nodejs.org/it/download/)  
After the installation, you're ready to go.

### 1 - Clone the repository

`git clone https://github.com/cristopherturazza/S2I-NodeJS`

### 2 - Install the dependencies

`npm install`

### 3 - Start it

`npm start`

### 4 - Connect your MongoDB database

Create, if don't exist, a `.env` file and the insert an enviroment variable named `DB_URI`with your MongoDB connection string.  
Example:
`DB_URI="mongodb+srv://...`

### 5 - Test it with a client

Using something like Postman, Thunderclient or Insomnia, you can start using this API on the port 3000.

## Endpoints

### Users

You can get the entire users list with a GET request:

`/users`

or GET data for a specific user:

`/users/:userID`

:userID must be a valid MongoDB id.  
You can PATCH or DELETE user data with the same endpoint.

Finally, you can add a new user with a POST request:

`/users`

```json
{
    "name": "insert an alphanumeric string, min 2 characters",
    "surname": "insert an alphanumeric string, min 2 characters"
    "email": "insert a valid email"
}
```

### Targets

You can get the entire targets list with a GET request:

`/targets`

or GET data for a specific target:

`/targets/:targetID`

:targetID must be a valid MongoDB id.  
You can PATCH or DELETE a target with the same endpoint.

Finally, you can add a new target with a POST request:

`/targets`

```json
{
    "title": "insert a, min 2 characters, max 30",
    "description": "insert a string, min 2 characters, max 300"
    "days": "insert a number"
}
```

### Intervals

## :page_with_curl: License

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: cristopherturazza@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/cristopher-turazza-0863a026/
