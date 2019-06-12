import { Store } from 'svelte/store.js';
import API from '../utils/api.js';

class HomePageStore extends Store {
  constructor(state) {
    super(state);
  }

  async init() {
    const sites = await API.getSites();
    let quotes = await API.getQuotes();
    quotes = quotes.length == 0  ? ['How are you doing today'] : quotes ;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quotes = quotes.join('\n');
    this.set({sites, quotes, quote});
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

  updateQuotes(quotes) {
    this.set({quotes: quotes});
  }

  saveQuotes() {
    API.setQuotes(this.get().quotes);
  }

  importSites(siteList) {
    this.set({sites: siteList});
    this.saveSites(siteList);
  }

  exportSites() {
    return API.exportSites(JSON.stringify(this.get().sites));
  }
}

const store = new HomePageStore({
  sites: [],
  quotes: [],
  quote: '',
  showConfig: false,
  showQuickConfig: false,
  showConfigQuotes: false,
  quickConfigIdx: -1,
  quickConfigSite: {}
});

store.init();

export default store;
