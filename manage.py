#!/usr/bin/env python
import gevent.monkey
import os
import sys

from django.core.management.commands import runserver

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # The above import may fail for some other reason. Ensure that the
        # issue is really that Django is missing to avoid masking other
        # exceptions on Python 2.
        try:
            import django
        except ImportError:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            )
        raise

    # Enable gevent.
    gevent.monkey.patch_all()

    # Disable migration check.
    # 1 - We don't need it. Who is using SQL anyway???
    # 2 - It's not gevent friendly.
    runserver.Command.check_migrations = lambda *args, **kwargs: None

    execute_from_command_line(sys.argv)
