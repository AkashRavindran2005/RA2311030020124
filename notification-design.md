# Notification System Design

## Objective

The goal of this system is to process notifications fetched from a protected API and identify the top 10 most relevant notifications based on priority and recency.

---

## Data Source

Notifications are retrieved from an external API endpoint using Bearer token authentication.
Each notification contains:

* ID
* Type (Placement, Event, Result)
* Message
* Timestamp

---

## Core Logic

### 1. Priority-Based Ranking

Each notification type is assigned a priority:

* Placement → 3
* Event → 2
* Result → 1

This ensures that more important notifications are always considered first.

---

### 2. Recency Handling

Within the same priority level, notifications are sorted based on timestamp:

* Newer notifications are ranked higher
* Sorting is done using descending order of time

---

### 3. Sorting Strategy

A combined sorting approach is used:

* First compare priority
* If priority is equal, compare timestamps

This ensures correct ordering across all conditions.

---

### 4. Top 10 Selection

After sorting, only the first 10 notifications are selected using array slicing.

---

## Logging Strategy

A logging function is implemented to track key system actions.

Logs are sent to the logging API with:

* stack: frontend
* level: info / error
* package: api

### Logged Events

* Start of notification fetch
* Successful API response
* Sorting completion
* Error scenarios

---

## Handling API Inconsistencies

The API response uses capitalized keys (e.g., `Type`, `Timestamp`).
To ensure robustness, the implementation normalizes fields dynamically during processing.

---

## Handling Continuous Updates

Since notifications may update over time, the system is designed to support re-fetching:

* The fetch function can be called periodically (polling)
* Each fetch recalculates the top 10 notifications
* This ensures the output remains up to date

---

## Design Decisions

* No database used (as per constraints)
* No hardcoded data
* Simple sorting instead of complex structures (sufficient for small dataset)
* Minimal abstraction for readability and clarity

---


## Conclusion

The system provides a clean and efficient way to process and prioritize notifications using simple logic while maintaining correctness and adherence to constraints.
