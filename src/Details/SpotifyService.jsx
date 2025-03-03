export const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("❌ Missing Spotify API credentials in .env file!");
    return null;
  } //checks if Spotify API credentials are available

  const encodedCredentials = btoa(`${clientId}:${clientSecret}`); // Encodes the credentials
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Failed to get access token:", data);
      return null;
    }

    return data.access_token;
  } catch (error) {
    console.error("❌ Error fetching access token:", error);
    return null;
  }
};

// Trending songs are fetched before user searches
export const getTrendingTracks = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/browse/new-releases?limit=5`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await response.json();

    if (!data.albums || !data.albums.items) {
      console.error("❌ Error fetching trending tracks:", data);
      return [];
    }

    return data.albums.items.map((album) => ({
      name: album.name,
      artist: album.artists[0]?.name || "Unknown Artist",
      image: album.images[0]?.url || "",
    }));
  } catch (error) {
    console.error("❌ Error fetching trending tracks:", error);
    return [];
  }
};

// Searches for tracks
export const searchTracks = async (query) => {
  if (!query) return [];

  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await response.json();

    if (!data.tracks || !data.tracks.items) {
      console.error("❌ Error fetching search results:", data);
      return [];
    }

    return data.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists[0]?.name || "Unknown Artist",
      image: track.album.images[0]?.url || "",
    }));
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    return [];
  }
};
