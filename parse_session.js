const url = "https://ais-dev-izgn6asodnyoxh6v5v4sq6-99492781531.europe-west2.run.app/?session=session-ohzte1a"
try {
  const u = new URL(url);
  console.log(u.searchParams.get("session") || url);
} catch (e) {
  console.log(url);
}
