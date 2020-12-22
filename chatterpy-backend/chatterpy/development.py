import os
from decouple import config

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "dummykey"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

SITE_DOMAIN = "http://127.0.0.1:8000"

ALLOWED_HOSTS = ["127.0.0.1", "api.chatterpy.com", "test.chatterpy.com", "devpytherapp.ngrok.io"]

if not config("SQLITE", cast=bool):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "NAME": config("DEV_DB_NAME"),
            "USER": config("DEV_DB_USER"),
            "PASSWORD": config("DEV_DB_PASSWORD"),
            "HOST": config("DEV_DB_HOST"),
            "PORT": config("DEV_DB_PORT"),
        }
    }
else:
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": os.path.join(BASE_DIR, "db.sqlite3"),}}


if config("REMOTE_MEDIA_SERVER", cast=bool):
    REMOTE_MEDIA_SERVER_IN_USE = True  # Used by tests make sure they don't attempt to cleanup on remote media
    DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
    AWS_STORAGE_BUCKET_NAME = config("DO_STORAGE_BUCKET_NAME")
    AWS_S3_REGION_NAME = config("DO_STORAGE_REGION")
    AWS_S3_ENDPOINT_URL = "https://{0}.{1}.digitaloceanspaces.com".format(AWS_STORAGE_BUCKET_NAME, AWS_S3_REGION_NAME)
    AWS_ACCESS_KEY_ID = config("DO_STORAGE_KEY")
    AWS_SECRET_ACCESS_KEY = config("DO_STORAGE_SECRET")
    MEDIA_URL = AWS_S3_ENDPOINT_URL + "media/"
else:
    REMOTE_MEDIA_SERVER_IN_USE = False

# Email Settings
EMAIL_HOST = "smtp.sendgrid.net"
EMAIL_HOST_USER = "apikey"
EMAIL_HOST_PASSWORD = "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"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
