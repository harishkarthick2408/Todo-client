# TaskFlow Client

## Description
React + Vite frontend for TaskFlow. Uses Firebase Google Authentication and Tailwind CSS for styling.

## Tech Stack
- React
- Vite
- Firebase Auth (Google Sign-In)
- Tailwind CSS
- Axios

## Setup
1. Install dependencies:
   - `npm install`
2. Create `.env` using the template below.
3. Start the dev server:
   - `npm run dev`

## Environment Variables
| Variable | Description |
| --- | --- |
| VITE_FIREBASE_API_KEY | Firebase web app API key |
| VITE_FIREBASE_AUTH_DOMAIN | Firebase auth domain |
| VITE_FIREBASE_PROJECT_ID | Firebase project ID |
| VITE_FIREBASE_STORAGE_BUCKET | Firebase storage bucket |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase messaging sender ID |
| VITE_FIREBASE_APP_ID | Firebase app ID |
| VITE_API_BASE_URL | Backend API base URL |

## Assumptions and Decisions
- No admin role or role-based access is used.
- Each task belongs to the authenticated user by Firebase `uid`.
- Tasks can be created and updated only; deletion is out of scope.
- No due dates, priorities, or assignees are supported.
- Status can be changed freely between all states.
- Firebase ID token is sent in `Authorization: Bearer <token>`.

## Firebase Setup Note
1. Create a Firebase project at https://console.firebase.google.com.
2. Enable Google Sign-In under Authentication -> Sign-in methods.
3. Add `http://localhost:5173` as an authorized domain.
4. Copy the web app config into the `.env` file.

## .env Template
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_BASE_URL=http://localhost:5000/api
```
