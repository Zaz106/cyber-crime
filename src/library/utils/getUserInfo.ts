export interface UserInfo {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lon: number;
    timezone: string;
  };
  isp: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timestamp: string;
}

// Cache to prevent multiple API requests
let cachedUserInfo: UserInfo | null = null;
let isLoading = false;
let loadingPromise: Promise<UserInfo> | null = null;

export async function getUserInfo(): Promise<UserInfo> {
  // Return cached data if available and less than 5 minutes old
  if (cachedUserInfo && 
      new Date().getTime() - new Date(cachedUserInfo.timestamp).getTime() < 5 * 60 * 1000) {
    return cachedUserInfo;
  }

  // If already loading, return the same promise to prevent multiple requests
  if (isLoading && loadingPromise) {
    return loadingPromise;
  }

  isLoading = true;
  loadingPromise = fetchUserInfoFromAPI();

  try {
    const result = await loadingPromise;
    cachedUserInfo = result;
    return result;
  } finally {
    isLoading = false;
    loadingPromise = null;
  }
}

async function fetchUserInfoFromAPI(): Promise<UserInfo> {
  try {
    // Get IP and location information using ipapi.co (more reliable for production)
    const ipResponse = await fetch('https://ipapi.co/json/');
    const ipData = await ipResponse.json();
    
    // Get additional browser information
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    const screenResolution = `${screen.width}x${screen.height}`;
    const timestamp = new Date().toISOString();

    return {
      ip: ipData.ip || 'Unknown',
      location: {
        country: ipData.country_name || 'Unknown',
        region: ipData.region || 'Unknown', 
        city: ipData.city || 'Unknown',
        lat: ipData.latitude || 0,
        lon: ipData.longitude || 0,
        timezone: ipData.timezone || 'Unknown'
      },
      isp: ipData.org || 'Unknown',
      userAgent,
      language,
      platform,
      screenResolution,
      timestamp
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    // Return fallback data
    return {
      ip: 'Unable to detect',
      location: {
        country: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        lat: 0,
        lon: 0,
        timezone: 'Unknown'
      },
      isp: 'Unknown',
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString()
    };
  }
}
