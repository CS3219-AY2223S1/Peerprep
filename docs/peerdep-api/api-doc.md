
# peerdep-api



## Indices

* [History Service](#history-service)

  * [Create session](#1-create-session)
  * [Get sessions](#2-get-sessions)

* [Matching Service](#matching-service)

  * [Get room info](#1-get-room-info)
  * [Leave room](#2-leave-room)

* [Question Service](#question-service)

  * [Add question](#1-add-question)
  * [Delete question](#2-delete-question)
  * [Get random question](#3-get-random-question)

* [User service](#user-service)

  * [Change password](#1-change-password)
  * [Create user](#2-create-user)
  * [Delete user](#3-delete-user)
  * [Login user](#4-login-user)


--------


## History Service



### 1. Create session



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8004/api/session/add
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NjEwLCJleHAiOjE2Njc5NzEwMTB9.V-iTo8vWcXnJv7eAtdvhjJMcxzS0Oqr4SOI_GUMnJ0A |  |



***Body:***

```js        
{
    "userTwoName" : "testtest",
    "completedOn": "1852-01-15T11:25",
    "duration":"987645321",
    "difficulty": "hard",
    "roomUuid": "123",
    "code": "print('help')"
}
```



### 2. Get sessions



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8004/api/session/userSession
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NjEwLCJleHAiOjE2Njc5NzEwMTB9.V-iTo8vWcXnJv7eAtdvhjJMcxzS0Oqr4SOI_GUMnJ0A |  |



## Matching Service



### 1. Get room info



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8001/room/roomInfo
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NjEwLCJleHAiOjE2Njc5NzEwMTB9.V-iTo8vWcXnJv7eAtdvhjJMcxzS0Oqr4SOI_GUMnJ0A |  |



### 2. Leave room



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:8001/room/leaveRoom
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NjEwLCJleHAiOjE2Njc5NzEwMTB9.V-iTo8vWcXnJv7eAtdvhjJMcxzS0Oqr4SOI_GUMnJ0A |  |



## Question Service



### 1. Add question



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8003/api/questions/add
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NTIxLCJleHAiOjE2Njc5NzA5MjF9.8e4oxzZlYdmXj2mV4r-8y4Q4XQipHxmdI8hhBQaeTBY |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | Blake |  |
| content | Add x * 10 |  |
| difficulty | HARD |  |
| input | 1, 2 |  |
| output | 3 |  |



### 2. Delete question



***Endpoint:***

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8003/api/questions/delete
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NTIxLCJleHAiOjE2Njc5NzA5MjF9.8e4oxzZlYdmXj2mV4r-8y4Q4XQipHxmdI8hhBQaeTBY |  |



***Body:***


| Key | Value | Description |
| --- | ------|-------------|
| title | Blake |  |



### 3. Get random question



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:8003/api/questions/getRandomQuestion
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| difficulty | EASY |  |
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MiwiaWF0IjoxNjY3ODg0NTIxLCJleHAiOjE2Njc5NzA5MjF9.8e4oxzZlYdmXj2mV4r-8y4Q4XQipHxmdI8hhBQaeTBY |  |



## User service



### 1. Change password



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/change_password
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MSwiaWF0IjoxNjY3ODg0MDc0LCJleHAiOjE2Njc5NzA0NzR9.EOroR09u1BXeMjDnOA-EVJyE8wosglWBm4ixwJzHrWU |  |



***Body:***

```js        
{
    "username" : "test",
    "password" : "testtest",
    "newPassword" : "testtest1"
}
```



### 2. Create user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/signup
```



***Body:***

```js        
{
    "username" : "test",
    "password" : "testtest"
}
```



### 3. Delete user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/delete
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MSwiaWF0IjoxNjY3ODg0MDc0LCJleHAiOjE2Njc5NzA0NzR9.EOroR09u1BXeMjDnOA-EVJyE8wosglWBm4ixwJzHrWU |  |



***Body:***

```js        
{
    "username" : "test",
    "password" : "testtest1"
}
```



### 4. Login user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/login
```



***Body:***

```js        
{
    "username" : "test",
    "password" : "testtest"
}
```



---
[Back to top](#peerdep-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2022-11-08 13:19:55 by [docgen](https://github.com/thedevsaddam/docgen)
