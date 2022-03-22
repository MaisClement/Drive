# Drive

### Voir en action : [Drive](http://drive.hackernwar.com)
\
Ce projet est construit en PHP 7.4, JavaScript et CSS 3
\
Cette version de démonstration [Drive](http://drive.hackernwar.com) est volontairement limité. 

# Prérequis

Il est nécésaire d'avoir :
- Un serveur web (apache, nginx,...)
- PHP >= 7.4

Pour permettre l'utilisation optimale, les données ``php.ini`` 
\
``upload_max_filesize = 10M``
\
``post_max_size = 10M``

# Installation

À la racine du serveur web, executez :

```$ git clone https://github.com/MaisClement/Drive.git drive```
\
```$ cd drive```

Editez les fichier `PATH.txt` et `IP.txt` pour paramétrer correctement le drive.

PATH doit contenir le chemin absolu. Ex : `P:\\Users\\cfresse\\Documents`
\
IP doit contenir le chemin absolu. Ex : `//localhost/drive/`