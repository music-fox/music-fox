# Fancy Todo App Server
Music-Fox App is an application to listen your favourite song. This app has : 
* Register dan Login
* Show User with their Music
* JSON formatted response

&nbsp;

## Endpoints
```
- POST /register
- POST /login
- POST /googleLogin
- GET /user
- GET /user:id

```

## RESTful endpoints

### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "username": "<username to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "username": "<posted username>",
  "email": "<posted email>",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "username must be filled",
  "message": "email must be filled" / "email already exists",
  "message": "password must be filled"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```

### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "username": "<username to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200)_
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJmYXVkemFuIiwiaWF0IjoxNTk4OTU1OTk2fQ.-bZ3Gi4AXPQMtrHfbxJ605On57u4gRXfU0ok88aIW94"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "username or password is wrong"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server Error"
}
```


### GET /user

> Get all user

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 1,
        "username": "test",
        "email": "test@mail.com",,
        "createdAt": "2020-09-03T13:24:35.206Z",
        "updatedAt": "2020-09-03T13:24:35.210Z"
    },
    {
        "id": 3,
        "username": "test",
        "email": "test1@mail.com",,
        "createdAt": "2020-09-03T13:27:26.736Z",
        "updatedAt": "2020-09-03T13:27:26.736Z"
    },
    {
        "id": 4,
        "username": "test",
        "email": "test2@mail.com",,
        "createdAt": "2020-09-03T13:29:04.119Z",
        "updatedAt": "2020-09-03T13:29:04.122Z"
    }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---

### GET /user/:id

> Get todo by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json

{
    "id": 4,
    "username": "test",
    "email": "test2@mail.com",,
    "createdAt": "2020-09-03T13:29:04.119Z",
    "updatedAt": "2020-09-03T13:29:04.122Z",
    "Music": []
}

```

_Response (404 - Not Found)_
```json
{
  "message": "user not found"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "user not authentication"
}
```

---
