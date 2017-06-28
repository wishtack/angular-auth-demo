#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from backend.token.invalid_token_error import InvalidTokenError
from backend.token.token_store import TokenStore


class TokenAuthenticator(BaseAuthentication):

    def authenticate(self, request):

        authorization_header = request.META.get('HTTP_AUTHORIZATION')

        if authorization_header is None:
            return None

        item_list = authorization_header.split(' ')

        if len(item_list) < 2:
            raise AuthenticationFailed()

        token = item_list[1]

        try:
            TokenStore().check_token_validity(token=token)
        except InvalidTokenError:
            raise AuthenticationFailed()

        return (None, token)

    def authenticate_header(self, request):
        return u"Bearer"
