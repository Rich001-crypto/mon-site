# Plateforme CEMCC ASBL / CSRAD

Application web de présentation institutionnelle, marketing, génération de prospects, demandes de services, inscriptions aux formations et suivi CRM pour CEMCC ASBL et le CSRAD à Goma.

## Architecture

- `worker/index.js` : application Cloudflare Worker ESM autonome, routage, API et coque de navigation.
- `worker/editorial.mjs` et `worker/editorial.css` : pages éditoriales, intégration photographique et interactions de la galerie.
- `drizzle/0000_cemcc.sql` : schéma D1 initial et index.
- `.openai/hosting.json` : déclaration des bindings `DB` (D1) et `BUCKET` (R2).
- `scripts/build.mjs` : création de l’artefact déployable et intégration autonome des médias optimisés.
- `scripts/prepare-images.mjs` : génération des variantes WebP 640, 1280 et 1920 pixels à partir des originaux validés.
- `scripts/preview.mjs` : prévisualisation locale sans dépendances externes.

L’interface ne dépend d’aucune bibliothèque distante. Elle fonctionne avec HTML, CSS et JavaScript natifs, ce qui réduit le poids initial et les risques de dépendances.

## Pages

`/`, `/cemcc`, `/csrad`, `/a-propos`, `/services`, `/formations`, `/organisations`, `/realisations`, `/ressources`, `/demande-service`, `/paiement`, `/contact`, `/admin`, `/confidentialite`, `/mentions-legales`.

Le Worker sert également `/robots.txt`, `/sitemap.xml` et les routes API sous `/api/*`.

## Données

La base contient les modèles : utilisateurs, prospects, services, demandes de services, formations, inscriptions, projets, réalisations, témoignages, articles, catégories, messages, devis, paiements, partenaires, membres d’équipe, médias, abonnés newsletter et événements marketing.

Les fichiers joints aux demandes sont stockés dans R2. La base D1 conserve leur clé et leurs métadonnées.

## Variables d’environnement

Copier `.env.example` pour la configuration locale. En production, configurer les valeurs dans l’hébergement :

- `ADMIN_EMAILS` : liste d’adresses administratrices séparées par des virgules.
- `RESEND_API_KEY` : réservé à une future intégration d’envoi d’e-mails.
- `ADMIN_NOTIFICATION_EMAIL` : adresse de réception des notifications.
- `NEXT_PUBLIC_GA_ID` et `NEXT_PUBLIC_META_PIXEL_ID` : réservés aux comptes analytics officiels.

Ne jamais versionner de secret.

## Développement local

Node.js 22 ou plus récent est recommandé.

```bash
npm run dev
```

Puis ouvrir `http://127.0.0.1:8787`.

Vérification syntaxique :

```bash
npm run check
npm test
```

## Base de données et migration

Le schéma initial est dans `drizzle/0000_cemcc.sql`. Sur Sites, la migration est appliquée au déploiement. Pour toute évolution, ajouter une nouvelle migration numérotée sans modifier une migration déjà appliquée.

## Administration

1. Définir `ADMIN_EMAILS` avec l’adresse utilisée pour se connecter au Site.
2. Ouvrir `/admin` après authentification.
3. Consulter les volumes de prospects, demandes, inscriptions et messages.
4. Mettre à jour le statut d’une demande : Nouveau, Contacté, En discussion, Devis envoyé, Client, Terminé ou Perdu.

Aucun mot de passe d’administration n’est stocké dans l’application. L’identité est transmise par la plateforme et contrôlée côté serveur.

## Gestion du contenu

- Services et formations : modifier les catalogues au début de `worker/index.js`; ne renseigner prix, formateurs, durées ou dates qu’après validation officielle.
- Images du site : les dérivés optimisés sont rangés sous `public/images/cemcc` et `public/images/csrad`, puis embarqués dans l’artefact Worker. Les originaux ne sont jamais étirés et les pages utilisent `srcset`, chargement différé, textes alternatifs et cadrages explicites.
- Pièces jointes des demandes : elles utilisent R2. La base D1 conserve leur clé et leurs métadonnées.
- Équipe, partenaires et témoignages restent en état explicite “à fournir” tant que les données officielles ne sont pas disponibles.

## Médias officiels intégrés

- `IMG_15.jpg` : communauté CEMCC, présentation institutionnelle, contact et galerie.
- `IMG_53.jpg` : prise de parole lors d’une rencontre CEMCC et galerie.
- `LOGIK PICTURE(121).jpg` : participants diplômés de la formation en biostatistique, pages CEMCC et Formations, galerie.
- `LOGIK PICTURE(13).jpg` : atelier de biostatistique, accueil, CSRAD, Services, Formations et Organisations, galerie.
- `IMG-32.jpg` : Healthy Heart Program, accueil, CEMCC et galerie.
- Logo officiel CEMCC : en-tête, navigation mobile, pages institutionnelles, pied de page, administration et favicon.

## Réalisations numériques

- MedConnect RDC : application web présentée sur `/realisations`, avec accès direct à `https://medconnect-rdc.lovable.app`.

## WhatsApp, paiement et e-mail

- Numéro officiel : `+243 975 121 886`.
- Les liens WhatsApp sont préremplis et les clics génèrent l’événement `whatsapp_click`.
- Airtel Money affiche le même numéro et impose une confirmation préalable avec un conseiller.
- L’application ne simule aucune confirmation de paiement.
- Les notifications e-mail nécessitent l’intégration ultérieure d’un fournisseur Resend ou SMTP et la configuration de ses secrets.

## Analytics

Les événements propriétaires sont déjà enregistrés dans D1 : `whatsapp_click`, `service_request`, `training_registration` et `lead_download`. Les champs d’environnement préparent Google Analytics et Meta Pixel, sans activer de suivi avant la fourniture des identifiants et la mise en place du consentement.

## Build et déploiement

Le build Linux exécute :

```bash
bash scripts/build.sh
```

Il produit `dist/server/index.js`, la configuration d’hébergement et la migration D1. Le Site est ensuite versionné et publié via OpenAI Sites.

## Données officielles encore nécessaires

- éventuel logo distinct du CSRAD, si l’organisation souhaite en publier un ;
- photos supplémentaires de projets et de l’équipe ;
- noms, fonctions et biographies des membres de l’équipe ;
- liste validée des partenaires ;
- réalisations avec dates, lieux et résultats ;
- témoignages avec autorisation de publication ;
- formateurs, durées, programmes, tarifs et prochaines sessions ;
- documents PDF définitifs des ressources gratuites ;
- comptes officiels Analytics et Meta ;
- choix du fournisseur e-mail et, ultérieurement, API de paiement officielle.

## Sécurité

Validation serveur, contrôle d’origine, limites de taille et de type des fichiers, requêtes D1 préparées, autorisation serveur de l’administration, CSP, anti-framing, absence de secret client et journalisation sans données personnelles sensibles sont intégrés. Pour une exposition publique à fort trafic, ajouter une couche de rate limiting distribuée selon les règles opérationnelles retenues.
