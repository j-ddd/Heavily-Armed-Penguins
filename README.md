# H.A.P. (Heavily Armed Penguins)

A web-based tool for hardening Red Hat Enterprise Linux machines. An admin builds a security template from STIG-based checks in a web dashboard, picks the target machines, and the template gets deployed to those machines over SSH.

Built as a three-person team project at the University of Tennessee, Knoxville (Spring 2024).

> This was originally a private repo. I cloned it and made it public for posterity's sake, so the commit history starts fresh.

## How it works

1. An admin logs into the React dashboard (JWT-based auth).
2. From the dashboard, the admin manages users, target machines, and security templates, all stored in MongoDB through the Node.js/Express API.
3. The admin builds a security template by picking which STIG checks to apply, then chooses the machines to deploy it to.
4. The web app hands the template and machine list to the C++ client.
5. The C++ client translates the template into a bash script and runs it on each target machine over SSH (libssh).

## My role

I was the sole developer of the web application: the Node.js/Express API, the MongoDB data models, the React admin dashboard, and the template builder and deployment flow that hands work off to the C++ client. My two teammates built the C++ client that translates templates and deploys them over SSH.

## Tech stack

- **Frontend:** React, Redux, Material UI (built on the React Material Admin template)
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt (auth scaffolding started from a MERN auth starter)
- **Deployment client:** C++, libssh, bash

## Project structure

```
server2.3/
  backend/    Express API: routes, controllers, models, auth middleware
  frontend/   React admin dashboard
client/       C++ template translation and SSH deployment
  scripts/    Individual STIG check scripts (named by STIG ID)
```

## Running it locally

You'll need Node.js, Yarn, and a local MongoDB instance.

**Backend**
```
cd server2.3/backend
cp .env.example .env    # then set MONGO_URI, MONGO_DB_NAME, and JWT_SECRET
yarn install
yarn dev
```

**Frontend**
```
cd server2.3/frontend
cp .env.example .env
yarn install
yarn start
```

The C++ client needs libssh installed and is built separately from `client/`.

## Known issues

This was a one-semester project, so there are rough edges I'd handle differently today:

- Users created from the admin dashboard have their password saved as plain text. The signup route hashes with bcrypt, but the admin create route doesn't. The fix is to hash in the create route the same way, or with a pre-save hook on the user model.
- Some leftover test and scratch files are still in the repo.

## Original scope notes

These are the planning notes from when we were scoping which configuration checks to support.

#### Configuration to be Accessed
Linux Security Features
Get the initial configuration of the system for admin to inspect and compare

Port Whitelist
Admin, Service, User passwords get flagged if insecure, 15 character minimum, investigate /etc/shadow
Enable Services
Disable/Remove Services
SELinux interaction
save lists of current processes, listening ports, services, device drivers, user accounts, and all files ("dir /s /b" or "ls —lARt"), use a checksum to compare
Linux operating system must be configured so that the SSH daemon does not allow authentication using an empty password.
Account password cannot be blank
Package Installed/Uninstalled
SNMP Community strings changed from default
Cryptographic hash of system commands, compare to vendor values
Only allow SSHv2
Get file permissions, ownership, group values and make sure matches vendor values
Get account permissions, configure so root only has access
CTRL-ALT-DLT graphically/CLI disabled capability
Require authentication to boot in maintenance mode
Prevent software not digitally signed from being installed
Get file names, delete files

All these must be options to an admin:
https://www.stigviewer.com/stig/red_hat_enterprise_linux_7/
