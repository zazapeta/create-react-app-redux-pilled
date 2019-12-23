# create-react-app-redux-pilled

Create-react app template (Redux, Redux-thunk, Reselect, Redux-logger, React Router, Prettier, VSCode Debugger, FSA, Layout, ...),

# Getting started

> `git clone ...`

> `npm i`

> `npm run start`

# Running Tests

> `npm run test`

## CI Deployement

> `npm run test:CI`

## Debugging

For vscode intégration

> `npm run test:debug`

# Development

> `npm run start`

# Production build

> `npm run build`

# Technical stack

- React
- React Router
- Redux (redux-thunk, redux-actions, redux-logger, reselect, redux-orm, redux-form)
- Bootstrap
- Axios
- (xState ?)

# File structure

Based on | Pills | Pages | Models | directory where :

- Pills are smart (business) component (aka connected component)
- Pages are 'navigational' component (they are used in the Router)
- Models are 'api-data-wrapper' class. Managed with redux-orm
- Api is the directory containing all api services

## Definitions

- images : shared images directory
- models : models directory
- pages : page directory - A page is a component that will be used **exclusively** in the Router - _nowhere else and no other component in the router !_. Therefore, pages are responsible of the navigations tought routes. A 'big' page may be splited into smaller component stored in child directory.
- pills : pill directory - A pill is something handling a part of the business -- see **Pill** section
- redux-form-utils: redux-form utlities directory
  - fieldComponents.jsx - Component used as _XXX_ in (redux-form)`<Field component={XXX}>`.
  - fieldValidators.js - Function used as _XXX YYY_ in (redux-form)`<Field validate={[XXX,YYY]}` - _all function here must be tested_
  - fieldValidators.test.js - File test of validators
- redux-utils: redux utilities directory
  - localStorage.js - simple wrapper on localStorage
  - reducers.js - Combined reducers
  - store.js - Configurations of the redux store (middlewares, sync localStorage, debug)
  - utils.js - redux specific utilities
- router: React Router files
  - ErrorBoud.jsx : The Error boundary (coupled with `<Suspens>`) - _when an error bubble up to this component, the component re-render to display an erroor msg_
  - Router.jsx : the react router file - _All pages are lazyloaded_
- ui-kit: Wrapper on semantic-ui for the sake of encapsulation and in the hope to make a semantic theme
- App.js + App.actions.js + App.reducer.js : The entry point of the Application
- i18n.js : use as a bottleneck for the translation of the app
- index.js : The entry point of create-react-app
- utils.js : Global app utils _Must be tested !_ .

## Pill

A pill is a directory of (see \_template) :

- some `xxx.api.js` - where models are created/bound to api request/response - _no try catch there ! let error bubble up please_
- some `xxx.container.jsx` smart (connected to redux) component - _handling business logic_
- some `xxx.view.jsx` - dumb/stateless componants - _no logic there_
- some `xxx.form` - componant using (redux-) forms - _group of .container + .view_
- some `xxx.module.css` - css file used here (as a module)
- some `xxx.selectors.js` - [**IMPORTANT**] They handle how to get data from the redux store - _must be pure functions, tested with a 100% coverage, composed with reselect, and for the sake, keep it simple (composition are the key here)_ - see official reselect doc
- some `xxx.reducer.js` - [**IMPORTANT**] Redux reducer - see offcial redux doc
- some `xxx.actions.js` - [**IMPORTANT**] Redux actions - see offcial redux doc
- some `xxx.test.js` - [**IMPORTANT**] the test file associated to the pills
- some `xxx.doc.md` - Used if the pills should be documented

# Workflow

