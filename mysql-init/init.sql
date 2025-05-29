-- Inizializzazione del database MySQL
SELECT VERSION();
-- Creazione del database
CREATE DATABASE IF NOT EXISTS food_supply_chain;

-- Usa il database appena creato
USE food_supply_chain;


-- Creazione della tabella "role_thresholds" 
-- Le soglie per i ruoli fanno riferimeto ad un valore mensile di CO2 emessa
CREATE TABLE IF NOT EXISTS `role_thresholds` (
  `role` varchar(60) NOT NULL,
  `threshold` double unsigned NOT NULL,
  PRIMARY KEY (`role`),
  UNIQUE KEY `role_UNIQUE` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO role_thresholds (role, threshold) 
VALUES 
  ('farmer', 100),
  ('carrier', 100),
  ('producer', 100),
  ('seller', 100);


-- Creazione della tabella "users"
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password_hash` char(60) NOT NULL,
  `role` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_users_UNIQUE` (`id_user`),
  CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `role_thresholds` (`role`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creazione della tabella "wallets"
CREATE TABLE IF NOT EXISTS `wallets` (
  `id_user` int unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `balance` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `address_UNIQUE` (`address`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`),
  CONSTRAINT `id_user_wallet` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creazione della tabella "system_wallet"
CREATE TABLE IF NOT EXISTS `system_wallet` (
  `id_system_wallet` int unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `balance` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_system_wallet`),
  UNIQUE KEY `id_system_wallet_UNIQUE` (`id_system_wallet`),
  UNIQUE KEY `address_UNIQUE` (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creazione della tabella "emissions"
CREATE TABLE IF NOT EXISTS `emissions` (
  `id_emission` int unsigned NOT NULL AUTO_INCREMENT,
  `co2_amount` double unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_user` int unsigned NOT NULL,
  PRIMARY KEY (`id_emission`),
  UNIQUE KEY `id_emission_UNIQUE` (`id_emission`),
  CONSTRAINT `id_user_emission` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Creazione della tabella "serial_codes"
CREATE TABLE IF NOT EXISTS `serial_codes` (
  `serial_code` varchar(60) NOT NULL,
  `is_used` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`serial_code`),
  UNIQUE KEY `serial_code_UNIQUE` (`serial_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO serial_codes (serial_code)
VALUES 
  ('$2b$10$zBkRpSxFlDRj31ITvLoQb./fn8obUlxkTTj4NfEwoiB9fJXQXSI0a'),
  ('$2b$10$e6GLiLHH1pUhiKVYOeptae8SQ0kUdWJ2zc9U8NWrAAI.wtL5504Vq'),
  ('$2b$10$y6NelmtreGBasM6zcrVMGeQkwq.vLh.sUc0BbHLiQ1s9dpt4SeU8e'),
  ('$2b$10$4t1q.7J7KWlon/FcYjXxFOQXr6kj4PKTtt8bqn5rI0L6/YDqnf2jy'),
  ('$2b$10$seg3DF/kFFKK3XqP/YiG4etohM1V5XrO/P/iqrBBrbeAKrifVvWme'),
  ('$2b$10$ftzALn4peGF2HrjEpY/iEuu1CBPFPIWXt03/JyDVK2M3QrLwrNnRi'),
  ('$2b$10$PicPbTslX7wrIfilRmWsl.H69999GaVuwjZ4FhQuBNLGPkodRVEhu'),
  ('$2b$10$9gNcn33fZED1tDeW/70zZe8g/79UQuadlx/SVm68k3Qlhi.DO0epK'),
  ('$2b$10$xk0iZlC3lw/1g66uOFoy2uIp5YeKBYW6RhczJKuiKjCqhTpsLrtY6'),
  ('$2b$10$p4beN2htyPuRArG/AFLqK.zG0xLm1FQanJL177Z3UsCJjAkE3e8Oy');



CREATE TABLE IF NOT EXISTS `debts` (
  `id_user` int unsigned NOT NULL AUTO_INCREMENT,
  `debt` int unsigned NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`),
  CONSTRAINT `id_user_debts` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;