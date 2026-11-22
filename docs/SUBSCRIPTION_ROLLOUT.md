# DAWALINK subscription rollout

Offer: 30 days free, then EUR 10/month recurring until canceled. Show renewal date, price, cancellation instructions and explicit recurring consent before activation. Cancellation stops future renewal.

Billing architecture: authenticated user accounts; trial uniqueness enforced per account; server-side verification of Android/iOS purchase receipts; web payment provider with signed, idempotent webhook processing; backend entitlement checks; secrets in hosting environment; handling of failed renewals, grace periods, refunds, cancellation and restore purchases; privacy and consumer-law disclosures.

Status: price is shown in the web and mobile UI and a database schema foundation is included. Checkout, identity/account flows, provider setup, verified webhook handling, entitlement enforcement, and end-to-end testing are not yet complete. This does not enable live charges or production billing.
