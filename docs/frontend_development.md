# Frontend development manual

## links
[Integrating React with Django](https://www.valentinog.com/blog/drf/#django-rest-with-react-django-and-react-together)  
[SPA using react-router](https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm)  
[React Routing with Django url](https://stackoverflow.com/questions/40826295/react-routing-and-django-url-conflict)
[REST auth and notes example](http://v1k45.com/blog/)
[Backend permissions #1](https://habr.com/ru/post/505156/)
[Backend permissions #2](https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#tutorial-4-authentication-permissions)

## Architecture / process
1. Django frontend app
2. webpack for frontend bundling
2.1 webpack v4 +/- create-react-app (CRA)
2.2 webpack v5 with custom (https://habr.com/ru/post/524260/)
3. dev server for on-the-fly frontend preview
3.1 dev server from CRA (node?)
3.2 webpack-dev-server (for bundle?)
4. React JS for frontend development
// node, npm, npx and yarn somewhere near...
// use package json or create a new one with npm init -y


// crypto-js troubles
// https://ru.stackoverflow.com/questions/1145063/


## Starting / frontend dev environment setup

There are some options on how-to-start with frontend:  
1. ready-to-use `project.json` (Recommended)  
2. starting from clean working dir  
3. starting with Create React App (CRA)  
4. manual setup and configuration of a dev env (TODO)
5. starting with Django App (DjA)  

> Note: both, React and Django projects are based on file structure.  
That means the special or traditional project directory tree and file names are required.  
For fast-creation of such file structures special tools  
like DjA and CRA are designed.  
TODO: (optional) reinvent my own bicycle for that  


### 1. ready-to-use `project.json` (Recommended)  

1.1 clone the project from github, then go to `frontend` dir.  

1.2 remove `node_modules` dir and `package-lock.json`, `yarn.lock` files if presented.  

1.3 install dependencies from `package.json`:

``` bash
npm install
```
1.4 test frontend dev server and build tools:

``` bash
npm start # run dev server via `run-scripts start` for development
npm run dev # run webpack in dev mode to make a dist bundle
npm run build # run webpack in prod mode to make a dist bundle
```

### 2. start from clean working dir

2.1 Make frontend dir and new `package.json`

``` bash
mkdir -p frontend && cd ./frontend # should be empty
npm init -y # (re)creates `package.json`
```

2.2 add proxy and start scripts to the `package.json` :
```
"proxy": "http://localhost:8000",
"scripts": {
  "start": "react-scripts start",
  "dev": "webpack --mode development ./src/index.js --output-path ./static/frontend/",
  "build": "webpack --mode production ./src/index.js --output-path ./static/frontend/"
}
```
> Note: Is it was discovered at the last check,  
the new webpack cli syntax is:  
`--output-path ./static/frontend/`  
the old syntax was:  
`--output ./static/frontend/main.js`

> Info: proxy for redirecting (sharing) requests  
from frontend dev server to backend dev server  
in development  

2.3 install required packages, be careful with version compatibility
``` bash
npm i webpack@4.44.2 webpack-cli webpack-dev-server @babel/core babel-loader @babel/preset-env @babel/preset-react style-loader css-loader file-loader react react-dom react-router-dom react-bootstrap bootstrap crypto-js react-scripts --save-dev
```

2.4 test frontend dev server and build tools:

``` bash
npm start # run dev server via `run-scripts start` for development
npm run dev # run webpack in dev mode to make a dist bundle
npm run build # run webpack in prod mode to make a dist bundle
```


### 3. starting with Create React App (CRA)  

CRA include react-scripts module for easy dev server start (`npm start`) and webpack & babel build (`npm run build`).  

Its' main problem - the configuration of this tools is hidden and rather difficult.

Its' main advantage - all is configured out-of-the-box and is prepared to start studying or development with React.

``` bash
npx create-react-app frontend
```  

or  

``` bash
mkdir -p frontend && cd ./frontend
npm init react-app .
```

and finally

``` bash
npm start # for dev serv is runnable test
```

> Do not install create-react-app and react-scripts globally\!  
(at the same time many manuals do so, and I did)  
(npm uninstall -g create-react-app react-scripts # if required)

> Do not install (neq) webpack webpack-cli over CRA-based project  
(it has incompatibility with webpack versions required by react-scripts)  
(The only way I found to handle both at the same time - init all by `npm install` & `package.json` without webpack version specified, like in option 4. below)


### 4. manual setup and configuration of a dev env (TODO)  

To make my own CRA and/or DjA, some time, may be.  
But some note are alredy presented:  

4.1 new webpack.config.js
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

4.2 new .babelrc
```
{
    "presets": [
        "@babel/preset-env", "@babel/preset-react"
    ]
}
```
(If getting "regeneratorRuntime is not defined" use another,  
look for it by link above)



### 5. start Django App (DjA)  

DjA - is not about fronted, but for backend development.  
That's a way to create files for integration with backend.  
That files should be combined (biult in) React project **manually**:  
 - `views.py`, for `index.html`  rendering entry point  
 - `urls.py`, for redirecting routes to fronted-app components
 - `apps.py`, `__init__.py`, and app config (the dir name should be `frontend` and be included into INSTALLED_APPS section of `backend/settings.py`)  


#### Frontend as DjA

> Note: Sometime we had to manually overlap DjA and CRA project files in one dir


New app in clean dir:

``` bash
frontend_dir=frontend

django-admin startapp ${frontend_dir}
mkdir -p ./${frontend_dir}/src/components
mkdir -p ./${frontend_dir}/{static,templates}/${frontend_dir}
```

#### React environment setup

The same as ### 2. above:

``` bash
frontend_dir=frontend

cd ./${frontend_dir} && npm init -y
npm i webpack@4.44.2 webpack-cli webpack-dev-server --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i style-loader css-loader --save-dev
npm i file-loader --save-dev
npm i react react-dom react-router-dom --save-dev
npm i react-bootstrap bootstrap --save-dev
npm i react-scripts --save-dev
npm i crypto-js --save-dev
```

or the same as ### 3. above:

``` bash
npm init react-app ${frontend_dir}
```


#### Update Django frontend and backend files

This is required to connect new DjA to Django project:  

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
```
...  
```

add ./frontend/src/index.js
```
import App from "./components/App";
```

#### create or update backend database


``` bash
python manage.py makemigrations # prepare to migrate
python manage.py migrate # add new model to database
```


#### Starting both frontend and backend dev servers   

You will need two bash consoles for that:

``` bash
python manage.py runserver
npm start
```


#### migrate from frontend-dev to frontend2 if required

> Outdated:  
to avoid manual migrations,  
you may manually copy react-app over django-app,  
tune up package.json,  
and use that one dir for all

if the react app was created in default way  
(with `<div id="root"></div>` in index.html for embedding react app)
then just keep all in src dir,  
and to move it to the src if django frontend app.  
then run configured webpack for django frontend app.  
then move forward with to django collectstatic.  

then, before each commit:  
copy frontend-dev/src to /frontend2/src and  
frontend-dev/public to /frontend2/templates (if required)  
