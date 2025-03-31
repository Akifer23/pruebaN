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
    applicationServerKey: 'TU_CLAVE_PUBLICA'
    });
    });
    }).then(subscription => {
    subscribeButton.addEventListener('click', () => {
    fetch('/subscribe', {
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