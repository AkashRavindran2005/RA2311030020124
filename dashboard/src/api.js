const BASE_URL = "/api";

const AUTH_BODY = {
  email: "ra9650@srmist.edu.in",
  name: "R Akash",
  rollNo: "RA2311030020124",
  accessCode: "QkbpxH",
  clientID: "a28c135e-2922-41c8-9c2b-c5ef447deea0",
  clientSecret: "BSgDuGzaJjVhUrDn"
};

let cachedToken = null;

export async function getToken() {
  if (cachedToken) return cachedToken;

  const res = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(AUTH_BODY)
  });

  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);

  const data = await res.json();
  cachedToken = data.access_token;
  return cachedToken;
}

export async function sendLog(token, level, message) {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: "frontend",
        level,
        package: "api",
        message
      })
    });
  } catch (err) {
    console.error("Log failed:", err.message);
  }
}

export async function fetchNotifications(token) {
  await sendLog(token, "info", "Fetching notifications started");

  const res = await fetch(`${BASE_URL}/notifications`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!res.ok) {
    await sendLog(token, "error", `Fetch failed: ${res.status}`);
    throw new Error(`API error ${res.status}`);
  }

  const data = await res.json();
  await sendLog(token, "info", "Notifications fetched successfully");

  return data.notifications || data;
}

export function sortNotifications(notifications) {
  const priority = { Placement: 3, Event: 2, Result: 1 };

  return [...notifications].sort((a, b) => {
    const typeA = a.type || a.Type;
    const typeB = b.type || b.Type;

    if (priority[typeB] !== priority[typeA]) {
      return (priority[typeB] || 0) - (priority[typeA] || 0);
    }

    const timeA = new Date(a.timestamp || a.Timestamp);
    const timeB = new Date(b.timestamp || b.Timestamp);
    return timeB - timeA;
  });
}
