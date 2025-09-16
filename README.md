# 🚀 Next.js App avec Docker et MongoDB

Application Next.js moderne avec authentification JWT, base de données MongoDB et conteneurisation Docker.

## ✨ Fonctionnalités

-   🔐 **Authentification JWT** avec bcrypt
-   🗄️ **Base de données MongoDB** intégrée
-   🐳 **Conteneurisation Docker** complète
-   📱 **Interface moderne** avec React 19
-   🔒 **Sécurité renforcée** avec validation des tokens
-   📧 **Service d'encodage email**
-   🍽️ **Gestion des menus** dynamique

## 🛠️ Technologies utilisées

-   **Frontend** : Next.js 15, React 19, TypeScript
-   **Backend** : API Routes Next.js, JWT
-   **Base de données** : MongoDB 7.0
-   **Conteneurisation** : Docker, Docker Compose
-   **Sécurité** : bcrypt, crypto-js, jsonwebtoken

## 📋 Prérequis

-   Docker et Docker Compose installés
-   Node.js 18+ (pour le développement local)
-   Git

## 🚀 Installation et démarrage

### 1. **Cloner le projet**

```bash
git clone <url-de-votre-repo>
cd DockerNextjs/nextjs-app
```

### 2. **Variables d'environnement**

Créez un fichier `.env.dev` à la racine avec vos propres valeurs :

```env
JWT_SECRET=votre_secret_jwt_personnalise
MONGODB_URI=mongodb://username:password@mongodb:27017/database_name
NODE_ENV=development
```

### 3. **Démarrer avec Docker**

```bash
# Construire et démarrer tous les services
docker-compose up --build

# Ou en arrière-plan
docker-compose up -d --build
```

### 4. **Accéder à l'application**

-   🌐 **Application** : http://localhost:3000
-   🗄️ **MongoDB** : localhost:27017
-   📊 **MongoDB Express** : http://localhost:8081 (optionnel)

## 🐳 Commandes Docker utiles

```bash
# Voir les services en cours
docker-compose ps

# Voir les logs
docker-compose logs -f
docker-compose logs -f nextjs

# Redémarrer un service
docker-compose restart nextjs

# Arrêter les services
docker-compose down

# Nettoyer les volumes
docker-compose down -v

# Reconstruire une image
docker-compose build --no-cache
```

## 🏗️ Structure du projet

```
nextjs-app/
├── app/                    # Pages et API routes Next.js
│   ├── account/           # Page compte utilisateur
│   ├── api/               # API endpoints
│   │   ├── auth/          # Authentification
│   │   ├── menu/          # Gestion des menus
│   │   └── users/         # Gestion des utilisateurs
│   ├── login/             # Page de connexion
│   └── signup/            # Page d'inscription
├── components/             # Composants React
│   ├── forms/             # Formulaires
│   ├── menu/              # Composants de menu
│   └── ui/                # Composants UI réutilisables
├── lib/                    # Utilitaires et configurations
├── services/               # Services métier
└── docker-compose.yml      # Configuration Docker
```

## 🔐 API Endpoints

### Authentification

-   `POST /api/auth/register` - Inscription utilisateur
-   `POST /api/auth/token` - Génération de token JWT

### Utilisateurs

-   `GET /api/users` - Liste des utilisateurs
-   `POST /api/users` - Créer un utilisateur

### Menus

-   `GET /api/menu` - Récupérer le menu
-   `POST /api/menu` - Créer/modifier le menu

## 🚀 Déploiement

### Déploiement Vercel (Recommandé)

1. **Connecter votre repo GitHub à Vercel**
2. **Configurer les variables d'environnement** dans le dashboard Vercel
3. **Déploiement automatique** à chaque push

### Variables d'environnement Vercel

```env
JWT_SECRET=votre_secret_jwt_production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
NODE_ENV=production
```

### Déploiement manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

## 🧪 Développement

### Scripts disponibles

```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run start    # Démarrage en mode production
npm run lint     # Vérification du code
```

### Développement local sans Docker

```bash
npm install
npm run dev
```

## 🔧 Configuration MongoDB

La base de données MongoDB est configurée avec :

-   **Port** : 27017
-   **Utilisateur** : [à configurer dans .env.dev]
-   **Mot de passe** : [à configurer dans .env.dev]
-   **Base de données** : [à configurer dans .env.dev]

## 📝 Notes importantes

-   🔒 **JWT_SECRET** : Changez cette valeur en production
-   🗄️ **MongoDB** : Utilisez MongoDB Atlas pour la production
-   🌍 **CORS** : Configurez selon vos besoins de production
-   📊 **Logs** : Surveillez les logs Docker pour le débogage

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :

-   📧 Créez une issue sur GitHub
-   📚 Consultez la documentation Next.js
-   🐳 Vérifiez la documentation Docker

---

**Développé avec ❤️ et ☕**
