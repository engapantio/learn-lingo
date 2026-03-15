# LearnLingo 🌍

A full-stack language tutor platform built with **React Router v7** (SSR), **Firebase**, and
**Tailwind CSS**. Browse qualified language teachers, filter by language, level, and price, and save
your favourites — all with real-time data and authenticated sessions.

🔗 **Live Demo:** https://harmonious-starlight-bbbc25.netlify.app

---

## Features

- 🏠 **Home Page** – Company overview and direct CTA to the Teachers catalogue
- 👩‍🏫 **Teachers Page** – Browse tutors with filters by teaching language, student level, and price
  per hour
- ❤️ **Favorites Page** – Private page showing bookmarked tutors (requires login)
- 🔐 **Authentication** – Register / Login via Firebase Auth with form validation
- 🔥 **Real-time data** – Teacher data served from Firebase Realtime Database
- 📱 **Responsive** – Mobile-first design with Tailwind CSS v4

---

## Tech Stack

| Layer           | Technology                           |
| --------------- | ------------------------------------ |
| Framework       | React Router v7 (framework/SSR mode) |
| Build tool      | Vite v7                              |
| Language        | TypeScript                           |
| Styling         | Tailwind CSS v4                      |
| Auth & Database | Firebase (Auth + Realtime Database)  |
| Forms           | React Hook Form + Yup                |
| Notifications   | React Hot Toast                      |
| Deployment      | Netlify (Serverless Functions)       |

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- npm `>=10`
- Firebase project with Realtime Database and Authentication enabled

### Installation

````bash
git clone https://github.com/engapantio/learn-lingo.git
cd learn-lingo
npm install

Environment Variables

Create a .env file in the project root:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

Development
```bash
npm run dev

Production Build
```bash
npm run build
npm start

Deployment (Netlify)
The app deploys automatically on push to main. Netlify detects React Router v7 via @netlify/vite-plugin-react-router and bundles SSR into a serverless function.


Project Structure

learn-lingo/
├── app/
│   ├── components/       # Reusable UI components
│   ├── routes/           # React Router file-based routes
│   ├── services/         # Firebase config and context providers
│   └── root.tsx          # App root layout
├── public/               # Static assets
├── netlify.toml
├── vite.config.ts
└── package.json

Scripts
Command	Description
npm run dev	Start dev server with HMR
npm run build	Production build (client + SSR)
npm start	Serve SSR build locally
npm run typecheck	Run TypeScript type checking

Author
Engapantio – @engapantio

***
````
