# Pelita API

API untuk aplikasi PELITA (Peduli Lingkungan Kita)

**Base URL: "https://pelita-app.et.r.appspot.com/"** <br>
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
  - email (string)
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
      "id": 1,
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
      "address": "Jl. Sudagaran"
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
  - phone (string)
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
          "created_at": "29-05-2023"
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
        "created_at": "29-05-2023"
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
      "created_at": "29-05-2023"
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
          "type": "besi",
          "weight": 6,
          "address": "Jl DI Panjaitan",
          "note": "besi bekas",
          "image": "https://storage.googleapis.com/pelita-trashes/20230529-212919",
          "status": "Belum diambil"
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
        "type": "besi",
        "weight": 6,
        "address": "Jl DI Panjaitan",
        "note": "besi bekas",
        "image": "https://storage.googleapis.com/pelita-trashes/20230529-212919",
        "status": "Belum diambil",
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
      "type": "besi",
      "weight": 6,
      "address": "Jl DI Panjaitan",
      "image": "https://storage.googleapis.com/pelita-trashes/20230529-212919",
      "status": "Belum diambil"
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
  - note (string)
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
  - note (string)
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
