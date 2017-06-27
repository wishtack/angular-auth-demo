# -*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.api.token_serializer import TokenSerializer


class TokenResource(ViewSet):

    def list(self, request):

        serializer = TokenSerializer([{}], many=True)

        return Response(serializer.data)
