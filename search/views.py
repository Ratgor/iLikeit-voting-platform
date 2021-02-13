from django.shortcuts import render

# Create your views here.

import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

@csrf_exempt
@require_POST
def searchView(request):
    #return HttpResponse('Any text for test', status=200)
    request_body_unicode = request.body.decode('utf-8')
    request_body_json = json.loads(request_body_unicode)
    print('DEBUG request body json:', request_body_json)
    searchString = request_body_json['searchString']

    if searchString.endswith('='):
        # I know it is dangerous
        # like "__import__('os').listdir()=" and more...
        # https://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html
        # https://habr.com/ru/post/221937/
        expression = searchString[:-1]
        #result = eval(compile(expression, 'script', 'eval'))
        try:
            result = eval(expression)
        except Exception as e:
            result = str(e)
    else:
        result = 'not found (search is not implemented yet)'

    searchResult = {'searchString': searchString, 'result': result}

    response = JsonResponse(searchResult)
    response.status = 200
    return response
