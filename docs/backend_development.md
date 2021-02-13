# Backed development cheat sheet


## Start a command-line shell,
e.g. on Windows:  
1. go to `H:\Work\Git\iLikeit-vp`  
2. right click & select `Git Bash Here`
3. $ `python -V` # expected "Python 3.8.5"
4. $ `python -m pip freeze` # expected Pipenv and Django in the list
5. $ `pipenv shell` # to load python environment of the project


## Create a dir and files for new Django app (DjA),  
e.g. app name will be "appname":

1. Git bash: $ `django-admin startapp appname`

2. Add 'appname' to `backend/settings.py` `INSTALLED_APPS` section  

3. Create models for database representation in `appname/models.py`   (ignore it if the app shouldn't store anything in database)  

4. Create serializers for converting models (database values) into python values in `appname/serializers.py`  
https://www.django-rest-framework.org/tutorial/1-serialization/  
(same ignore reasons, as above)  

5. Create an API view for updating model object instances via serializers in `appname/views.py`  
(actually, the view will get & process requests to the backend app form a frontend, see https://docs.djangoproject.com/en/3.1/ref/class-based-views/base/)

> Take care about special permissions for owner-based model access

> And about mixins for re-using parts of views

6. Connect the views with url in `appname/urls.py` and/or `backend/urls.py`
