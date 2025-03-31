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
        applicationServerKey: 'BEItABQtI_IaBbo9ZyFrxCEdXDQp9dXT4WOD7Hw8rUBQb93m0Vx2iRiUXwCw9jshpR5idi7gCbdHJx5ubXgLtiE'
      });
    });
  }).then(subscription => {
    subscribeButton.addEventListener('click', () => {
      let serverUrl = 'http://localhost:3000/subscribe'; // URL local por defecto

      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        serverUrl = 'https://prueban-e4h7.onrender.com/subscribe'; // URL de Render
      }

      fetch(serverUrl, {
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