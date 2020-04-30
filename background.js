const clearNotification = () =>
  setTimeout(
    () => chrome.notifications.clear('home-block-notifications'),
    10000
  );

chrome.storage.sync.get(['home-block-quotes'], (results) => {
  if (typeof results['home-block-quotes'] === 'undefined') {
    results['home-block-quotes'] = [];
  }
  const quotes = results['home-block-quotes'];
  clearNotification();
  setInterval(
    () =>
      chrome.storage.sync.get('home-block-notifications', (res) => {
        if (typeof res['home-block-notifications'] === 'undefined') {
          res['home-block-notifications'] = true;
          chrome.storage.sync.set({ 'home-block-notifications': true });
        }

        if (res['home-block-notifications']) {
          chrome.notifications.create(
            'home-block-notifications',
            {
              type: 'basic',
              title: 'Home Blocks',
              iconUrl: './public/assets/bg.jpg',
              message: quotes[Math.floor(Math.random() * quotes.length)],
            },
            clearNotification
          );
        }
      }),
    1800000
  );
});
