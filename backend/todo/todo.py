#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

from synthetic import synthesize_constructor, synthesize_property


@synthesize_constructor()
@synthesize_property('id')
@synthesize_property('description')
class Todo(object):
    pass
