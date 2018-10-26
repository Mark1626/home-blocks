import { Store } from 'svelte/store.js';
import API from '../utils/api.js';
import Quotes from '../../public/assets/quotes.json';
import Ideas from '../../public/assets/ideas.json';

class HomePageStore extends Store {
  constructor(state) {
    super(state);
  }

  async init() {
    const sites = await API.getSites();
    this.set({sites: sites});
  }

  updateSite(idx, property, value) {
    this.get().sites[idx][property] = value;
  }

  saveSites(){
    API.saveSites(JSON.parse(JSON.stringify(this.get().sites)));
  }
}

var quotes = Quotes.quotes;
var images = Ideas.ideas.images;
var genres = Object.keys(quotes);
var genre = genres[Math.floor(Math.random() * genres.length)];
var selected_quotes = quotes[genre];
// var quote = selected_quotes[Math.floor(Math.random() * selected_quotes.length)];

const store = new HomePageStore({
  sites: [],
  idea: {
    imgLink: images[Math.floor(Math.random() * images.length)]
  },
  quote: selected_quotes[Math.floor(Math.random() * selected_quotes.length)],
  config: false,
  quickConfig: false,
  showConfig: true,
  quickConfigIdx: -1,
  quickConfigSite: {}
});

store.init();

export default store;
