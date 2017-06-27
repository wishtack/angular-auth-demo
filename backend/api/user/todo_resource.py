#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.api.user.todo_serializer import TodoSerializer
from backend.todo.todo_store import TodoStore
from backend.token.token_store import TokenStore


class IsTodoOwner(BasePermission):

    def has_permission(self, request, view):

        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        if authorization_header is None:
            return False

        token = authorization_header.split(' ')[1]

        return TokenStore().check_token(username=view.kwargs.get('user_pk'), token=token)


class TodoResource(ViewSet):

    permission_classes = [
        # @todo uncomment line to enable authorization.
        # IsTodoOwner
    ]

    def list(self, request, user_pk):

        todo_list = TodoStore().get_todo_list(username=user_pk)

        serializer = TodoSerializer(instance=todo_list, many=True)

        return Response(serializer.data)
