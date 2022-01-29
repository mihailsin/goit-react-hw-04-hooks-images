import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '24271792-2ae9c4be49492e469cc4e2f34';
const REQUEST_PARAMS = 'image_type=photo&orientation=horizontal&per_page=10';

const fetchPictures = async (searchQuery, page) => {
  const response = await axios({
    method: 'get',
    url: `?key=${KEY}&q=${searchQuery}&page=${page}&${REQUEST_PARAMS}`,
  });
  const hits = response.data.hits;
  const totalHits = response.data.totalHits;
  const data = { hits, totalHits };
  return data;
};

export default fetchPictures;
