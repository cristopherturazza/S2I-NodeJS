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

## :open_file_folder: Endpoints

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

You can get all the available targets with a GET request

`/intervals`

or GET data for a specific interval:

`/intervals/:intervalID`

You can PATCH or DELETE a target with the same endpoint.

For a new interval, use a POST request:

`/intervals`

```json
{
  "owner": "insert a valid mongoID that rappresent the interval user owner",
  "startdate": "insert a valid ISO date",
  "enddate": "insert a valid ISO date, greater than the startdate"
}
```

You can filter through the intervals with a SEARCH query:

`/intervals/search`

Filter parameters:

- startdate: insert a valid ISO start date (e.g. 2018-05-22), returns intervals with a greater start date
- enddate: insert a valid ISO end date (e.g. 2020-03-10), return intervals with a lower end date
- target: insert a valid MongoDB Id that rappresent a target
- owner: inser a valid MongoDB Id that rappresent an user

example: `/intervals/search?target=6335c098bb3ddb89f54cd3d6&startdate=2022-08-01`

## Intervals / Targets

You can join an intervals to a target with a PATCH request on this endpoint:

`/targets/:targetID/intervals`

```json
{
  "target": "insert a valid MongoDB Id of a target"
}
```

## :page_with_curl: License

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: cristopherturazza@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/cristopher-turazza-0863a026/
