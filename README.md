# Giridharan M — Portfolio

A modern, responsive portfolio with persistent light and dark themes, built
with React (Vite) on the front end and a small Express + Nodemailer backend
for the contact form. No database is used anywhere in this project.

```
portfolio/
├── client/     React + Vite frontend
├── server/     Express backend (contact form → email via Nodemailer)
└── README.md
```

## Tech stack

**Frontend:** React, Vite, React Three Fiber / Three.js (lightweight 3D),
Framer Motion, Lucide icons, plain CSS (no UI framework).

**Backend:** Node.js, Express, Nodemailer, dotenv, CORS.

## 1. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

## 2. Configure environment variables

Copy the example files and fill in real values:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

`client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

For the deployed Vercel frontend, set `VITE_API_URL` to
`https://giridharan-portfolio-api.onrender.com/api` in the Vercel project
environment settings, then redeploy the frontend.

`server/.env`
```
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_smtp_email@gmail.com
SMTP_PASSWORD=your_smtp_app_password
CONTACT_EMAIL=murugasangiridharan@gmail.com
CLIENT_URL=http://localhost:5173
```

### Setting up SMTP (Gmail example)

1. Enable 2-Step Verification on the Google account you want to send from.
2. Create an "App password" for that account (Google Account → Security →
   App passwords).
3. Use that 16-character app password as `SMTP_PASSWORD` — never your
   normal Gmail password.
4. `SMTP_USER` is the sending address; `CONTACT_EMAIL` is where messages
   are delivered (it can be the same address, or a different one).

Any other SMTP provider (Outlook, Zoho, SendGrid SMTP, etc.) works the
same way — just change `SMTP_HOST` and `SMTP_PORT` accordingly.

## 3. Add your resume

Place your PDF at:

```
client/public/resume/GiridharanM.pdf
```

The "Download Resume" buttons already point at `/resume/GiridharanM.pdf`.

## 4. Run locally

Backend:
```bash
cd server
npm run dev
```

Frontend (separate terminal):
```bash
cd client
npm run dev
```

Visit `http://localhost:5173`. Submitting the contact form sends a POST
request to `http://localhost:5000/api/contact`, which emails you via
Nodemailer.

## 5. Project structure (frontend)

```
client/src/
├── components/     One component + one CSS file per UI section
├── data/
│   └── portfolioData.js   ← Edit this file to change all text/links/content
├── hooks/
│   └── useMediaQuery.js   Used to simplify 3D scenes on mobile
├── App.jsx
├── main.jsx
└── index.css        Design tokens (colors, fonts, spacing) + globals
```

Almost everything you'd want to personalize (name, links, skills,
projects, experience) lives in `client/src/data/portfolioData.js` — you
shouldn't need to touch the components themselves for content changes.

## 6. Visual features

- The Hero uses a portrait with floating technology icons and a compact
  personal profile layout on small screens.
- The "Building Ideas Into Reality" section presents project and profile
  artwork in a responsive monitor-and-phone composition. Its desktop scene
  uses React Three Fiber with pointer and scroll interaction.
- The theme control is fixed on the right, and the selected light/dark theme
  is saved in browser storage.
- Motion respects the user's reduced-motion preference where applicable.

## 7. Deployment

**Frontend (Vercel or Netlify):**
1. Push this repo to GitHub.
2. Import the `client` folder as the project root in Vercel/Netlify.
3. Build command: `npm run build` — Output directory: `dist`.
4. Set `VITE_API_URL` to `https://giridharan-portfolio-api.onrender.com/api`
   in Vercel's project environment settings, then redeploy.

**Backend (Render or similar):**
1. Import the `server` folder as the project root.
2. Build command: `npm install` — Start command: `npm start`.
3. Set the environment variables from `server/.env.example` in the
   host's dashboard (never commit the real `.env` file).
4. Set `CLIENT_URL` to the exact deployed frontend origin (scheme + hostname,
   no path), for example `https://your-portfolio.vercel.app`, so CORS allows it.

After both are deployed, redeploy the frontend once `VITE_API_URL` points
at the live backend.

## Notes

- No database is used anywhere — contact messages are emailed directly
  and never stored.
- SMTP credentials only ever live in `server/.env` and are never sent to
  or exposed in the frontend.
- Design inspiration (layout/flow only — no code, assets or text reused)
  came from a reference developer portfolio; all copy, styling and
  components here are original.
