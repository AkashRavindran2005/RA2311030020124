
const BASE_URL = "http://20.207.122.201/evaluation-service";

async function getToken() {
  const authRes = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "ra9650@srmist.edu.in",
      name: "R Akash",
      rollNo: "RA2311030020124",
      accessCode: process.env.ACCESS_CODE,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  });

  const authData = await authRes.json();

  console.log("TOKEN:", authData.access_token);

  return authData.access_token;
}

async function sendLog(token, level, message) {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: "frontend",
        level: level,
        package: "api",
        message: message
      })
    });
  } catch (err) {
    console.error("Log failed:", err.message);
  }
}

async function fetchNotifications(token) {
  await sendLog(token, "info", "Fetching notifications started");

  try {
    const response = await fetch(`${BASE_URL}/notifications`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();

    await sendLog(token, "info", "Notifications fetched successfully");

    return data.notifications;

  } catch (err) {
    await sendLog(token, "error", `Fetch failed: ${err.message}`);
    throw err;
  }
}

async function getTopNotifications(token, notifications) {
  const priority = {
    Placement: 3,
    Event: 2,
    Result: 1
  };

  const sorted = [...notifications].sort((a, b) => {
    const typeA = a.type || a.Type;
    const typeB = b.type || b.Type;

    if (priority[typeB] !== priority[typeA]) {
      return priority[typeB] - priority[typeA];
    }

    const timeA = new Date(a.timestamp || a.Timestamp);
    const timeB = new Date(b.timestamp || b.Timestamp);

    return timeB - timeA;
  });

  const top10 = sorted.slice(0, 10);

  await sendLog(token, "info", "Sorting completed");

  return top10;
}

async function main() {
  const token = await getToken();

  try {
    const notifications = await fetchNotifications(token);

    const top10 = await getTopNotifications(token, notifications);

    console.log("Top 10 Notifications:");
    console.log(JSON.stringify(top10, null, 2));

  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();