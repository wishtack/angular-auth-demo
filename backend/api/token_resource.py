# -*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from backend.api.credentials_serializer import CredentialsSerializer
from backend.api.token_can_delete_self_permission import TokenCanDeleteSelfPermission
from backend.api.token_serializer import TokenSerializer
from backend.token.invalid_credentials_error import InvalidCredentialsError
from backend.token.token_store import TokenStore, TokenNotFoundError


class TokenResource(ViewSet):

    permission_classes = [
        TokenCanDeleteSelfPermission
    ]

    def create(self, request):

        credentials = CredentialsSerializer().to_internal_value(data=request.data)

        try:
            token = TokenStore().create_token(username=credentials['username'], password=credentials['password'])
        except InvalidCredentialsError:
            raise AuthenticationFailed()

        serializer = TokenSerializer(instance=token)

        return Response(serializer.data)

    def destroy(self, request, pk):

        try:
            TokenStore().remove_token(token_id=pk)
        except TokenNotFoundError:
            raise NotFound()

        return Response()
