-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: unievents_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventName` varchar(255) NOT NULL,
  `eventImage` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `venue` varchar(255) NOT NULL,
  `category` enum('Academic','Cultural','Sports','Workshop') DEFAULT 'Academic',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (7,'Abithara','https://i.ytimg.com/vi/P71Sv9ITkxM/hqdefault.jpg','2026-07-22','18:00:00','BS Hall','Cultural','2026-07-17 08:21:31','2026-07-17 08:21:41'),(9,'Foot ball ','https://as2.ftcdn.net/v2/jpg/01/10/37/29/1000_F_110372910_JVX6DZgWPREGwz6PaIdm6OAW3poOTIdc.jpg','2026-08-04','17:01:00','Hostel ground','Sports','2026-07-17 08:31:12','2026-07-17 08:31:34'),(10,'IEEE ','https://i.ytimg.com/vi/1r5fBgzpKOI/maxresdefault.jpg','2026-07-29','11:00:00','LH1','Workshop','2026-07-20 16:09:02','2026-07-20 16:09:02');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `eventId` int(11) DEFAULT NULL,
  `eventName` varchar(255) NOT NULL,
  `eventCategory` varchar(255) DEFAULT 'Event',
  `eventDate` varchar(255) DEFAULT '',
  `eventTime` varchar(255) DEFAULT '',
  `eventVenue` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (3,'Kabi','kabijakep@gmail.com','Applied Science','2021/2022',10,'IEEE ','Workshop','2026-07-29','11:00:00','LH1','2026-07-21 15:50:34','2026-07-21 15:50:34'),(5,'Manoj','manojmanorooban@gmail.com','Technology','2021/2022',9,'Foot ball ','Sports','2026-08-04','17:01:00','Hostel ground','2026-07-21 15:53:45','2026-07-21 15:53:45');
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` varchar(255) DEFAULT 'https://ui-avatars.com/api/?name=User&background=137fec&color=fff',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`),
  UNIQUE KEY `email_37` (`email`),
  UNIQUE KEY `email_38` (`email`),
  UNIQUE KEY `email_39` (`email`),
  UNIQUE KEY `email_40` (`email`),
  UNIQUE KEY `email_41` (`email`),
  UNIQUE KEY `email_42` (`email`),
  UNIQUE KEY `email_43` (`email`),
  UNIQUE KEY `email_44` (`email`),
  UNIQUE KEY `email_45` (`email`),
  UNIQUE KEY `email_46` (`email`),
  UNIQUE KEY `email_47` (`email`),
  UNIQUE KEY `email_48` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Kabi','kabijakep@gmail.com','2021/ICT/121','$2b$10$0qUYJ.iGMkQU.KLj2ROLA.BzNl0OSdpXwaiSZNGQSiqUcQFz5SUCi','https://ui-avatars.com/api/?name=User&background=137fec&color=fff','2026-04-02 06:41:58','2026-07-16 16:58:14'),(7,'Manoj','manojmanorooban@gmail.com','2021/ICT/121','$2b$10$R5NGkFBlj5FHo/lwBG3ff.jcGlLcnk8/BlwEQ5gH1vC87pOeufP2K','https://ui-avatars.com/api/?name=User&background=137fec&color=fff','2026-04-03 18:28:18','2026-04-03 18:28:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venues`
--

DROP TABLE IF EXISTS `venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venueName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `venueName` (`venueName`),
  UNIQUE KEY `venueName_2` (`venueName`),
  UNIQUE KEY `venueName_3` (`venueName`),
  UNIQUE KEY `venueName_4` (`venueName`),
  UNIQUE KEY `venueName_5` (`venueName`),
  UNIQUE KEY `venueName_6` (`venueName`),
  UNIQUE KEY `venueName_7` (`venueName`),
  UNIQUE KEY `venueName_8` (`venueName`),
  UNIQUE KEY `venueName_9` (`venueName`),
  UNIQUE KEY `venueName_10` (`venueName`),
  UNIQUE KEY `venueName_11` (`venueName`),
  UNIQUE KEY `venueName_12` (`venueName`),
  UNIQUE KEY `venueName_13` (`venueName`),
  UNIQUE KEY `venueName_14` (`venueName`),
  UNIQUE KEY `venueName_15` (`venueName`),
  UNIQUE KEY `venueName_16` (`venueName`),
  UNIQUE KEY `venueName_17` (`venueName`),
  UNIQUE KEY `venueName_18` (`venueName`),
  UNIQUE KEY `venueName_19` (`venueName`),
  UNIQUE KEY `venueName_20` (`venueName`),
  UNIQUE KEY `venueName_21` (`venueName`),
  UNIQUE KEY `venueName_22` (`venueName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venues`
--

LOCK TABLES `venues` WRITE;
/*!40000 ALTER TABLE `venues` DISABLE KEYS */;
INSERT INTO `venues` VALUES (1,'Common hall','2026-07-17 08:20:00','2026-07-17 08:20:00'),(2,'LH1','2026-07-17 08:20:16','2026-07-17 08:20:16'),(3,'BS Hall','2026-07-17 08:21:20','2026-07-17 08:21:20'),(4,'LH2','2026-07-17 08:25:57','2026-07-17 08:25:57'),(5,'Hostel ground','2026-07-17 08:26:55','2026-07-17 08:26:55');
/*!40000 ALTER TABLE `venues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-21 22:03:39
