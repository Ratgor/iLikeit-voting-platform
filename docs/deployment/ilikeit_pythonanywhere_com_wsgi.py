# +++++++++++ DJANGO +++++++++++
# To use your own django app use code like this:
import os
import sys

# assuming your django settings file is at '/home/iLikeit/backend/settings.py'
# and your manage.py is is at '/home/iLikeit/manage.py'
path = '/home/iLikeit'
if path not in sys.path:
    #sys.path.append(path) # default one
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

## Uncomment the lines below depending on your Django version
###### then, for Django >=1.5:
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
###### or, for older Django <=1.4
#import django.core.handlers.wsgi
#application = django.core.handlers.wsgi.WSGIHandler()
