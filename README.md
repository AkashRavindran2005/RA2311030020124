# Notification Processing System (Frontend)

## Overview

This project implements the logic for processing notifications from a protected API and extracting the **top 10 most relevant notifications** based on priority and recency.

---

## Problem Statement

Given a stream of notifications from an API, the system must:

* Fetch notifications securely using authentication
* Prioritize them based on type
* Sort them based on recency
* Return the top 10 most important notifications

---

## Priority Logic

Notifications are ranked using the following rules:

1. **Type Priority**

   * Placement (highest)
   * Event
   * Result (lowest)

2. **Recency**

   * Newer notifications are ranked higher within the same type

---

## Approach

1. Fetch notifications from the API using a Bearer token
2. Normalize incoming data fields (handles API inconsistencies)
3. Sort notifications:

   * First by type priority
   * Then by timestamp (latest first)
4. Extract the top 10 results
5. Log key steps using the logging API

---

## Logging

A lightweight logging function is implemented to send logs to the server.

Logs are generated for:

* Start of data fetch
* Successful fetch
* Sorting completion
* Error handling

---

## Running the Project

1. Install dependencies:

```bash id="j9n2yc"
npm install
```

2. Run the script:

```bash id="ztq3b1"
node index.js
```

---

## Environment Variables

Sensitive credentials are not hardcoded.

Create a `.env` file:

```env id="nfsj0d"
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
ACCESS_CODE=your_access_code
```

---

## Output

The system prints the top 10 notifications in sorted order.

Example:

![Top Notifications](./screenshots/image.png)

---

## Key Points

* No database or storage is used
* No hardcoded notification data
* Handles API inconsistencies (case differences in fields)
* Clean and minimal implementation
