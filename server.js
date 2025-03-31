const express = require('express');
    const webpush = require('web-push');
    const bodyParser = require('body-parser');
    const app = express();
    app.use(bodyParser.json());
    //claves VAPID
    const publicVapidKey = 'BK8BbJ2NODT2FKb-aURfTR-ElX65TjB0YpDn0WZ0h3QX_ftDzFG1OpI55o3e6657uS2J4ynaQgkuatYj30k2Hk8';
    const privateVapidKey = 'GVZ0hQbSEZE3CQGoJwnmKiG9tpeTkDjMJrO6LSWE_Zc';
    webpush.setVapidDetails('mailto:lezamaandres47@example.com', publicVapidKey, privateVapidKey);
    let subscriptions = [];
    app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
    });
    app.post('/sendNotification', (req, res) => {
    const payload = JSON.stringify({ title: 'Notificación Push!' });
    subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error);
    });
    });
    res.status(200).json({});
    });
    app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
    });