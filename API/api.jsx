export async function fetchImage() {
    try {
      const response = await fetch("https://source.unsplash.com/random/500x300");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // No need to parse as JSON, return the image URL directly
      return response.url; // Unsplash provides the image URL in the 'response.url'
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      return null; // Fallback to null if there's an error
    }
  }
  