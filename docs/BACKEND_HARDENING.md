# DAWALINK backend hardening plan

## Migration
`001_security_and_audit_foundation.sql` adds tables for pharmacy portal identities, administrator identities, reservation lifecycle events and audit events, plus indexes. Review and apply in staging first.

## Critical safeguards before real patient data
- Authentication: password hashing (Argon2id or bcrypt), verified email/phone, rate limiting, short-lived sessions and secure refresh tokens.
- Authorization: pharmacy users limited to their own pharmacy; verifier/admin roles separated; no shared bearer token.
- Pharmacy verification: pending by default, document review, pharmacist and licence validation; audit every approval.
- Reservation lifecycle: REQUESTED → ACCEPTED/DECLINED → READY/COMPLETED/CANCELLED as permitted; record actor, timestamp and event history.
- Privacy: minimize patient data; encrypt transport; protect sensitive fields at rest; define retention/deletion and access logging; DPIA and ODPC compliance review.
- Prescription handling: only pharmacist review, encrypted upload, strict access and retention; do not add upload until secure storage and safeguards are designed.
- API safety: rate limits, input validation, CSRF considerations for cookie sessions, secure headers, dependency updates, backup/restore testing.
- Environment: use Render secret environment variables; never commit credentials.
- Data: demo seed values must be labelled as fictitious; no real patient records in demo mode.

## Current limitation
The existing API includes a single shared partner token and demo/in-memory fallback. This is not sufficient for a production pharmacy network or patient-data use. These additions are groundwork, not a claim that the platform is compliant or production-ready.
