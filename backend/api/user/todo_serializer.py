#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from rest_framework import serializers

from backend.todo.todo import Todo


class TodoSerializer(serializers.Serializer):

    id = serializers.CharField(read_only=True)
    description = serializers.CharField()

    def to_internal_value(self, data):

        return Todo(**super(TodoSerializer, self).to_internal_value(data))