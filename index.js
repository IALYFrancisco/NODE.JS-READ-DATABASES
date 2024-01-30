const express = require('express');
const mysql = require('mysql');
const app = express();

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Configuration du moteur de modèle EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    const cssFile = '/css/style.css'; // Chemin vers votre fichier CSS

    // Exécutez une requête SQL pour obtenir des données de la base
    const query = 'SELECT * FROM utilisateurs';

    db.query(query, (err, données) => {
        if (err) {
            console.error('Erreur de requête SQL :', err);
            return;
        }

        // Rendre le modèle EJS et passer les données à afficher
        res.render('liste', { données, cssFile });
    });
});


app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
