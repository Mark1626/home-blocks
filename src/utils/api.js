const thenChrome = require('then-chrome');
const colors = [
  '#fcf3af',
  '#fba058',
  '#31cdd4',
  '#ffd1c6',
  '#70a4d8',
  '#9de0fc',
  '#c9bff4',
  '#30dca6',
  '#ffa3bb',
  '#a3c4fd'
];

function ensureValidSites(sites) {
  for(var i=0; i < 20; ++i) {
    if(!sites[i]) {
      sites.push({
        title: '',
        url: '',
        color: colors[Math.floor(Math.random() * 10)],
        character: '-'
      });
    }
    else if(!sites[i].title) {
      sites[i].title = '';
      sites[i].character = '-';
    }
  }
  return sites;
}

function getSites() {
  return thenChrome.storage.sync.get(['page-topSites']).then((results) => {
    if (typeof results['page-topSites'] === 'undefined') {
      results['page-topSites'] = [];
    }
    return ensureValidSites(results['page-topSites'].slice(0, 20));
  });
}

async function saveSites(siteList) {
  new thenChrome.storage.sync.set({'page-topSites': siteList});
}

function exportSites(sites) {
  const link = document.createElement('a');
  const mimeType = 'application/json';
  link.setAttribute('download', 'home-block-sites.json');
  link.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(sites)}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function getNotificationStatus() {
  const results = await thenChrome.storage.sync.get(['home-block-notifications']);
  if (typeof results['home-block-notifications'] === 'undefined') {
    results['home-block-notifications'] = false;
  }
  return results['home-block-notifications'];
}

async function toggleNotifications(notificationsStatus) {
  new thenChrome.storage.sync.set({'home-block-notifications': notificationsStatus});
}

function getQuotes() {
  return thenChrome.storage.sync.get(['home-block-quotes']).then((results) => {
    if (typeof results['home-block-quotes'] === 'undefined') {
      results['home-block-quotes'] = [];
    }
    return results['home-block-quotes'];
  });
}

async function setQuotes(quotes) {
  let trimmedQuotes = [];
  quotes = quotes.split('\n');
  quotes.forEach(quote => {
    if (quote.indexOf('- ') !== -1) {
      trimmedQuotes.push(quote.substring(2));
    }
  });
  new thenChrome.storage.sync.set({'home-block-quotes': trimmedQuotes});
}

export default {
  saveSites: saveSites,
  getSites: getSites,
  exportSites: exportSites,
  colors,
  getQuotes,
  setQuotes,
  getNotificationStatus,
  toggleNotifications
};
