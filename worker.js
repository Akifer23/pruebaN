self.addEventListener('push', event => {
    const payload = event.data.json();
    event.waitUntil(self.registration.showNotification(payload.title));
    });