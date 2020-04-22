const clearNotification = () =>
  setTimeout(() => chrome.notifications.clear('home-blocks-notifications'), 10000);

chrome.storage.sync.get(['home-block-quotes'], (results) => {
  if (typeof results['home-block-quotes'] === 'undefined') {
    results['home-block-quotes'] = [];
  }
  const quotes = results['home-block-quotes'];
  clearNotification();
  setInterval(
    () =>
      chrome.notifications.create(
        'home-blocks-notifications',
        {
          type: 'basic',
          title: 'Home Blocks',
          iconUrl: './public/assets/bg.jpg',
          message: quotes[Math.floor(Math.random() * quotes.length)],
        },
        clearNotification
      ),
    36000
  );
});
