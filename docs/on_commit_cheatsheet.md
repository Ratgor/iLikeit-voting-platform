# Before a commit

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

4. test run of backend dev server at localhost:8000,  

``` bash
python manage.py runserver # test run at localhost:8000
```
> browser cache clean may be required
  for changes make the effect  

5. and commit it all:

``` bash
git status && git add --dry-run . # check files for commit
git add . && git commit && git push origin # --force
```
