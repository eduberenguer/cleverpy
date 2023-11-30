# Cleverpy Technical Assesment

Application for managing {JSON} Placeholder user posts.

You can view the user list, all their posts and the complete details of each post with their respective comments. You can also log in to access options such as deleting and creating new posts.
<br/>
<br/>

**Deploy:**
<br/>
[https://cleverpy.vercel.app/](https://cleverpy.vercel.app/)

**Web tour:**
<br/>

![tour](https://github.com/cleverpy-technical-test/frontend-sergio-mata/assets/104355739/1569e42c-9d20-467f-942f-f545debd35a8)

<br/>

**Needed credentials:**

To log in, click on the user icon in the bottom right corner of the footer. The correct credentials correspond to real users in the database, which can be found in the Users list. In other words, using the email and username of any user should result in a successful login.

As an example, consider the user with ID #1:

```
- EMAIL: sincere@april.biz
- USERNAME: bret
```

Simply using these credentials should be sufficient to unlock administrator functions, such as deleting or creating posts.

<br/>

**Used technologies:**

```
- Typescript
- React
- Redux Toolkit
- SASS (SCSS / Flexbox & Grid)
- Jest (Jest DOM & React Testing Library)
- React Router DOM
```

<br/>

**Used libraries:**

```
- Framer Motion
- Sweetalert2
```

<br/>

**Commands:**

```shell
# Installation
npm i

# Start app in dev mode
npm run dev

# Build
npm run build
```

```shell
# Testing with coverage
npm run test
```

<br/>

**Testing coverage:**

<br/>

![coverage](https://github.com/cleverpy-technical-test/frontend-sergio-mata/assets/104355739/6ad71c0d-7b4f-43b9-a88a-68fa2516e681)

<br/>

**Main features:**

- Single Page Application.
- App state managed via Redux.
- Use of slices and thunks.
- Two search filters (by text and by user) fully compatible with each other.
- Load, create and delete posts methods fully implemented.
- Protected routes and conditional rendering.
- Log in authentication.
- Use of flexbox and grid layouts.
- Creating modals using a vanilla approach and using external libraries.
- SCSS palette with custom variables.
- Almost 100% of unitary testing with Jest.
- Funny robots profile pictures.
