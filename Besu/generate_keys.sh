#!/bin/bash
mkdir -p accounts
for i in {1..5}
do
  openssl rand -hex 32 > accounts/key$i.txt
done