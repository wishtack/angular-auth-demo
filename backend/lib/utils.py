#-*- coding: utf-8 -*-
#
# (c) 2013-2017 Wishtack
#
# $Id: $
#

import binascii
import os


class Utils(object):

    def get_hex_token(self, byte_count):
        return binascii.hexlify(os.urandom(byte_count)).decode('ascii')
