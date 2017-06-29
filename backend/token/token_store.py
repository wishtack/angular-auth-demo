#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
import binascii
import os

from backend.token.invalid_credentials_error import InvalidCredentialsError
from backend.token.invalid_token_error import InvalidTokenError
from backend.token.token import Token


class TokenNotFoundError(Exception):
    pass


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

        token_obj = self._get_user_credentials(username=username).get('token')
        if token_obj is None:
            return False

        return token_obj.token == token

    def create_token(self, username, password):

        if password is None:
            raise InvalidCredentialsError()

        if self._get_user_credentials(username=username).get('password') != password:
            raise InvalidCredentialsError()

        token = self._generate_token(user_id=username)
        self._user_credentials_map[username]['token'] = token
        return token

    def get_token(self, token_id):

        for token_obj in self._get_token_obj_list():

            if token_obj.id == token_id:
                return token_obj

        return None

    def check_token_validity(self, token):

        if token not in [obj.token for obj in self._get_token_obj_list()]:
            raise InvalidTokenError()

    def remove_token(self, token_id):

        for user in self._user_credentials_map.values():

            if user['token'] is None:
                continue

            if user['token'].id == token_id:
                user['token'] = None
                return

        raise TokenNotFoundError()

    def _generate_token(self, user_id):
        return Token(
            id=self._token_hex(byte_count=10),
            token=self._token_hex(byte_count=32),
            user_id=user_id
        )

    def _get_token_obj_list(self):
        token_list = [user['token'] for user in self._user_credentials_map.values()]
        return [token for token in token_list if token is not None]

    def _get_user_credentials(self, username):
        return self._user_credentials_map.get(username, {})

    def _token_hex(self, byte_count):
        return binascii.hexlify(os.urandom(byte_count)).decode('ascii')