const express = require('express');
    const webpush = require('web-push');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const path = require('path'); // Importa el modulo path.

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // Sirve archivos estáticos desde el directorio actual
    app.use(express.static(path.join(__dirname, '/')));

    // Claves VAPID
    const publicVapidKey = 'BEItABQtI_IaBbo9ZyFrxCEdXDQp9dXT4WOD7Hw8rUBQb93m0Vx2iRiUXwCw9jshpR5idi7gCbdHJx5ubXgLtiE';
    const privateVapidKey = 'hEft5bKmjbimdrsYt9KxtOwRBWhnD8sMmZp0RJywA0k';

    webpush.setVapidDetails('mailto:lezamaandres47@example.com', publicVapidKey, privateVapidKey);

    let subscriptions = [];

    app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
    });

    function sendNotifications() {
    const payload = JSON.stringify({ title: 'Notificación Push Minuto!' });
    subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error);
    });
    });
    }

    setInterval(sendNotifications, 60000);

    app.post('/sendNotification', (req, res) => {
        sendNotifications();
        res.status(200).json({});
    });

    app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
    });