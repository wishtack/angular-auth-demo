#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.api.user.todo_serializer import TodoSerializer


class TodoResource(ViewSet):

    def list(self, request, user_pk):

        serializer = TodoSerializer([{}], many=True)

        return Response(serializer.data)
