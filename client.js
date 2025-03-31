const subscribeButton = document.getElementById('subscribeButton');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/worker.js').then(registration => {
    console.log('Service Worker registrado', registration);
    return registration.pushManager.getSubscription().then(subscription => {
      if (subscription) {
        return subscription;
      }
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BD4p2ogj5a2zGg8zyZW5rnK3AUvMevcYsLoJxFU0KIGCK-JeIAIiV07BCKXcRRXFe3kHWIhoEwsZxx_GfBCgVmA'
      });
    });
  }).then(subscription => {
    subscribeButton.addEventListener('click', () => {
      fetch('http://localhost:3000/subscribe', { // Cambia la URL aquí
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      }).then(response => {
        console.log('Suscripción enviada al servidor', response);
      });
    });
  });
}