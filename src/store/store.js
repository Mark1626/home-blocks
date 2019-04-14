import { Store } from 'svelte/store.js';
import API from '../utils/api.js';
import Quotes from '../../public/assets/quotes.json';

class HomePageStore extends Store {
  constructor(state) {
    super(state);
  }

  async init() {
    const sites = await API.getSites();
    this.set({sites: sites});
  }

  deleteSite(idx) {
    const sites = this.get().sites;
    // Retain the old color
    const deleteSiteColor = sites[idx].color;
    const newSitesList = [
      ...sites.slice(0, idx),
      {
        title: '',
        url: '',
        color: deleteSiteColor,
        character: '-'
      },
      ...sites.slice(idx+1)
    ];
    this.set({
      sites: newSitesList
    });
    this.saveSites(newSitesList);
  }

  updateSite(idx, property, value) {
    const sites = this.get().sites;
    sites[idx][property] = value;
    this.set({sites: sites});
  }

  saveSites(){
    API.saveSites(JSON.parse(JSON.stringify(this.get().sites)));
    this.set({sites: this.get().sites});
  }

  importSites(siteList) {
    this.set({sites: siteList});
    this.saveSites(siteList);
  }

  exportSites() {
    return API.exportSites(JSON.stringify(this.get().sites));
  }
}

var quotes = Quotes.quotes;
var genres = Object.keys(quotes);
var genre = genres[Math.floor(Math.random() * genres.length)];
var selected_quotes = quotes[genre];
// var quote = selected_quotes[Math.floor(Math.random() * selected_quotes.length)];

const store = new HomePageStore({
  sites: [],
  quote: selected_quotes[Math.floor(Math.random() * selected_quotes.length)],
  showConfig: false,
  showQuickConfig: false,
  quickConfigIdx: -1,
  quickConfigSite: {}
});

store.init();

export default store;
