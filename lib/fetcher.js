export async function fetcher(url) {
  try {
    console.log('fetching', url);

    const response = await fetch(new URL(url, window.location.origin).href)


    //const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('logging fetch data');
    const json = await response.json();

    console.log('returning json data')
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
