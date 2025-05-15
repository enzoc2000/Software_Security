#!/bin/bash
# Generates private keys for accounts
mkdir -p accounts
for i in {1..5}
do
  openssl rand -hex 32 > accounts/key$i.txt
done