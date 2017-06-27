#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
import random
import string


class InvalidCredentials(Exception):
    pass


class TokenStore(object):

    _user_credentials_map = {
        u"foobar": {
            'password': u"123456",
            'token': None
        },
        u"johnbar": {
            'password': u"654321",
            'token': None
        }
    }

    def check_token(self, username, token):

        if token is None:
            return False

        return self._user_credentials_map.get(username).get('token') == token

    def create_token(self, username, password):

        if password is None:
            raise InvalidCredentials()

        if self._user_credentials_map.get(username).get('password') != password:
            raise InvalidCredentials()

        token = self._generate_token()
        self._user_credentials_map[username]['token'] = token
        return token

    def _generate_token(self):
        return u"".join(random.choice(string.lowercase) for _ in range(32))
