from django.db import models

# Create your models here.


from django.contrib.auth.models import User

class Contact(models.Model):

    # whos' the contact belong to?
    #owners = models.ForeignKey(
    owners = models.ManyToManyField(
                User,
                related_name="contacts",
                #on_delete=models.CASCADE,
                # how about shared contacts?
                # and partially-shared details?
                null=True,
                blank=True,
                )

    # are there any real users, who are mentioned in the contact?
    relatedUsers = models.ManyToManyField(
                User,
                related_name="relatedUsers",
                #on_delete=models.CASCADE,
                # how about shared contacts?
                # and partially-shared details?
                null=True,
                blank=True,
                )


    # what features the contact has?

    # model with list of models
    # https://stackoverflow.com/questions/18415130/
    # diff many-to-many, one-to-many, many-to-one
    # https://stackoverflow.com/questions/25386119/


class Feature(models.Model):

    # what contacts the feature belongs to?
    relatedContacts = models.ManyToManyField(
                Contact,
                related_name="contacts",
                #on_delete=models.CASCADE,
                # how about shared contacts?
                # and partially-shared details?
                null=True,
                blank=True,
                )

    header = models.TextField(blank=True,null=True)
    content = models.TextField(blank=True,null=True)
    tags = models.JSONField(blank=True,null=True)
    date = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(blank=False,default=False)
    encrypted = models.BooleanField(blank=False,default=True)

    # type (name/phone/address/note/etc)
    # hash-tags (???)
    # header (short name/content or the same as above?)
    # content (main text)
    # date (when the note/feature was actual)
    # verified (checked by owner or somebody else)
    ## !!! how to verify associatedUsers?
