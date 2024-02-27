export const getWeatherData = async (apiUrl: string): Promise<any> => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
