
# peerdep-api



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->
1. [Create user - SUCCESS](#1-create-user---success)
1. [Create user - USER_EXISTS (run after success)](#2-create-user---user_exists-run-after-success)
1. [Create user - PASSWORD_TOO_SHORT](#3-create-user---password_too_short)
1. [Login user - SUCCESS](#4-login-user---success)
1. [Login user - INVALID_USER/PW](#5-login-user---invalid_userpw)



## Endpoints


--------



### 1. Create user - SUCCESS



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



### 2. Create user - USER_EXISTS (run after success)



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



### 3. Create user - PASSWORD_TOO_SHORT



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/signup
```



***Body:***

```js        
{
    "username" : "test2",
    "password" : "test"
}
```



### 4. Login user - SUCCESS



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



### 5. Login user - INVALID_USER/PW



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:8000/api/user/login
```



***Body:***

```js        
{
    "username" : "invalidUser",
    "password" : "invalidPW"
}
```



---
[Back to top](#peerdep-api)

>Generated at 2022-09-04 12:05:58 by [docgen](https://github.com/thedevsaddam/docgen)
