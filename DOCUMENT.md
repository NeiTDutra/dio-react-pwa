# Documentação

## PWA (Progressive Web App)

*"Progressive Web App (PWA) é um termo usado para denotar uma nova metodologia de desenvolvimento de software. Ao contrário dos tradicionais aplicativos, um Progressive Web App pode ser visto como uma evolução híbrida entre as páginas da web regulares (ou sites) e um aplicativo móvel. Este novo modelo de aplicação combina recursos oferecidos pelos mais modernos navegadores, com as vantagens de uso de um celular."*

Fonte [https://pt.wikipedia.org/wiki/Progressive_web_app](https://pt.wikipedia.org/wiki/Progressive_web_app)

## Desenvolvimento

### Iniciando React App

```bash
$ npx create-react-app noticias-pwa
```
### Modificando arquivo manifest.json

*manifest.json*

```json
{
  "short_name": "PWA NEWS",//aqui
  "name": "PWA NEWS",//aqui
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "./",//aqui
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```
### Modificando App.js

- Modificação do App.js para utilizar com rotas
- Criando arquivo containers/Home.js 

*App.js*

```javascript
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './containers/Home';

function App() {
  return (
    <main>
      <section>
        <Router>
          <div>
            <Switch>
              <Route path="/:subject/:id">
                  <Post/>
              </Route>
              <Route path="/">
                <div>
                  <Home/>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </section>
    </main>
  );
}

export default App;

```
### Desenvolvendo api.js

- Trata das requisições à api
- Mais sobre a api [neste link](https://github.com/NeiTDutra/dio-react-pwa-api)

*api.js*

```javascript
const params = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

const URL = 'http://localhost:3005/api';

function getNews(subject) {
    return (
        fetch(`${URL}/${subject}`, params)
        .then((response) => response.json())
        .catch((err) => {
            console.log('One error is ocurred', err);
        })
    );
}

function getNewsById(subject, id) {
    return (
        fetch(`${URL}/${subject}/${id}`, params)
        .then((response) => response.json())
        .catch((err) => {
            console.log('One error is ocurred', err);
        })
    );
}

export default {
    getNews,
    getNewsById
}
```

### Desenvolvendo o front end

Basicamente são dois arquivos:

- [Home.js]()
- [Post.js]()
