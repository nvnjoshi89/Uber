# Users API Documentation

## Endpoint: `/users/register`

### Description:

This endpoint is used to register a new user. It validates the input data, hashes the password, and stores the user information in the database.

---

### Method:

**POST**

### Required Data:

The request body must include the following fields:

- **fullname.firstname**: (String) First name of the user. Must be at least 3 characters long.
- **fullname.lastname**: (String) Last name of the user. Optional but must be at least 3 characters long if provided.
- **email**: (String) Email address of the user. Must be a valid email format.
- **password**: (String) Password for the user account. Must be at least 6 characters long.

#### Example Request Body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}


#### Example Request Body:
#### status code 201 created


{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1b2c3d4e5f67890123456",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
