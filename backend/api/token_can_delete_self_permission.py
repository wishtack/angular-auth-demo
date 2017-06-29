#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
from rest_framework.permissions import BasePermission

from backend.token.token_store import TokenStore


class TokenCanDeleteSelfPermission(BasePermission):

    def has_permission(self, request, view):

        if request.method != u"DELETE":
            return True

        token_obj = TokenStore().get_token(token_id=view.kwargs.get('pk'))

        if token_obj is None:
            return False

        if token_obj.token != request.auth:
            return False

        return True