import axios from 'axios';

const API_SOURCE = 'https://pixabay.com/api/';
const API_KEY = '30951903-ffa881e7e59a7b1cacd7ea887';

// Fetch func.
export async function fetchPhoto(serchRequest, photoColection) {
  try {
    const response = await axios.get(API_SOURCE, {
      params: {
        key: `${API_KEY}`,
        q: `${serchRequest}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: photoColection,
      },
    });
    return response;    
  } catch (error) {
    console.error(error);
  }
}