#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework import serializers


class TokenSerializer(serializers.Serializer):

    token = serializers.CharField(read_only=True)
    user_id = serializers.CharField(read_only=True)
