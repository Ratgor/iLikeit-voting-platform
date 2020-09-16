from django.shortcuts import render

# Create your views here.

def git_self_pull():
    import git
    # pull from remote origin to the current working dir
    git.cmd.Git().pull('https://github.com/Ratgor/iLikeit-voting-platform','master')

# https://blog.bearer.sh/consume-webhooks-with-python/

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

@csrf_exempt
@require_POST
def selfupdate(request):
    print(f"DEBUG webhook (method #1): {request}")
    git_self_pull()
    print(f"DEBUG git pull finished. (method #1)")
    return HttpResponse('Got it. (this is the webhook response)', status=200)

# https://medium.com/@raiderrobert/how-to-make-a-webhook-receiver-in-django-1ce260f4efff

import copy, json, datetime
from django.utils import timezone
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import WebhookTransaction

@csrf_exempt
@require_POST
def webhook(request):
    jsondata = request.body
    if jsondata == b'':
        print("ERROR: request.body (jsondata) is empty")
    data = json.loads(jsondata)
    meta = copy.copy(request.META)
    for key in list(meta):
        if not isinstance(meta[key], str):
            del meta[key]

    WebhookTransaction.objects.create(
        date_event_generated = datetime.datetime.fromtimestamp(
            data['timestamp']/1000.0
                if 'timestamp' in data else 0.0,
            tz=timezone.get_current_timezone()
        ),
        body=data,
        request_meta=meta
    )

    print(f"DEBUG webhook (method #2): {data}")
    git_self_pull()
    print(f"DEBUG git pull finished. (method #2)")

    return HttpResponse(status=200)
