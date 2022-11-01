# peerdep-api

## Indices

- [History Service](#history-service)

  - [Create session](#1-create-session)
  - [Get sessions](#2-get-sessions)

- [Question Service](#question-service)

  - [Add question](#1-add-question)
  - [Delete question](#2-delete-question)
  - [Get random question](#3-get-random-question)

- [User Service](#user-service)

  - [Create user - PASSWORD_TOO_SHORT](#1-create-user---password_too_short)
  - [Create user - SUCCESS](#2-create-user---success)
  - [Create user - USER_EXISTS (run after success)](<#3-create-user---user_exists-(run-after-success)>)
  - [Login user - INVALID_USER/PW](#4-login-user---invalid_userpw)
  - [Login user - SUCCESS](#5-login-user---success)

---

## History Service

### 1. Create session

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:8004/api/session/add
```

**_Headers:_**

| Key           | Value                                                                                                                                                               | Description |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MTIsImlhdCI6MTY2NjQ0MTc3MywiZXhwIjoxNjY2NTI4MTczfQ.nCnObkCA0SL-C4XTapoIoQiRp22c8TpuTF9j9pFWT0w |             |

**_Body:_**

```js
{
    "userTwoName" : "testtest",
    "completedOn": "1852-01-15T11:25",
    "duration":"1h10m",
    "difficulty": "hard",
    "roomUuid": "123",
    "code": "print('help')"
}
```

### 2. Get sessions

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:8004/api/session/userSession
```

**_Headers:_**

| Key           | Value                                                                                                                                                               | Description |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6MTIsImlhdCI6MTY2NjQ0MTc3MywiZXhwIjoxNjY2NTI4MTczfQ.nCnObkCA0SL-C4XTapoIoQiRp22c8TpuTF9j9pFWT0w |             |

## Question Service

### 1. Add question

**_Endpoint:_**

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8003/api/questions/add
```

**_Body:_**

| Key        | Value       | Description |
| ---------- | ----------- | ----------- |
| title      | Blake       |             |
| content    | Add x \* 10 |             |
| difficulty | HARD        |             |
| input      | 1, 2        |             |
| output     | 3           |             |

### 2. Delete question

**_Endpoint:_**

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8003/api/questions/delete
```

**_Body:_**

| Key   | Value | Description |
| ----- | ----- | ----------- |
| title | Ten   |             |

### 3. Get random question

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:8003/api/questions/getRandomQuestion
```

**_Headers:_**

| Key        | Value | Description |
| ---------- | ----- | ----------- |
| difficulty | EASY  |             |

## User Service

### 1. Create user - PASSWORD_TOO_SHORT

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/signup
```

**_Body:_**

```js
{
    "username" : "test2",
    "password" : "test"
}
```

### 2. Create user - SUCCESS

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/signup
```

**_Body:_**

```js
{
    "username" : "test",
    "password" : "testtest"
}
```

### 3. Create user - USER_EXISTS (run after success)

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/signup
```

**_Body:_**

```js
{
    "username" : "test",
    "password" : "testtest"
}
```

### 4. Login user - INVALID_USER/PW

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/login
```

**_Body:_**

```js
{
    "username" : "invalidUser",
    "password" : "invalidPW"
}
```

### 5. Login user - SUCCESS

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/login
```

**_Body:_**

```js
{
    "username" : "test",
    "password" : "testtest"
}
```

---

[Back to top](#peerdep-api)

> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2022-10-23 02:05:46 by [docgen](https://github.com/thedevsaddam/docgen)
