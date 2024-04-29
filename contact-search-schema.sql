-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: contact-search
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `numberId` int DEFAULT NULL,
  `contactOfUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0d6926548ec1a30644ac3dbb29b` (`numberId`),
  KEY `FK_e899a4f147e88ac9d8de58d54c5` (`contactOfUserId`),
  CONSTRAINT `FK_0d6926548ec1a30644ac3dbb29b` FOREIGN KEY (`numberId`) REFERENCES `phone_number` (`id`),
  CONSTRAINT `FK_e899a4f147e88ac9d8de58d54c5` FOREIGN KEY (`contactOfUserId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'John Rick',5,1),(2,'Contact 2',6,3),(3,'Tojo Hari',6,4),(4,'Ricky Boyaa',7,1),(5,'John Business',2,4),(6,'Test Josh',9,NULL);
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `contact_book`
--

DROP TABLE IF EXISTS `contact_book`;
/*!50001 DROP VIEW IF EXISTS `contact_book`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `contact_book` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `phoneNumber`,
 1 AS `countryCode`,
 1 AS `isRegistered`,
 1 AS `spamCount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `phone_number`
--

DROP TABLE IF EXISTS `phone_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_number` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryCode` smallint NOT NULL,
  `phoneNumber` bigint NOT NULL,
  `isRegistered` tinyint NOT NULL DEFAULT '0',
  `spamCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_NUMBER` (`countryCode`,`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_number`
--

LOCK TABLES `phone_number` WRITE;
/*!40000 ALTER TABLE `phone_number` DISABLE KEYS */;
INSERT INTO `phone_number` VALUES (2,91,1234567890,1,0),(3,91,1234567899,1,0),(4,91,1234567898,1,0),(5,92,1234567898,0,0),(6,92,9234567898,0,0),(7,60,148406798,0,0),(8,60,143406798,0,0),(9,62,143406398,0,0);
/*!40000 ALTER TABLE `phone_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeorm_metadata`
--

DROP TABLE IF EXISTS `typeorm_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typeorm_metadata` (
  `type` varchar(255) NOT NULL,
  `database` varchar(255) DEFAULT NULL,
  `schema` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeorm_metadata`
--

LOCK TABLES `typeorm_metadata` WRITE;
/*!40000 ALTER TABLE `typeorm_metadata` DISABLE KEYS */;
INSERT INTO `typeorm_metadata` VALUES ('VIEW',NULL,'contact-search',NULL,'contact_book','SELECT numberId as id, name, p.phoneNumber, p.countryCode, p.isRegistered, p.spamCount FROM user u\n        INNER JOIN phone_number p ON p.id = u.numberId\n      UNION \n      SELECT numberId as id, name, p.phoneNumber, p.countryCode, p.isRegistered, p.spamCount FROM contact c \n        INNER JOIN phone_number p ON p.id = c.numberId\n        WHERE p.isRegistered = false');
/*!40000 ALTER TABLE `typeorm_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `numberId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_8eb27834bf79e32decf36fc013` (`numberId`),
  CONSTRAINT `FK_8eb27834bf79e32decf36fc0138` FOREIGN KEY (`numberId`) REFERENCES `phone_number` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'abc@gmail.com','John Doe','288da71857663eb9.b7542a0fd81e5838408f7da2e9f3bd087f31ed5d7085499ddcc8be84d1118c81',2),(3,'abc1@gmail.com','Mani Mix','44825f9934fe8ceb.5dee646502dd1e6d45f8c59d850419345425781bc1ac634e4c1017c7e5c919eb',3),(4,'abc1@gmail.com','Carl Min','5466255f2a4b2455.d8339b703e530127acdc75465332d29541d0fc6f216f207a087fd6b178836d66',4);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `contact_book`
--

/*!50001 DROP VIEW IF EXISTS `contact_book`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `contact_book` AS select `u`.`numberId` AS `id`,`u`.`name` AS `name`,`p`.`phoneNumber` AS `phoneNumber`,`p`.`countryCode` AS `countryCode`,`p`.`isRegistered` AS `isRegistered`,`p`.`spamCount` AS `spamCount` from (`user` `u` join `phone_number` `p` on((`p`.`id` = `u`.`numberId`))) union select `c`.`numberId` AS `id`,`c`.`name` AS `name`,`p`.`phoneNumber` AS `phoneNumber`,`p`.`countryCode` AS `countryCode`,`p`.`isRegistered` AS `isRegistered`,`p`.`spamCount` AS `spamCount` from (`contact` `c` join `phone_number` `p` on((`p`.`id` = `c`.`numberId`))) where (`p`.`isRegistered` = false) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-29  9:49:59
