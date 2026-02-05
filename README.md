# Backend -- Timezone & Timeslot Management

## Overview

This backend provides a production‑ready Node.js + Express + TypeScript
API for managing **UTC‑based timeslots** and **timezone metadata**.

The architecture focuses on:

-   Safe MongoDB connection lifecycle
-   Centralized error handling
-   Clean layered structure
-   Strong environment validation
-   Graceful shutdown in production

------------------------------------------------------------------------

# Tech Stack

-   **Node.js**
-   **Express**
-   **TypeScript**
-   **MongoDB + Mongoose**
-   **envalid** for environment validation
-   **dotenv** for local environment loading
-   **Morgan** for HTTP request logging

------------------------------------------------------------------------

# Project Structure

    src
     ├─ config
     │   ├─ env.ts          → validated environment configuration
     │   └─ mongodb.ts      → safe MongoDB connection manager
     │
     ├─ controllers         → request handlers (no business logic)
     ├─ services            → business logic & DB interaction
     ├─ routes              → Express route definitions
     ├─ models              → Mongoose schemas
     ├─ types               → shared TypeScript types
     ├─ utils
     │   └─ catchAsync.ts   → async error wrapper
     │
     ├─ app.ts              → Express app & middleware
     └─ server.ts           → server bootstrap & shutdown

### Architectural Principle

**Controller → Service → Model**

-   Controllers handle HTTP only\
-   Services contain business logic\
-   Models interact with database

This separation improves:

-   testability
-   maintainability
-   scalability

------------------------------------------------------------------------

# Environment Safety

Environment variables are validated at startup using **envalid**.

Required variables:

-   `MONGODB_URI`
-   `PORT`
-   `FRONTEND_URL`
-   `NODE_ENV`

If any required variable is missing or invalid:

➡ **Application crashes immediately**\
➡ Prevents silent production failures

------------------------------------------------------------------------

# MongoDB Connection Safety

The MongoDB layer includes:

### Global connection cache

Prevents multiple connections during:

-   development reloads
-   serverless reuse
-   testing

### Startup blocking

Server **does not start** until DB connects successfully.

### Graceful shutdown

On `SIGINT` or `SIGTERM`:

1.  Close DB connection\
2.  Close HTTP server\
3.  Exit cleanly

Prevents:

-   corrupted writes
-   hanging connections
-   memory leaks

------------------------------------------------------------------------

# Error Handling Strategy

## Async wrapper

`catchAsync` ensures:

-   rejected promises go to Express error middleware
-   no unhandled promise crashes
-   clean controller code

## Centralized handling

All runtime errors flow through **one middleware layer**, making logging
and response formatting consistent.

------------------------------------------------------------------------

# Logging

### Morgan (HTTP logs)

Logs:

-   method
-   route
-   status
-   response time
-   IP

Used for:

-   debugging
-   monitoring traffic
-   detecting failures

------------------------------------------------------------------------

# Timezone & Timeslot Rules

### Storage

All timestamps are stored strictly in **UTC**.

### Conversion

Timezone conversion is handled **only in frontend** using IANA
identifiers.

Backend never:

-   stores local time
-   performs offset math
-   depends on browser timezone

This guarantees **global correctness**.

------------------------------------------------------------------------

# Running the Backend

## Install

    npm install

## Development

    npm run dev

## Build

    npm run build

## Production start

    npm start

------------------------------------------------------------------------

# Production Safety Features

-   Strict TypeScript configuration
-   Environment validation at startup
-   Safe MongoDB lifecycle management
-   Centralized async error handling
-   Graceful shutdown signals
-   Clean layered architecture

These patterns match **real SaaS backend standards**.

------------------------------------------------------------------------

# Author Note

This backend is intentionally designed to demonstrate:

-   production‑safe Node.js architecture
-   correct timezone handling
-   clean separation of concerns
-   interview‑ready engineering quality
