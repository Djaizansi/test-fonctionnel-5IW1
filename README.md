# Installation

Pour que l'api fonctionne, il faudra suivre ces quelques étapes:

## Démarrer le projet 
Nous utilisons Docker pour lancer notre projet.
<br />
Nous devons build notre image pour ensuite lancer notre container :

```
$ docker compose build --no-cache
```
Ou directement avec le lancement du projet :
```
$ docker compose up -d --build --remove-orphans
```

## Créer la base de donnée
Si la base de donnée n'est pas crée, nous devons lancer cette commande :
```
$ docker compose exec back db:create
```

## Créer le schema de la base de donnée
```
$ docker compose exec back migrate
```

## Lancer les fixtures
```
$ docker compose exec back seed:run
```

## Supprimer la base de donnée
```
$ docker compose exec back db:drop
```