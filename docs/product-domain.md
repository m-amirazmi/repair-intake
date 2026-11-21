# Product and Domain

## Purpose

Repair Intake is a multi-outlet smartphone repair management system for repair shops.

Its MVP is intended to help shops:

- Register shops and their first outlet.
- Record customer repair intake and device details.
- Manage repair parts and catalogs.
- Assign and track repairs.
- Let outlet managers operate their outlet.
- Let shop owners and administrators view shop-wide performance.
- Communicate repair status and quotations through WhatsApp.
- Capture before-and-after photos and videos.

## Accounts and Organizations

### Account

An Account is an authenticated person using the SaaS.

Account types include:

- Shop Owner
- Shop Admin
- Outlet Manager
- Technician
- Front Desk
- Customer
- Platform Admin
- System Admin

Platform Admin and System Admin belong to the SaaS owner and team, rather than to a shop.

### Shop

A Shop is the repair shop organization that owns one or more outlets.

The person who registers the Shop is its initial Shop Owner. A Shop Owner represents the organization at the highest shop level.

### Outlet

An Outlet is an operational location belonging to a Shop.

An outlet can have one of these roles:

- **HQ only:** The outlet is the Shop's headquarters but not currently operational.
- **HQ and operational:** The outlet is both headquarters and an operational repair location.
- **Operational only:** The outlet is an operational location but not headquarters.

HQ rules:

- A Shop can have only one HQ outlet.
- The first outlet created by a Shop is both HQ and operational.
- Once a Shop has more than one outlet, the Shop Owner may set the HQ as non-operational.
- An operational outlet cannot become HQ.

Outlet Manager responsibilities include:

- Repair intake
- Outlet repair inventory
- Outlet catalog
- Staff and technician availability
- Outlet repair operations

Shop Owners and Shop Admins can add outlets, view outlet performance, manage shop-level catalogs, and access high-level shop operations.

## Registration and Onboarding

1. A new user visits `/register`.
2. The user registers with email/password or Google authentication.
3. Registration creates the Account and Shop Owner membership.
4. The Shop Owner is redirected to `/shop/onboarding`.
5. The onboarding step creates the first outlet.
6. The first outlet is created as the Shop HQ and operational outlet.
7. Trial billing starts only after the first outlet has been created successfully.
8. The Shop Owner is redirected into the Shop workspace.

`/login` authenticates existing Accounts. It is separate from `/register`, and both eventually lead to the appropriate authenticated workspace.

## Authentication Implementation

The MVP uses Neon Managed Better Auth:

- `/register` is public and supports email/password and Google registration.
- `/login` is public and supports email/password and Google sign-in.
- `/api/auth/[...path]` proxies Managed Auth API requests.
- `/shop/onboarding` and `/shop/*` are protected authenticated workspaces.
- Signed-out requests to protected routes redirect to `/login`.
- Neon Auth owns Account identities, passwords, OAuth accounts, and sessions.
- Shop, outlet, membership, and trial data are stored in application tables in the same Neon database.
- The registering Account does not create a Shop or outlet until `/shop/onboarding` is completed.
- The exact Google OAuth provider credentials and trusted app domains are environment or Neon project configuration.

## Trial

The MVP starts with a 14-day trial. It includes:

- Exactly one outlet.
- A limit of 1,000 automated outbound WhatsApp messages.

The trial ends at whichever comes first:

1. 14 calendar days have elapsed since the first outlet was created.
2. 1,000 automated outbound WhatsApp messages have been sent.

Incoming customer messages do not count toward the automated outbound message limit.

The trial limit must be enforced by server-side rules and tested before charging or activating paid plans.

## Planned WhatsApp Flow

The final customer communication flow is expected to include:

- A QR receipt printed during repair intake.
- A WhatsApp conversation initiated from the QR receipt.
- Automatic opt-in for repair notifications.
- Technician and repair status notifications.
- Customer quotations with proceed or decline choices.
- Before-and-after photos or videos when a customer has opted in.
- Automated notifications for significant repair status updates.

## MVP Roles

The complete role-to-access matrix is intentionally not finalized yet. The following responsibilities guide the initial domain model:

| Role | Intended scope |
| --- | --- |
| Platform/System Admin | SaaS-level shop and account administration |
| Shop Owner | Shop-wide administration and high-level outlet oversight |
| Shop Admin | Shop-wide administration and catalog or outlet management |
| Outlet Manager | Day-to-day management of one outlet |
| Technician | Assigned repairs and status updates |
| Front Desk | Repair intake and customer-facing processing |
| Customer | Repair progress and quotation interactions |

The exact permissions for each role should be added here once the role matrix is approved.

## Documented MVP Decisions

- Authentication comes before the first operational feature.
- Registration collects account credentials, not business or outlet details.
- Account, Shop, Outlet, and Membership are separate domain concepts.
- `/shop/onboarding` creates the first outlet.
- A Shop has one HQ maximum.
- A one-outlet Shop uses its HQ as an operational outlet.
- A multi-outlet Shop can set the HQ as non-operational.
- The first outlet must exist before the trial starts.
- The initial trial lasts 14 days or 1,000 automated outbound WhatsApp messages, whichever occurs first.
- The initial plan allows only one outlet.
- Outlet limits and trial rules must be enforced server-side, not only in the interface.
