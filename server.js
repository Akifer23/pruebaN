const express = require('express');
    const webpush = require('web-push');
    const bodyParser = require('body-parser');
    const cors = require('cors'); // Importa el paquete cors

    const app = express();
    app.use(bodyParser.json());
    app.use(cors()); // Agrega el middleware cors

    // Claves VAPID
    const publicVapidKey = 'BD4p2ogj5a2zGg8zyZW5rnK3AUvMevcYsLoJxFU0KIGCK-JeIAIiV07BCKXcRRXFe3kHWIhoEwsZxx_GfBCgVmA';
    const privateVapidKey = 'NLDK-x6b7DTVNk_ZwdV0YgsDqZAyxO0qvLvSCfaRZNg';

    webpush.setVapidDetails('mailto:tuemail@example.com', publicVapidKey, privateVapidKey);

    let subscriptions = [];

    app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
    });

    function sendNotifications() {
    const payload = JSON.stringify({ title: 'Notificación Push Minuto!' }); // Modifica el mensaje si lo deseas
    subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error);
    });
    });
    }

    // Envía notificaciones cada minuto (60000 milisegundos)
    setInterval(sendNotifications, 60000);

    app.post('/sendNotification', (req, res) => {
        sendNotifications();
        res.status(200).json({});
    });

    app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
    });