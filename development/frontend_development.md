# Frontend development manual

## links
[Integrating React with Django](https://www.valentinog.com/blog/drf/#django-rest-with-react-django-and-react-together)  
[SPA using react-router](https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm)  
[React Routing with Django url](https://stackoverflow.com/questions/40826295/react-routing-and-django-url-conflict)


## Environment setup

``` bash
frnd_dir=frontend

django-admin startapp ${frnd_dir}
mkdir -p ./${frnd_dir}/src/components
mkdir -p ./${frnd_dir}/{static,templates}/${frnd_dir}

cd ./${frnd_dir} && npm init -y
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i style-loader css-loader --save-dev
npm i react react-dom react-router-dom --save-dev
npm i react-bootstrap bootstrap --save-dev
npm i file-loader --save-dev
```

```
npm init react-app ${frnd_dir}
```


add to package.json
```
"proxy": "http://localhost:8000",
"scripts": {
  "dev": "webpack --mode development ./src/index.js --output ./static/frontend/main.js",
  "build": "webpack --mode production ./src/index.js --output ./static/frontend/main.js"
}
```

new .babelrc
```
{
    "presets": [
        "@babel/preset-env", "@babel/preset-react"
    ]
}
```
(If getting "regeneratorRuntime is not defined" use another,  
look for it by link above)

new webpack.config.js
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }S,
    ]
  }
};

```

## Frontend files

edit ./frontend/views.py
```
from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')
```

new ./frontend/templates/frontend/index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>iLikeit-vp</title>
  </head>
  <body>
    <div id="app">
        <!-- React will load here -->
    </div>
  </body>
  {% load static %}
  <script src="{% static "frontend/main.js" %}"></script>
</html>

```

add to ./backend/urls.py
```
urlpatterns = [
    path('', include('frontend.urls')),
]

# handle the routes are defined in the React Routed
# gag: jest redirect all that to fromtend
urlpatterns += [
    # match the root
    re_path(r'^$', include('frontend.urls')),
    # match all other pages
    re_path(r'^(?:.*)/?$', include('frontend.urls')),
]
```

new ./frontend/urls.py
```
from django.urls import path
from . import views


urlpatterns = [
    path('', views.index ),
]
```

add to ./backend/settings.py
```
INSTALLED_APPS = [
    'frontend',
]
```

edit ./frontend/src/components/App.js  
...  

add ./frontend/src/index.js
```
import App from "./components/App";
```


```
npm run dev
python manage.py runserver
```


## Subproject for fast react development

``` bash

mkdir -p frontend-dev
npm init react-app .
npm i react-router-dom --save-dev && npm audit fix
npm i react-bootstrap
npm i react-dom reactstrap
npm i react-router-redux

```

## migrate from frontend-dev to frontend2
if the react app was created in default way  
(with `<div id="root"></div>` in index.html for embedding react app)
then just keep all in src dir,  
and to move it to the src if django frontend app.  
then run configured webpack for django frontend app.  
then move forward with to django collectstatic.  

> to avoid manual migrations,  
you may manually copy react-app over django-up,  
tune up package.json,  
and use that one dir for all
