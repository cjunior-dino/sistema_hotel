
from django.utils import migrations
from rest_framework import filters


class Migration(migrations.Migration):
    dependencies = [
        ('accounts', '0001_initial'),
    ]
    operations = [
        migrations.RunSQL("CREATE EXTENSION IF NOT EXISTS unaccent;"),
    ]
