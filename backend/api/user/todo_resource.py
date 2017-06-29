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

    def create(self, request, user_pk):

        todo = TodoSerializer().to_internal_value(data=request.data)

        todo = TodoStore().add_todo(user_id=user_pk, todo=todo)

        return Response(TodoSerializer(instance=todo).data)

    def list(self, request, user_pk):

        todo_list = TodoStore().get_todo_list(user_id=user_pk)

        return Response(TodoSerializer(instance=todo_list, many=True).data)
