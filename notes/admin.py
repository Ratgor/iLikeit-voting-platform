from django.contrib import admin

# Register your models here.

from .models import Note

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = [
        'owner',
        'created_at',
        'text',
    ]

# RTG: s.b. the same as @admin decorator above
# admin.site.register(Note, NoteAdmin)
