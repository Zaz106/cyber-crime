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

export async function getUserInfo(): Promise<UserInfo> {
  try {
    // Get IP and location information
    const ipResponse = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query');
    const ipData = await ipResponse.json();
    
    // Get additional browser information
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    const screenResolution = `${screen.width}x${screen.height}`;
    const timestamp = new Date().toISOString();

    return {
      ip: ipData.query || 'Unknown',
      location: {
        country: ipData.country || 'Unknown',
        region: ipData.regionName || 'Unknown', 
        city: ipData.city || 'Unknown',
        lat: ipData.lat || 0,
        lon: ipData.lon || 0,
        timezone: ipData.timezone || 'Unknown'
      },
      isp: ipData.isp || 'Unknown',
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
