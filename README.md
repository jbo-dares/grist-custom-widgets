Tu as tout à fait raison ! Tu as raison, c'est une mauvaise compréhension de ma réponse. Voici une version corrigée du README qui explique exactement comment utiliser les widgets directement depuis GitLab sans passer par un clone local.

---

# 🧩 Grist Custom Widgets

Ce dépôt contient une collection centralisée de **widgets personnalisés pour Grist**, permettant de créer des interfaces riches et réutilisables à travers plusieurs pages ou documents Grist.

## 🔧 Objectif

Centraliser tous les widgets personnalisés utilisés dans différents projets Grist pour faciliter leur maintenance, partage et réutilisation directement depuis GitLab.

Les widgets sont conçus pour être intégrés facilement via le **Custom Widget Builder** de Grist, en utilisant des standards web comme HTML/CSS/JS et [DSFR](https://www.systeme-de-design.gouv.fr/) (Design System de l'État français).

## 📁 Structure du dépôt

```
grist-custom-widgets/
├── README.md             # Ce fichier
├── widgets/
│   ├── template-page-chapeau/
│   │   └── index.html
│   └── .../
│       └── ....
└── .../
    └── ...
```

## 💡 Comment utiliser ces widgets directement depuis GitLab ?

### Étape 1 : Accédez à votre widget dans GitLab
Rendez-vous dans le dossier du widget souhaité :
- Exemple : `https://pic.sg.social.gouv.fr/jean-baptiste.olivier/grist-custom-widgets/-/tree/main/widgets/template-page-chapeau`

### Étape 2 : Copiez l'URL du fichier index.html
Cliquez sur le fichier `index.html` puis cliquez sur le bouton **"Raw"** (en haut à droite) pour obtenir l'URL directe.

Exemple d'URL :
```
https://pic.sg.social.gouv.fr/jean-baptiste.olivier/grist-custom-widgets/-/raw/main/widgets/template-page-chapeau/index.html
```

### Étape 3 : Intégrez dans Grist
1. Dans votre document Grist, allez dans **Custom Widget Builder**
2. Collez l'URL complète du fichier `index.html` dans le champ "Widget URL"
3. Définissez les colonnes attendues selon les besoins du widget

## 📦 Widgets disponibles

| Nom du Widget | Description | URL directe |
|---------------|-------------|-------------|
| `template-page-chapeau` | Affichage de contenu Markdown formaté avec support DSFR | [`https://pic.sg.social.gouv.fr/jean-baptiste.olivier/grist-custom-widgets/-/raw/main/widgets/template-page-chapeau/index.html`](https://pic.sg.social.gouv.fr/jean-baptiste.olivier/grist-custom-widgets/-/raw/main/widgets/template-page-chapeau/index.html) |

> ✅ Pour chaque nouveau widget, ajoutez simplement son nom, sa description et son URL directe dans ce tableau.

## 🛠️ Développement & Maintenance

Pour ajouter un nouveau widget :

1. Créez un nouveau dossier dans `/widgets/nom-du-widget/`
2. Placez-y votre fichier `index.html` avec le code complet
3. Mettez à jour ce README avec les informations du nouveau widget
4. Faites une merge request pour validation

## 📦 Dépendances externes

- [Grist Plugin API](https://docs.getgrist.com/grist-plugin-api/)
- [DSFR v1.13.1](https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.13.1/dist/dsfr/)
- [Marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js)

## 📄 Licence

Ce projet est sous licence MIT – voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👥 Contributeurs

- Jean-Baptiste Olivier ([@jbolivier](https://pic.sg.social.gouv.fr/jean-baptiste.olivier))

---

Cette version est beaucoup plus simple et directe : vous pouvez utiliser directement les widgets depuis GitLab sans avoir besoin de cloner localement. Le principe est de pointer directement vers les fichiers `index.html` via leur URL RAW dans le Custom Widget Builder de Grist.