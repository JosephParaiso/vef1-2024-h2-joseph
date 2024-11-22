export async function fetcher(url) {
  try {
    console.log("fetching", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
