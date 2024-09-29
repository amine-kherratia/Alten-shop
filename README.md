# ALTEN SHOP FRONT

## Description

Ce projet est une application Angular qui permet de gérer une liste de produits et un panier d'achats. Les utilisateurs peuvent visualiser, filtrer et ajouter des produits à leur panier, ainsi que gérer la quantité des articles dans le panier.

## Technologies utilisées

- **Angular**: Framework pour construire l'application.
- **TypeScript**: Langage de programmation utilisé pour le développement.
- **PrimeNG**: Bibliothèque de composants UI pour Angular.
- **RxJS**: Pour la gestion des opérations asynchrones et les flux de données.
- **Jasmine/Karma**: Pour les tests unitaires.

## Fonctionnalités

1. **Liste de produits**: Afficher tous les produits disponibles avec des options pour filtrer par nom ou catégorie.
2. **Gestion du panier**:
   - Ajouter des produits au panier.
   - Mettre à jour la quantité des produits dans le panier.
   - Supprimer des produits du panier.
   - Afficher les articles du panier et la quantité totale.

## Installation

1. Clonez le dépôt:
   ```bash
   git clone <url-du-repo>
   ```

2. Installez les dépendances:
   ```bash
   npm install
   ```

3. Lancez l'application:
   ```bash
   ng serve
   ```

4. Ouvrez votre navigateur et accédez à `http://localhost:4200`.

## Tests

### Lancer les tests unitaires

Pour exécuter les tests unitaires, utilisez la commande suivante:
```bash
ng test
```

### Exemples de tests

- **ProductListComponent**:
  - Vérifie si le composant est créé.
  - Vérifie le comportement de filtrage des produits.

- **CartComponent**:
  - Vérifie si le composant est créé.
  - Vérifie si les articles du panier sont récupérés correctement.
  - Vérifie la suppression des articles du panier si la quantité est inférieure à 1.

## Structure du projet

```
src
│
├── app
│   ├── cart
│   │   ├── data-access
│   │   │   └── cart.service.ts
│   │   └── ui
│   │       └── cart-list
│   │           └── cart-list.component.ts
│               └── cart-list.component.spec.ts
│   │
│   ├── products
│      ├── data-access
│      │   ├── product.model.ts
│      │   └── products.service.ts
│      └── ui
│          └── product-list
│              └── product-list.component.ts
│              └── product-list.component.spec.ts
│   
│   
│
└── assets
    └── products.json
```
