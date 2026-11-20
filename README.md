# DAWALINK Kenya
Patient-first medicine access platform: search participating pharmacy listings, compare pharmacy-reported prices/availability, and request reservations.

## MVP
- Patient medicine search and pharmacy listings
- Reservation requests (pharmacy must confirm)
- Pharmacy partner application (pending verification)
- Pharmacy stock update dashboard
- Admin verification queue
- PostgreSQL persistence when DATABASE_URL is configured; demo mode otherwise

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
Open http://localhost:4000.

## Safety and regulatory boundary
This is an MVP prototype, not an approved online pharmacy or production-ready health-data system. Pharmacy listings are published only after manual verification. Stock is pharmacy-reported and timestamped. A reservation request is not a confirmed order. Prescription-only medicines require review by the pharmacy's appropriately licensed pharmacist. The app does not diagnose, prescribe, recommend treatment, give dosage instructions or authorize substitutions.

Before live patient transactions: obtain written PPB classification and confirm each pharmacy's licence scope; check Digital Health Agency certification requirements; complete ODPC registration and DPIA/privacy work as applicable; implement authentication, role/org access control, audit trails, encryption, secure prescription handling, incident response and security testing. Do not upload real prescriptions or patient records to this prototype.

## Deploy
A Render service can build with `npm install` and start with `npm start`. Set `DATABASE_URL` to a managed PostgreSQL connection string for persistent data. Without it, the app runs in demo mode with in-memory data that resets on restart.
