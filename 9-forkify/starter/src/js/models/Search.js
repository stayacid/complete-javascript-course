import axios from 'axios';
import { url } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    // const key = 'gbdty456w3gsd64w6' no key is required
    try {
      const res = await axios(`${url}/search?&q=${this.query}`);
      this.result = res.data.recipes;
      // const { recipes } = res.data;
    } catch (error) {
      console.log('Get search error ', error);
    }
  }
}
