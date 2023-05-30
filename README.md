# Pelita API

API untuk aplikasi PELITA (Peduli Lingkungan Kita)

**Base URL: ""** <br>
Meluncur🚀:

- [User](#user)
- [Point](#point)
- [Article](#article)
- [Trash](#trash)

## User

---

### Register

- Endpoint: /users/register
- Method: POST
- Body:
  - username (string)
  - password (string)
- Result:
  ```
  {
      "message": "Registration successful"
  }
  ```

### Login

- Endpoint: /users/login
- Method: GET
- Body:
  - username (string)
  - password (string)
- Result:
  ```
  {
      "message": "Login successful",
      "data": {
          "id": 1,
          "username": "fauzanfl",
          "password": "$2b$10$vEubmrz4CyeZPWVSidREF.XPrzh7UtaH8Ofa9SSTthEFeS/jK6xcW",
          "name": "",
          "email": "",
          "address": "",
          "created_at": "2023-05-29T12:57:56.000Z",
          "updated_at": "2023-05-29T12:57:56.000Z"
      },
      "token": {token}
  }
  ```
  \*note: {token} merupakan token yang diberikan ketika login yang dijadikan untuk kunci Authorization pada header

### Logout

- Endpoint: /users/logout
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "message": "Logout successful"
  }
  ```

### Get All Users

- Endpoint: /users
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  [
      {
          "id": 1,
          "username": "fauzanfl",
          "password": "$2b$10$vEubmrz4CyeZPWVSidREF.XPrzh7UtaH8Ofa9SSTthEFeS/jK6xcW",
          "name": "Fauzan Fashihul Lisan",
          "email": "ffl@gmail.com",
          "address": "Jl. Sudagaran",
          "created_at": "2023-05-29T12:57:56.000Z",
          "updated_at": "2023-05-29T12:57:56.000Z"
      },
      {
          ...
      }
  ]
  ```

### Get User

- Endpoint: /users/:id
- Method: GET
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "id": 1,
      "username": "fauzanfl",
      "password": "$2b$10$vEubmrz4CyeZPWVSidREF.XPrzh7UtaH8Ofa9SSTthEFeS/jK6xcW",
      "name": "Fauzan Fashihul Lisan",
      "email": "ffl@gmail.com",
      "address": "Jl. Sudagaran",
      "created_at": "2023-05-29T12:57:56.000Z",
      "updated_at": "2023-05-29T12:57:56.000Z"
  }
  ```

### Update User

- Endpoint: /users/update/:id
- Method: PUT
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Body:
  - name (string)
  - email (string)
  - address (string)
- Result:
  ```
  {
      "message": "Update successful"
  }
  ```

### Delete User

- Endpoint: /users/delete/:id
- Method: DELETE
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "message": "Delete successful"
  }
  ```

## Point

---

### Get Point From User

- Endpoint: /points/total/:userId
- Method: GET
- Params:
  - userId (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "total": 0
  }
  ```

### Add Point

- Endpoint: /points/add/:id
- Method: PUT
- Params:
  - id (integer)
- Body:
  - point (integer)
- Header:
  - Authorization: Bearer {token}
- Result:

  ```
  {
     "message": "Point +20"
  }
  ```

### Reduce Point

- Endpoint: /points/reduce/:id
- Method: PUT
- Params:
  - id (integer)
- Body:
  - point (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "message": "Point -5"
  }
  ```

## Article

---

### Get All Articles

- Endpoint: /articles
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  [
      {
          "id": 1,
          "title": "Pentingnya Kesadaran Masyarakat Akan Kebersihan",
          "thumbnail": "https://dlh.semarangkota.go.id/wp-content/uploads/2021/02/blogspot-co-id.jpg",
          "text": "Kesadaran Masyarakat terhadap...",
          "type": "public",
          "link": "https://dlh.semarangkota.go.id/pentingnya-kesadaran-masyarakat-akan-kebersihan/",
          "created_at": "2023-05-29T03:39:45.000Z",
          "updated_at": "2023-05-29T03:39:45.000Z"
      },
      {
          ...
      }
  ]
  ```

### Get Articles by Type

- Endpoint: /articles/type/:type
- Method: GET
- Params:
  - type (string)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  [
    {
        "id": 1,
        "title": "Pentingnya Kesadaran Masyarakat Akan Kebersihan",
        "thumbnail": "https://dlh.semarangkota.go.id/wp-content/uploads/2021/02/blogspot-co-id.jpg",
        "text": "Kesadaran Masyarakat terhadap...",
        "type": "public",
        "link": "https://dlh.semarangkota.go.id/pentingnya-kesadaran-masyarakat-akan-kebersihan/",
        "created_at": "2023-05-29T03:39:45.000Z",
        "updated_at": "2023-05-29T03:39:45.000Z"
    },
    {
        ...
        "type": "public"
        ...
    }
  ]
  ```

### Get Article

- Endpoint: /articles/:id
- Method: GET
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "id": 1,
      "title": "Pentingnya Kesadaran Masyarakat Akan Kebersihan",
      "thumbnail": "https://dlh.semarangkota.go.id/wp-content/uploads/2021/02/blogspot-co-id.jpg",
      "text": "Kesadaran Masyarakat terhadap...",
      "type": "public",
      "link": "https://dlh.semarangkota.go.id/pentingnya-kesadaran-masyarakat-akan-kebersihan/",
      "created_at": "2023-05-29T03:39:45.000Z",
      "updated_at": "2023-05-29T03:39:45.000Z"
  }
  ```

## Trash

---

### Get All Trashes

- Endpoint: /trashes
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  [
      {
          "id": 1,
          "user_id": 1,
          "type": "besi",
          "weight": 6,
          "address": "Jl DI Panjaitan",
          "image": "https://storage.googleapis.com/pelita-trashes/20230529-212919",
          "status": "Belum diambil",
          "created_at": "2023-05-29T14:29:23.000Z",
          "updated_at": "2023-05-29T14:29:23.000Z"
      },
      {
          ...
      }
  ]
  ```

### Get Trashes From User

- Endpoint: /trashes/user/:userId
- Method: GET
- Params:
  - userId (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  [
    {
        "id": 1,
        "user_id": 1,
        "type": "besi",
        "weight": 6,
        "address": "Jl DI Panjaitan",
        "image": "https://storage.googleapis.com/pelita-trashes/20230529-212919",
        "status": "Belum diambil",
        "created_at": "2023-05-29T14:29:23.000Z",
        "updated_at": "2023-05-29T14:29:23.000Z"
    },
    {
        ...
    }
  ]
  ```

### Get Trash

- Endpoint: /trashes/:id
- Method: GET
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "id": 1,
      "user_id": 1,
      "type": "besi",
      "weight": 6,
      "address": "Jl DI Panjaitan",
      "image": "https://storage.googleapis.com/pelita-trashes/20230529-212919",
      "status": "Belum diambil",
      "created_at": "2023-05-29T14:29:23.000Z",
      "updated_at": "2023-05-29T14:29:23.000Z"
  }
  ```

### Create Trash

- Endpoint: /trashes/create
- Method: POST
- Header:
  - Authorization: Bearer {token}
- Body:
  - userId (integer)
  - image (image file)
  - type (string)
  - weight (integer)
  - address (string)
- Result:
  ```
  {
      "message": "Trash created"
  }
  ```

### Update Trash

- Endpoint: /trashes/update/:id
- Method: PUT
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Body:
  - image (image file)
  - type (string)
  - weight (integer)
  - address (string)
- Result:
  ```
  {
      "message": "Trash updated"
  }
  ```

### Change Status of Trash

- Endpoint: /trashes/taken/:id
- Method: PUT
- Params:
  - id (integer)
- Header:
  - Authorization: Bearer {token}
- Result:
  ```
  {
      "message": "Status changed"
  }
  ```
