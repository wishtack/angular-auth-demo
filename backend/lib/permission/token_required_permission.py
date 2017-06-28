#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
from rest_framework.exceptions import NotAuthenticated
from rest_framework.permissions import BasePermission


class TokenRequiredPermission(BasePermission):

    def has_permission(self, request, view):

        if request.auth is None:
            raise NotAuthenticated()

        return True
