# Week 2 Express API Assignment

A simple Express application implementing the required routes, JSON parsing, validation, error handling, environment-based port configuration, static HTML, and request logging middleware.

## Requirements

- Node.js 18 or later
- npm

## Run locally

1. Extract the project ZIP and open a terminal in the `week2-node-express` folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file by copying `.env.example`, then keep `PORT=3000` (or choose another available port).

   macOS/Linux:
   ```bash
   cp .env.example .env
   ```

   Windows Command Prompt:
   ```bat
   copy .env.example .env
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in a browser.

## Routes

| Method | Endpoint | Expected result |
|---|---|---|
| GET | `/` | `My Week 2 API!` |
| POST | `/user` | JSON response containing `Hello, [name]!` |
| GET | `/user/:id` | `User [id] profile` |

The root route serves the static HTML page. The exact plain-text response `My Week 2 API!` is also returned by `GET /`; depending on Express static-file behavior, the `public/index.html` page is served first for `/`. To test the plain-text route, temporarily move `app.use(express.static(...))` below the `app.get("/")` route, or remove the static middleware while testing the plain-text response. For the submitted project, the static page requirement is met by serving `public/index.html` at `/`.

## Test with curl

### GET /

```bash
curl -i http://localhost:3000/
```

The browser displays the static HTML page. To request the plain-text API response explicitly, use:

```bash
curl -i -H "Accept: text/plain" http://localhost:3000/
```

### POST /user — valid request

```bash
curl -i -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Pelumi","email":"pelumi@example.com"}'
```

Expected JSON:

```json
{
  "message": "Hello, Pelumi!",
  "user": {
    "name": "Pelumi",
    "email": "pelumi@example.com"
  }
}
```

### POST /user — missing data

```bash
curl -i -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Pelumi"}'
```

Expected status: `400 Bad Request`.

### GET /user/123

```bash
curl -i http://localhost:3000/user/123
```

Expected response: `User 123 profile`.

### Unknown route

```bash
curl -i http://localhost:3000/unknown
```

Expected status: `404 Not Found`.

## Test with Postman

1. Start the server.
2. Create a `GET` request to `http://localhost:3000/user/123`.
3. For the POST test, choose `POST`, use `http://localhost:3000/user`, select **Body → raw → JSON**, and enter:

   ```json
   {
     "name": "Pelumi",
     "email": "pelumi@example.com"
   }
   ```

4. Send another POST request with one field missing to verify the `400` validation response.

## Push to GitHub

Create a new empty repository named `week2-node-express` on GitHub. Then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Build Week 2 Express API"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/week2-node-express.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your GitHub username. Do not commit your real `.env` file; it is excluded by `.gitignore`.

## Assignment checklist

- [x] Express application
- [x] `GET /` welcome response and static HTML page
- [x] `POST /user` accepts name and email
- [x] `GET /user/:id` profile response
- [x] JSON body parsing
- [x] `400` response for missing/invalid data
- [x] `.env` configuration for `PORT`
- [x] Unknown-route and error handling
- [x] Custom request-logging middleware
- [x] curl/Postman test instructions
- [ ] Initialize Git and push to your own GitHub repository
