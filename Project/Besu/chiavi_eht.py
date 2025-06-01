from eth_keys import keys

private_key_hex = "7a18769fc1e450f623619bb54b67e118a2462ae5f8f4be8f066de5a77cfc3cf1"
pk = keys.PrivateKey(bytes.fromhex(private_key_hex))
print(pk.public_key.to_checksum_address())