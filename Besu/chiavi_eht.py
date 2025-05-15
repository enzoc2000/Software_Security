from eth_keys import keys

private_key_hex = "d5f789e4793b7b4a1fa48366605a933542fdc7efd9efa7fc61791992a4e9de1b"
pk = keys.PrivateKey(bytes.fromhex(private_key_hex))
print(pk.public_key.to_checksum_address())