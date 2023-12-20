# Gestion de Paiement de Cotisation Syndicale

Bienvenue dans le projet de gestion de paiement de cotisation syndicale. Ce système a été développé pour répondre aux besoins spécifiques d'un syndic d'immeuble afin de gérer les appartements et les paiements mensuels.

## Table des matières

- [Technologies Utilisées](#technologies-utilisées)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Sécurité](#sécurité)
- [Déploiement](#déploiement)
- [Contributions](#contributions)
- [Licence](#licence)

## Technologies Utilisées

- **Backend:** Node.js (Express.js), MongoDB (Mongoose)
- **Frontend:** React.js
- **Gestion d'État:** Redux / Context API
- **Authentification:** JSON Web Token (JWT)
- **Tests Unitaires:** Framework de test de votre choix (par exemple, Jest)
- **Conteneurisation:** Docker

## Structure du Projet

- `Server/`: Contient le code source du backend.
- `Client/`: Contient le code source du frontend.
- `docker-compose/`: Fichiers Docker pour générer les images du backend et du frontend.
- `Server/_test_/`: Contient les tests unitaires.

## Installation

1. Clonez le dépôt:

```bash
git clone https://github.com/HichamElquagh/Syst-me-de-gestion-de-paiement-cotisation-syndicale.git
cd Syst-me-de-gestion-de-paiement-cotisation-syndicale ```
```
### Installez les dépendances du backend:
```bash
cd Server
npm install
```
### Installez les dépendances du frontend:
```bash
cd Server
npm install
```

### Configuration
- Dupliquez le fichier .env.example dans le dossier backend et renommez-le en .env. Configurez les variables d'environnement nécessaires,
 telles que les clés secrètes pour JWT et les informations de connexion à la base de données MongoDB.

## Utilisation
#### front :
```bash
cd Server
npm run dev
```
#### back:
```bash
cd Server
npm run dev
```
### Tests
```bash
npm test
```
### Déploiement
```bash
docker-compose up -d
```






