<?php

/* Note : Vous pouvez utiliser la variable $user pour récupérer votre nom d'utilisateur
          Vous pouvez utiliser la variable $host pour récupérer votre ip ou nom de domaine

ATTENTION : ceci est un fichier de configuration pour cakebox-light
pour cakebox 2.8 utiliser la version 0.70 du plugin linkcakebox

Indiquez l'url complète de cakebox
exemple : http://www.mon-cakebox.fr/
ou  http://www.mon-cakebox.fr/

IMPORTANT : Toutes les urls ainsi que le chemin pour la variable $dirpath
            doivent finir avec un slash "/" ! */

$baseurl = 'https://'.$host.'/cakebox-'.$user.'/';
$accessurl = 'https://'.$host.'/access-'.$user.'/';

/* La variable $dirpath doit correspondre avec la variable directory de votre .rtorrent.rc */
$dirpath = '/home/'.$user.'/Downloads/';

/* true pour ouvrir cakebox dans un autre onglet
false pour ne pas ouvrir cakebox dans un autre onglet */
$onglet = true;
