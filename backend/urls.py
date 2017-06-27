"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter

from backend.api.token_resource import TokenResource
from backend.api.user.todo_resource import TodoResource
from backend.api.user_resource import UserResource

router = SimpleRouter(trailing_slash=False)
router.register(r'tokens', TokenResource, base_name='token')
router.register(r'users', UserResource, base_name='user')

user_router = NestedSimpleRouter(router, r'users', lookup='user', trailing_slash=False)
user_router.register(r'todos', TodoResource, base_name='todo')

urlpatterns = [
    url(r'^api/v1/', include(
        router.urls
        + user_router.urls
    )),
]

