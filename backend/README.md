# JobTrackr 2.0 Backend Data Model Documentation

## Overview

This document describes the data models used in JobTrackr 2.0 backend, defining the structure and relationships of the MongoDB collections using Mongoose schemas.

---

## User Model

| Field     | Type   | Required | Description                       |
| :-------- | :----- | :------- | :-------------------------------- |
| name      | String | Yes      | Full name of the user             |
| email     | String | Yes      | Unique user email, used for login |
| password  | String | Yes      | Hashed user password              |
| role      | String | No       | User role, 'user' or 'admin'      |
| createdAt | Date   | Auto     | Timestamp for creation            |
| updatedAt | Date   | Auto     | Timestamp for last update         |

### Notes

- Email field is unique and case-insensitive (lowercased).
- Passwords are securely hashed using bcrypt before saving.
- `role` is an enum with possible values: 'user' and 'admin'.
- Timestamps are automatically handled by Mongoose.

---

## Job Model

| Field       | Type     | Required | Description                       |
| :---------- | :------- | :------- | :-------------------------------- |
| title       | String   | Yes      | Job title                         |
| company     | String   | Yes      | Company name                      |
| status      | String   | No       | Application status (enum)         |
| appliedDate | Date     | No       | Date application was submitted    |
| notes       | String   | No       | Additional notes                  |
| user        | ObjectId | Yes      | Reference to User owning this job |
| createdAt   | Date     | Auto     | Timestamp for creation            |
| updatedAt   | Date     | Auto     | Timestamp for last update         |

### Notes

- Status field is an enum with values: 'applied', 'interviewing', 'offered', 'rejected'.
- `user` field creates a reference to the User collection for ownership.
- Timestamps help track creation and updates.

---

## Relationships

- One User can have many Jobs (one-to-many).
- Jobs reference owning User via ObjectId.

---

## Validation and Security

- Required fields enforce data integrity.
- Enum fields restrict allowed values.
- Password hashing ensures user credential security.
- Sensitive configuration like JWT secret and DB URIs use environment variables and are excluded via `.env` and `.gitignore`.

---

## Indexes

| Collection | Field  | Purpose                              |
| ---------- | ------ | ------------------------------------ |
| User       | email  | Optimize login and querying by email |
| Job        | status | Optimize filtering jobs by status    |

---

## Conclusion

This documentation defines the backend data structure of JobTrackr 2.0, providing a clear guide for development and maintenance of secure and efficient data handling.
