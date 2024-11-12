## General information

- **Public URL**: https://ia04-deployment-bs1q.vercel.app
- **Tech**:
  - Framework: NextJS (Backend + Frontend)
  - Database: MongoDB (with mongoose ODM)
- **Default account**:
  - Email: test@gmail.com
  - Password: 12345678

## Requirements

- [x] Backend Implementation:

  - [x] Registration Endpoint: works perfectly; validations and hashing are correct. (0.5 pt)
  - [x] Login Endpoint: works correctly; token generated and returned. (0.5 pt)
  - [x] JWT Token Validation: proper middleware with token verification on all protected routes. (0.5 pt)
  - [x] Profile (Protected Route): protected route works; only accessible with valid token. (0.5 pt)

- [x] Frontend Implementation

  - [x] Register page (1 pt)
  - [x] Login page (1 pt)
  - [x] Profile page (1 pt)
  - [x] Home page: display content based on authentication status (1 pt)
  - [x] Frontend Form Handling: all forms work smoothly; good UX with error handling. (1 pt)
  - [x] State Management: state managed well; token and user info updated smoothly. (1 pt)
  - [x] Error Handling and Feedback: comprehensive error handling; clear user feedback. (1 pt)

- [x] Public host deployment (1 pt)

## Scripts

Do the following steps to run project locally:

```js
  pnpm install
```

```js
  pnpm dev
```
