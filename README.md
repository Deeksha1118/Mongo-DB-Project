# create a server 
  >> for storing certain book data
  >> user register
  >> subscription

# This is a book record management APT Server/ Backend for the library system of records or manuals or books

# Routes and Endpoints(API)

## /users
POST : Create a new user
GET : Get all the user info here

## /users/{id}
GET : Get a user by id 
PUT : Update a user by their id
DELETE : Delete a user by id, before deleting (check if he/she still have an issued book) && (is there any fine to be paid)

## /users/subscription-details/{id}
GET : Get user subscription details
  * Date of subscription
  * Valid till
  * Is there any Fine

## FINE SYSTEM :
User : c - 06/06/2023
If he comes on 07/06/2023 => 50/-
If he comes on 09/06/2023 => 50*3 = 150/-

## Subscription types

3 Months - Basic
6 Months - Standard
12 Months - Premium

**HOW WE WILL WORK WITH FINE SYSTEM**
If the subscription type is standard && if the subscription date is 06/03/2023
Then subscription valid till 06/09/2023

within subscription date >> if we wiss the renewal >> 50/-
subscription date is also missed >> and also missed the renewal >> 100+50 => 150/-

* missed by renewal date >> 50/-
* missed by subscription date >> 100/-
* missed by renewal && subscription date >> 150/-


## /books
GET : Get all the books
POST : Add a newbook

## /books/{id}
GET : Get a book by id
PUT : Update a book by id

## /books/issued
GET : Get all issued books

## /books/issued/with fine
GET : Get all issued books with their fine



**To create initial backend**
>> npm init

**Get the nodemon**
>> npm i nodemon --save-dev(for developer dependency)

**Install Express**
>> npm i express

**To Run Server**
>> npm run dev

**In Thunder Client**
>> http://localhost:8081/ -----> SEND



mongodb+srv://Mongo-DB-Project:<db_password>@cluster0.mg3yg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 

, {
        useNewUrlParser : true,      //key Words,by default
        useUnifiedTopology : true,
    }