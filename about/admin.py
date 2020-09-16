from django.contrib import admin

# Register your models here.

from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = [
        'author',
        'contact',
        'date',
        'text',
    ]

# RTG: s.b. the same as @admin decorator above
# admin.site.register(Post, PostAdmin)
