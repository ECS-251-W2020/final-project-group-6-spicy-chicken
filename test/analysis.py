#!/usr/bin/env python
# -*- coding: utf-8 -*-
#########################################################################
# File Name: analysis.py
# Author : Wenjing Fan
# Email: fwjfan@ucdavis.edu
# Created Time: Wed Mar  4 01:19:54 2020
# print the most five frequently appeared locations
#########################################################################
import json
from pandas import DataFrame
with open("list.txt",'r') as load_f:
    dicList = json.load(load_f)
frame=DataFrame(dicList)
#print(frame['Location'].value_counts()[:5])

#if not enough, fill with missing
locList=frame['Location'].fillna('Missing')
locList[locList =='']='Unknown'
print(locList.value_counts()[:5])

