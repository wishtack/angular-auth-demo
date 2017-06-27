#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

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

    def get_todo_list(self, username):

        return self._todo_list_map.get(username)
