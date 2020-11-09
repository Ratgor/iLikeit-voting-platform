## taken from
## https://stackoverflow.com/questions/25151586/django-rest-framework-retrieving-object-count-from-a-model

## check for a variant of performance optimization
## https://marselester.com/drf-pagination.html

## usage/implementation
# from .mixins import CountModelMixin
# class NoteViewSet(viewsets.ModelViewSet, CountModelMixin):

## usage/request
# fetch("/api/notes/count", {method: "GET", ...


from rest_framework.decorators import action
from rest_framework.response import Response

class CountModelMixin(object):
    """
    Count a queryset.
    """
    @action(detail=False)
    def count(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        content = {'count': queryset.count()}
        return Response(content)
