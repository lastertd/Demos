import axios from "axios";

export const getJson = async (jsonUrl: string) => {
  try {
    const response = await axios.get(jsonUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${jsonUrl}:`, error);
    return null;
  }
};