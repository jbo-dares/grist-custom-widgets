# 🧩 Grist Custom Widgets

Ce dépôt contient une collection centralisée de **widgets personnalisés pour Grist**, permettant de créer des interfaces riches et réutilisables à travers plusieurs pages ou documents Grist.

## 🔧 Objectif

Centraliser tous les widgets personnalisés utilisés dans différents projets Grist pour faciliter leur maintenance, partage et réutilisation, servis directement via **GitHub Pages**.

Les widgets sont conçus pour être intégrés facilement via le **Custom Widget Builder** de Grist, en utilisant des standards web comme HTML/CSS/JS et [DSFR](https://www.systeme-de-design.gouv.fr/) (Design System de l'État français).

## 📁 Structure du dépôt

```
grist-custom-widgets/
├── README.md
├── scripts/
│   └── generate-readme-table.mjs   # régénère le tableau ci-dessous à partir de widgets/*/widget.json
├── .github/workflows/
│   └── update-readme.yml           # Action qui exécute le script à chaque push sur widgets/**
└── widgets/
    ├── page-couverture/
    │   ├── index.html
    │   └── widget.json              # métadonnées (titre, description) utilisées par le script
    ├── tableau-bord-programmation/
    │   ├── index.html
    │   └── widget.json
    └── common/
        └── theme.css                # tokens de design (couleurs, police) partagés entre widgets
```

### Convention de nommage des widgets

Chaque dossier utilise un nom explicite en kebab-case décrivant l'usage du widget, par exemple :
- `page-couverture` → page de garde / bandeau d'en-tête DSFR
- `tableau-bord-programmation` → tableau de bord de suivi de programmation budgétaire

## 💡 Comment utiliser ces widgets dans Grist (via GitHub Pages)

Le dépôt est publié sur GitHub Pages. Chaque widget est accessible à cette URL, qui **se met à jour automatiquement** à chaque push sur `main` (déploiement Pages en général en moins de 2 minutes) :

```
https://jbo-dares.github.io/grist-custom-widgets/widgets/<nom-du-widget>/index.html
```

### Étape 1 : Copiez l'URL du widget souhaité
Voir le tableau ci-dessous (généré automatiquement).

### Étape 2 : Intégrez dans Grist
1. Dans votre document Grist, allez dans **Custom Widget Builder**
2. Collez l'URL complète du fichier `index.html` dans le champ "Widget URL"
3. Définissez les colonnes attendues selon les besoins du widget

> ⚠️ GitHub Pages peut mettre en cache le contenu quelques minutes côté CDN. Si Grist n'affiche pas immédiatement la dernière version après un push, forcez un rechargement de l'iframe (Ctrl+Shift+R) ou patientez 1-2 minutes.

## 📦 Widgets disponibles

<!-- WIDGETS_TABLE:START -->
| Nom du Widget | Description | URL directe |
|---------------|-------------|--------------|
| `page-couverture` | Page de garde DSFR : bloc marque, titre/sous-titre, chapeau, contenu markdown (avec placeholders {cle} pour données agrégées). | [`https://jbo-dares.github.io/grist-custom-widgets/widgets/page-couverture/index.html`](https://jbo-dares.github.io/grist-custom-widgets/widgets/page-couverture/index.html) |
| `tableau-bord-programmation` | Tableau de bord de programmation budgétaire : KPI globaux, blocs projets, histogrammes de saisonnalité, modales d'aperçu. | [`https://jbo-dares.github.io/grist-custom-widgets/widgets/tableau-bord-programmation/index.html`](https://jbo-dares.github.io/grist-custom-widgets/widgets/tableau-bord-programmation/index.html) |
<!-- WIDGETS_TABLE:END -->

> ⚙️ Ce tableau est régénéré automatiquement par une GitHub Action (voir plus bas) — ne le modifiez pas manuellement, modifiez plutôt `widgets/<nom>/widget.json`.

## 🤖 Automatisation du README (GitHub Action)

Le tableau ci-dessus est maintenu à jour automatiquement par le workflow `.github/workflows/update-readme.yml` :

1. À chaque push sur `main` qui touche `widgets/**`, la GitHub Action s'exécute.
2. Elle lance `node scripts/generate-readme-table.mjs`, qui parcourt tous les dossiers `widgets/<nom>/` contenant un `index.html`, lit leur `widget.json` (`title`, `description`), et reconstruit le tableau entre les marqueurs `<!-- WIDGETS_TABLE:START -->` / `<!-- WIDGETS_TABLE:END -->`.
3. Si le README a changé, l'action commit et push automatiquement (via `stefanzweifel/git-auto-commit-action`).

Pour ajouter un nouveau widget, il suffit donc de créer son dossier avec un `index.html` **et** un `widget.json` :
```json
{
  "title": "mon-nouveau-widget",
  "description": "Ce que fait le widget en une phrase."
}
```
Le README se met à jour tout seul au prochain push — plus besoin d'éditer le tableau à la main.

> Le workflow peut aussi être déclenché manuellement depuis l'onglet **Actions** du dépôt (`workflow_dispatch`).

## 🔤 Placeholders `{cle}` et données agrégées (widget page-couverture)

Le widget `page-couverture` permet d'insérer des valeurs dynamiques dans le texte markdown (`masque`) via la syntaxe `{cle}`.

1. Dans Grist, créez une **colonne formule** (ou reposez-vous sur une table de résumé/summary table) qui calcule vos agrégats et produit un texte JSON, par exemple :
   ```python
   import json
   json.dumps({
     "nb_projets": PROJETS.lookupRecords().__len__(),
     "budget_total": "450 000 €"
   })
   ```
2. Mappez cette colonne sur le champ optionnel **"Données agrégées (JSON)"** du widget.
3. Dans votre texte `masque`, utilisez les clés directement :
   ```
   Ce document couvre **{nb_projets}** projets pour un budget total de **{budget_total}**.
   ```

Les clés non reconnues sont laissées telles quelles dans le texte (utile pour repérer une faute de frappe).

## 🎨 Homogénéisation visuelle entre les widgets

Les deux widgets partagent désormais :
- la même version du DSFR (**1.13.1**) ;
- les mêmes tokens de couleur/police, extraits dans `widgets/common/theme.css` (Bleu France `#000091`, vert/orange/rouge DSFR, police Marianne), importés via :
  ```html
  <link rel="stylesheet" href="https://jbo-dares.github.io/grist-custom-widgets/widgets/common/theme.css">
  ```

Ce qui reste hétérogène et pourrait être aligné dans un second temps si besoin : `tableau-bord-programmation` utilise des cartes/blocs entièrement custom (`.kpi-card`, `.project-block`, etc.) plutôt que les classes de composants DSFR natives (`fr-badge`, `fr-card`, `fr-table`…) utilisées par `page-couverture` (`fr-header`, `fr-container`…). Une vraie homogénéité "look & feel" impliquerait de migrer ces composants custom vers des composants DSFR équivalents — je peux le faire si vous le souhaitez, widget par widget.

## 🛠️ Développement & Maintenance

Pour ajouter un nouveau widget :

1. Créez un nouveau dossier dans `/widgets/nom-du-widget/`
2. Placez-y votre fichier `index.html` avec le code complet, et un `widget.json` (titre + description)
3. Poussez sur `main` — GitHub Pages redéploie automatiquement et la GitHub Action met à jour le tableau ci-dessus

## 📦 Dépendances externes

- [Grist Plugin API](https://docs.getgrist.com/grist-plugin-api/)
- [DSFR v1.13.1](https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.13.1/dist/dsfr/)
- [Marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js)

## 📄 Licence

Ce projet est sous licence MIT – voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👥 Contributeurs

- Jean-Baptiste Olivier ([@jbo-dares](https://github.com/jbo-dares))

---

Merci Pliage!
