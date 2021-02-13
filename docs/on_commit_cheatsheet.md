# Before a commit


## Test #1 backend (Django dev server)
1. open `Git Bash Here`  
2. $ `pipenv shell` # start python environment, use `exit` to stop
3. $ `python manage.py runserver` # test run at localhost:8000
4. if no err/warns in console - that's ok for the beginning


## Test #2 frontend (React JS dev server)
0. backend dev server must be launched (see above),
1. open another `Git Bash Here`  
2. $ `pipenv shell` # start python environment
3. $ `cd frontend/ && npm start` # dev srv at http://localhost:3000
4. if no err/warns in console - that's ok


## Build frontend and backend, test #3 and commit

0. Start python dev environment if required,

``` bash
pipenv shell # if required, error-safe
```

1. Build and minify ReactJS to main.js,  

``` bash
cd frontend/ && npm run build && cd ..
```

2. collect Django site static files,  

``` bash
echo yes | python manage.py collectstatic
```

3. update local database,  

``` bash
python manage.py makemigrations && python manage.py migrate
```

4. run backend dev server,  

``` bash
python manage.py runserver # test run at localhost:8000
```
5. open localhost:8000 for manual testing

> browser cache clean may be required
  for frontend changes make the effect  

6. and commit it all:

``` bash
git log --graph --decorate --oneline --all # show commits tree
git status && git add --dry-run . # check files for commit
git add . && git commit && git push origin # --force
```
