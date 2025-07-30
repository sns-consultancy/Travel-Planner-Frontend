export async function summarizeResultsWithOpenAI(type, data) {
  try {
    const res = await fetch("http://localhost:8000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data })
    });

    if (!res.ok) throw new Error("Failed to summarize");
    const { summary } = await res.json();
    return summary;
  } catch (e) {
    console.error("OpenAI summarization error:", e.message);
    return "Unable to summarize results at the moment.";
  }
}
