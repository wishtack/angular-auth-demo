#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
import random
import string

from backend.token.invalid_credentials_error import InvalidCredentialsError
from backend.token.invalid_token_error import InvalidTokenError


class TokenStore(object):

    _user_credentials_map = {
        u"foobar": {
            'password': u"123456",
            'token': None
        },
        u"johndoe": {
            'password': u"654321",
            'token': None
        }
    }

    def has_permission(self, username, token):

        if token is None:
            return False

        return self._get_user_credentials(username=username).get('token') == token

    def create_token(self, username, password):

        if password is None:
            raise InvalidCredentialsError()

        if self._get_user_credentials(username=username).get('password') != password:
            raise InvalidCredentialsError()

        token = self._generate_token()
        self._user_credentials_map[username]['token'] = token
        return token

    def check_token_validity(self, token):

        token_list = [user['token'] for user in self._user_credentials_map.values()]

        if token not in token_list:
            raise InvalidTokenError()

    def _generate_token(self):
        return u"".join(random.choice(string.lowercase) for _ in range(32))

    def _get_user_credentials(self, username):
        return self._user_credentials_map.get(username, {})