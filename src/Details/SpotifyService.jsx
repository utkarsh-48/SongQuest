let accessToken = null; 
let tokenExpiryTime = 0;

// new token
export const getAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("❌ Missing Spotify API credentials in .env file!");
    return null;
  }

  // checks if token exists
  const currentTime = Date.now();
  if (accessToken && currentTime < tokenExpiryTime) {
    return accessToken;
  }

  // encoding 
  const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

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

    // Stores token 
    accessToken = data.access_token;
    tokenExpiryTime = Date.now() + data.expires_in * 1000 - 60000; // Refresh 1 min before expiry

    return accessToken;
  } catch (error) {
    console.error("❌ Error fetching access token:", error);
    return null;
  }
};

//  Trending SOng is fetched 
export const getTrendingTracks = async () => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/browse/new-releases?limit=18",
      {
        headers: { Authorization: `Bearer ${token}` },
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

//  song search
export const searchTracks = async (query) => {
  if (!query) return [];

  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=18`,
      {
        headers: { Authorization: `Bearer ${token}` },
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
