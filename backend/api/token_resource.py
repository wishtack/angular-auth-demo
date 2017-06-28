# -*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.api.credentials_serializer import CredentialsSerializer
from backend.api.token_serializer import TokenSerializer
from backend.token.invalid_credentials_error import InvalidCredentialsError
from backend.token.token_store import TokenStore


class TokenResource(ViewSet):

    def create(self, request):

        credentials = CredentialsSerializer().to_internal_value(data=request.data)

        token_store = TokenStore()

        try:
            token = token_store.create_token(username=credentials['username'], password=credentials['password'])
        except InvalidCredentialsError:
            raise PermissionDenied()

        serializer = TokenSerializer(instance={
            'user_id': credentials['username'],
            'token': token
        })

        return Response(serializer.data)
