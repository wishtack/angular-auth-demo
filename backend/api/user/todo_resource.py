#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.api.user.is_todo_owner_permission import IsTodoOwnerPermission
from backend.api.user.todo_serializer import TodoSerializer
from backend.lib.permission.token_required_permission import TokenRequiredPermission
from backend.todo.todo_store import TodoStore


class TodoResource(ViewSet):

    permission_classes = [
        TokenRequiredPermission,
        IsTodoOwnerPermission
    ]

    def list(self, request, user_pk):

        todo_list = TodoStore().get_todo_list(username=user_pk)

        serializer = TodoSerializer(instance=todo_list, many=True)

        return Response(serializer.data)
