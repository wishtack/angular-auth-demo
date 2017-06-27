#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework import serializers


class TodoSerializer(serializers.Serializer):

    text = serializers.CharField(read_only=True)
