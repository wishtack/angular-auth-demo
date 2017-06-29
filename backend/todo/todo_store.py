#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#
import copy

from backend.lib.utils import Utils
from backend.todo.todo import Todo


class TodoStore(object):

    _todo_list_map = {
        u"foobar": [
            Todo(id=u"0", description=u"Learn Python"),
            Todo(id=u"1", description=u"Learn TypeScript"),
            Todo(id=u"2", description=u"Learn Angular")
        ],
        u"johndoe": [
            Todo(id=u"0", description=u"Learn Kafka Streams")
        ]
    }

    def add_todo(self, user_id, todo):

        todo = copy.copy(todo)
        todo.id = Utils().get_hex_token(10)
        self._todo_list_map[user_id].append(todo)

        return todo

    def get_todo_list(self, user_id):

        return self._todo_list_map[user_id]
