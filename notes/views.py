from django.shortcuts import render

# Create your views here.

# RTG: api.py, according to the example.
# For separate acees to authorized resourses see
# "Restricting NotesAPI to authenticated users" here:
# http://v1k45.com/blog/modern-django-part-3-creating-an-api-and-integrating-with-react/

from rest_framework import viewsets, permissions, authentication

from .models import Note
from .serializers import NoteSerializer
from .permissions import IsOwner, IsStaff

from rest_framework.generics import get_object_or_404


class NoteViewSet(viewsets.ModelViewSet):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    ## Another example from https://stackoverflow.com/questions/26906630/django-rest-framework-authentication-credentials-were-not-provided#
    # authentication_classes = (SessionAuthentication, BasicAuthentication, TokenAuthentication)
    # permission_classes = (IsAdminOrReadOnly,)

    ## Allow owner only version (not tested):
    authentication_classes = [authentication.TokenAuthentication, ]
    # permission_classes = [permissions.AllowAny, ]
    permission_classes = [((permissions.IsAuthenticated & IsOwner) | IsStaff), ]
    #permission_classes = [(permissions.IsAuthenticated  | permissions.IsAdminUser), ]

    # This one makes to return only current users' notes
    def get_queryset(self):
        print('DEBUG (2) ->', self.request.method, 'notes by', self.request.user)

        if self.request.user.is_staff:
            # show all notes of all users to admin (staff) users
            return Note.objects.all()
        else:
            return self.request.user.notes.all()
            # the above looks like the same as the below:
            # user_notes = self.queryset.filter(owner=self.request.user)
            # return user_notes

    # this will add user to a note and allow filtering by it
    def perform_create(self, serializer):
        print('DEBUG (3) ->', self.request.method, 'notes by', self.request.user)
        serializer.save(owner=self.request.user)

    # this override is optionsl, it looks like in has th default on_delete behavior
    def perform_destroy(self, instance):
        print('DEBUG (4) ->', self.request.method, 'notes by', self.request.user)
        instance.delete()

    """
        # override the default behavior for DELETE verb
        # (it is not allowed by default if not AllowAny permission selected)
        # https://stackoverflow.com/questions/53089991/allowany-permissions-required-for-delete-requests-in-drf
        def get_permissions(self):
            print('DEBUG (1) ->', self.request.method, 'notes by', self.request.user)
            if self.request.method == 'DELETE':
                return [permission() for permission in (permissions.AllowAny,)]
            else:
                return super(NoteViewSet, self).get_permissions()
    """

    """
        def delete(self, request, pk):
            print('DEBUG (4) ->', self.request.method, 'notes by', self.request.user)
            # Get object with this pk
            target_note = get_object_or_404(Note.objects.all(), pk=pk)
            target_note.delete()
            return Response({
                "message": "Note with id `{}` has been deleted.".format(pk)
            }, status=204)

    """
