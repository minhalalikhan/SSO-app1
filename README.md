**# SSO Login Client App1**

**## Introduction**

This app is a demo client app which is used to demonstrate SSO login functionality. This app works by implementing the [SSO-Authstore](__https://github.com/minhalalikhan/SSO-Authstore__) app which acts as the source of truth

**## Demo**
- [AuthStore]()
- [App1]()


**## How to use**

- clone this repo
- clone the AuthStore repo
-  add relevant env variables on both projects
-   npm run dev command to start each of them
-   Visit App1
-   click on SignIn with AuthStore
-   Login to AuthStore if not already signedIn

**## Env File**

```
NEXTAUTH_SECRET='put any text here for Next-auth encryption'
!! replace localhost and port with domain 
NEXT_AUTHSTORE_TOKEN_URL='http://localhost:3000/api/token' 


!! IMPORTANT : 
CLIENT_ID AND CLIENT_KEY must match those in Authstore Store.ts

CLIENT_ID='1234'
CLIENT_KEY='app1@5832'

!! whatever the current URL of the app1 is
NEXTAUTH_URL='http://localhost:4001'


NEXT_PUBLIC_AUTHSTORE_URL='http://localhost:3000/'

!! must match ClIENT_ID
NEXT_PUBLIC_CLIENT_ID='1234'
!! here localhost:4001 to be replaced with app1 domain 
NEXT_PUBLIC_CALLBACK_URL='http://localhost:4001/callback'
```