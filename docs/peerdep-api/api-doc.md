# peerdep-api

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

## Endpoints

- [user-service](#user-service)
  1. [Create user - SUCCESS](#1-create-user---success)
  1. [Create user - USER_EXISTS (run after success)](#2-create-user---user_exists-run-after-success)
  1. [Create user - PASSWORD_TOO_SHORT](#3-create-user---password_too_short)
  1. [Login user - SUCCESS](#4-login-user---success)
  1. [Login user - INVALID_USER/PW](#5-login-user---invalid_userpw)
- [Question Service](#question-service)
  1. [Add question](#1-add-question)
  1. [Delete question](#2-delete-question)
  1. [Get random question](#3-get-random-question)

---

## user-service

### 1. Create user - SUCCESS

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

### 2. Create user - USER_EXISTS (run after success)

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

### 3. Create user - PASSWORD_TOO_SHORT

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

### 4. Login user - SUCCESS

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

### 5. Login user - INVALID_USER/PW

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

## Question Service

### 1. Add question

**_Endpoint:_**

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8003/questions/test/add
```

**_Body:_**

| Key        | Value       | Description |
| ---------- | ----------- | ----------- |
| title      | Blake       |             |
| content    | Add x \* 10 |             |
| difficulty | Hard        |             |
| input      | 1, 2        |             |
| output     | 3           |             |

### 2. Delete question

**_Endpoint:_**

```bash
Method: POST
Type: URLENCODED
URL: http://localhost:8003/questions/test/delete
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
URL: http://localhost:8003/questions/test/getOne
```

**_Headers:_**

| Key        | Value      | Description |
| ---------- | ---------- | ----------- |
| difficulty | Easy peasy |             |

---

[Back to top](#peerdep-api)

> Generated at 2022-10-07 16:11:31 by [docgen](https://github.com/thedevsaddam/docgen)
