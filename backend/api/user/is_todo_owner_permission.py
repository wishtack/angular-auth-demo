#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
from rest_framework.permissions import BasePermission

from backend.token.token_store import TokenStore


class IsTodoOwnerPermission(BasePermission):

    def has_permission(self, request, view):
        return TokenStore().has_permission(username=view.kwargs.get('user_pk'), token=request.auth)