1.  git pull
1.  git checkout `feature/<branch-feature>` or `fix/<branch-fix>`
1.  git commit
1.  git commit ...
1.  git push
1.  **CREATE** a pull request (PR) on `develop`
1.  **MERGE** pull request _into develop_--> trigger test runner --> tests are valid ? --> trigger a deployement
1.  **DO NOT merge manually without a -m flag `git merge XXX -m 'Merge XXX into XXX'**

# Tests

Multiple kind of tests :

- unit : with jest | https://testing-library.com/
  - component : should render
  - selectors : purity
  - reducers : purity
  - actions : purity
  - models : fields presence
  - api : mock
- end to end : with cypress

# Deployment

Bituckets pipelines + Bitbuckets deployement -> trigger netlifly build -> deploy

To skip build : add [skip ci] into the commit message as described here (https://confluence.atlassian.com/bitbucket/branch-workflows-856697482.html)

To configure `bitbucket-pipelines.yml` see https://confluence.atlassian.com/bitbucket/configure-bitbucket-pipelines-yml-792298910.html

wath's news : https://confluence.atlassian.com/bitbucket/what-s-new-in-bitbucket-pipelines-859444600.html

# Environnement

- Production : manual trigger
- Staging : automatique trigger on develop branch push (NODE_ENV = production)
- Developement (test) automatique trigger on develop branch push (NODE_ENV = development)

# The rules of the house

- Let a clear TODO statement when a work is not finish/complet (if test is missing, or inline style can be exctracted in module css)
- When work is in progress, you MUST start your commit with **[WIP] your awesome commit**
- ON THE IMPORTANCE OF COMMIT MESSAGE: Your commit msg cannot be too long. Give a description of **WHY** (not what) (how, if its hard) have you do that.
- When merging two branch, use the `-m` flag to add a commit
- DAMN, every pure function should be unit tested !

## Clean Code (in french)

Essaye de garder le scope très serré lors du développement/refacto d'une feature. Ainsi quand je relis le code, je sais pourquoi tu as fait ces modifs ou encore une autre.
Pour cela, je te propose de faire ça : Imagines toi à ma place :wink: à devoir relire pleins pleins de lignes, pleins pleins de fichiers qui touchent à plusieurs features à la fois. Si tu pouvais me faciliter la vie, je t'en serais reconnaissant :slightly_smiling_face: :slightly_smiling_face:

En bref, n'oublie pas :

- petits commits
- petites features
- petites branches
- petites changements
- beaucoup de tests :smile: (tu n'en rédiges pas encore assez - TIPS: fait du TDD : écrit les avants de coder)
- penses à moi qui vais te relire :cry: --> facilites moi la vie !!!

Si tu sens que tu as terminé d'un point de vue fonctionnalité, je te conseil de bosser ta qualité de code.
En effet, il y a encore des maladresses (ne t'en fait pas, il y en aura toujours, c'est pour ça qu'on se relis) qui pourraient facilement être évités.
Voici mon guide perso pour essayer d'augmenter ma qualité de code quand je fait ça en solo :

- Est-ce que le code que j'ai écrit est testé ? Oui -> good. Non -> j'en écrit.
- Est-ce que le code que j'ai écrit respecte au plus possible le S dans (S.O.L.I.D) ? Oui -> good. Non -> je le 'purifie' (cf 'pure function').
- Est-ce que le code que j'ai écrit est D.R.Y ? Oui -> good. Non -> je le 'dry'.
- Est-ce que le code que j'ai écrit est sans fautes d’orthographe ? Oui -> good. Non -> je les corriges.
- Est-ce que le code que j'ai écrit est 'camelCase' ? Oui -> good. Non -> je les corriges.
- Est-ce que le code que j'ai écrit me semble 'simple' ? Oui -> good. Non -> je documente ce que le code fait (Quoi? Comment? **Pourquoi?**).
- Est-ce que mes dépendances sont 'isolés' ? Oui -> good. Non -> je les isoles
- Est-ce que tout est bon ? Oui -> VERY GOOD !!. Non -> pourquoi ? Besoin d'un coup de pouce pour écrire un test ? Besoin d'une indication sur comment 'splitter' le code ? Besoin d'une relecture complète ? Super, créer une PR, push, et démarre une conversation :smiley: :smiley:

---

'code review' :
PAS de français. Ni dans le nom de branches (mdpOubliee), ni dans le nom des variables, ni nulle part, si ce n'est dans la traduction. Le seul endroit où j’accepte ce sont dans les cartes trello. Le reste c'est de l'anglais. Merci de faire attention à ça.
PAS de magic string (ou le plus rarement possible) : http://lmgtfy.com/?s=d&q=wath+is+a+magic+string
Fait attention à la casse : lower camel case tout le temps sauf pour :
les class (composant React ou models) : upper camel case
les constantes: screaming snake case
On préfère les petites fonctions qui font une choses (peut-etre deux). Essaye de faire un maximum de fonction pure (http://lmgtfy.com/?s=d&q=wath+is+a+pure+function)
Design patterns à utiliser pour être S.O.L.I.D:

- factory
- facade
- dependency inversion (http://lmgtfy.com/?s=d&q=dependency+inversion)

Pas de var.
D'une manière général, on évite le gobal scope.

# Documentation

JSDOC

# PWA : Notification + Push Api + Service Worker

TODO

# Building badge

TODO

# i18N

A 't' function is provided. You have to feed the 'texts' variable defined into the i18n.js

# UX Data : GA

TODO

# How themes work

TODO

# Feature Toogle

TODO

# Classic Issues :

- `ENOSPC` --> `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
  (src)[https://github.com/facebook/jest/issues/3254#issuecomment-297214395]
