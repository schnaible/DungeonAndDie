CREATE DATABASE  IF NOT EXISTS `board` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `board`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: board
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `boardName` varchar(100) DEFAULT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `randomEffect1` varchar(100) DEFAULT NULL,
  `randomEffect2` varchar(100) DEFAULT NULL,
  `randomEffect3` varchar(100) DEFAULT NULL,
  `randomEffect4` varchar(100) DEFAULT NULL,
  `randomEffect5` varchar(100) DEFAULT NULL,
  `randomEffect6` varchar(100) DEFAULT NULL,
  `randomEffect7` varchar(100) DEFAULT NULL,
  `randomEffect8` varchar(100) DEFAULT NULL,
  `BoardID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`BoardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `Classname` varchar(100) NOT NULL,
  `HP` int NOT NULL,
  `Die` int NOT NULL,
  `Ability` varchar(100) DEFAULT NULL,
  `ClassID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ClassID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES ('Tank',8,5,'None',1),('Cleric',6,6,'Heal',2),('Rogue',4,7,'None',3),('Thief',6,6,'Steal',4);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `high_score`
--

DROP TABLE IF EXISTS `high_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `high_score` (
  `Username` varchar(100) NOT NULL,
  `Class` varchar(100) NOT NULL,
  `Score` int NOT NULL,
  `Time` varchar(100) NOT NULL,
  `UserID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `high_score`
--

LOCK TABLES `high_score` WRITE;
/*!40000 ALTER TABLE `high_score` DISABLE KEYS */;
INSERT INTO `high_score` VALUES ('Oliver','Rogue',1000,'1:00:00',1),('Oliver','Rogue',1000,'1:00:00',2),('Charlotte','Cleric',800,'1:00:00',3),('Liam','Tank',500,'1:00:00',4),('Ava','Thief',700,'1:00:00',5),('Ethan','Tank',1100,'0:10:00',6),('Amelia','Tank',800,'0:10:00',7),('Aiden','Tank',900,'0:10:00',8),('Olivia','Tank',900,'0:10:00',9),('Gabriel','Cleric',1000,'0:11:30',10),('Aurora','Tank',700,'0:10:00',11),('Caleb','Rogue',1000,'0:09:00',12),('Violet','Rogue',400,'0:11:00',13),('Theodore','Cleric',500,'0:11:00',14),('Luna','Cleric',200,'10:59:59',15),('Declan','Thief',100,'1:30:00',16),('Hazel','Thief',800,'1:31:00',17),('Owen','Thief',1000,'1:31:30',18);
/*!40000 ALTER TABLE `high_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playerposition`
--

DROP TABLE IF EXISTS `playerposition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playerposition` (
  `player1pos` varchar(100) NOT NULL,
  `player2pos` varchar(100) NOT NULL,
  `player3pos` varchar(100) NOT NULL,
  `player4pos` varchar(100) NOT NULL,
  PRIMARY KEY (`player1pos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerposition`
--

LOCK TABLES `playerposition` WRITE;
/*!40000 ALTER TABLE `playerposition` DISABLE KEYS */;
/*!40000 ALTER TABLE `playerposition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trivia`
--

DROP TABLE IF EXISTS `trivia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trivia` (
  `Question` varchar(140) NOT NULL,
  `Answer` varchar(140) NOT NULL,
  `notAnswer1` varchar(140) NOT NULL,
  `notAnswer2` varchar(140) NOT NULL,
  `notAnswer3` varchar(140) NOT NULL,
  `QuestionID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`QuestionID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trivia`
--

LOCK TABLES `trivia` WRITE;
/*!40000 ALTER TABLE `trivia` DISABLE KEYS */;
INSERT INTO `trivia` VALUES ('Which class can heal?','Cleric','Tank','Warrior','Thief',1),('How far away can a Theif Steal?','3','2','4','10',2),('Which class can steal?','Theif','Tank','Warrior','Cleric',3),('What is 10 + 20?','30','10','200','1020',4),('Which class does not exist?','Warrior','Tank','Rogue','Thief',5),('What class is the Strongest?','None they are all good','Rogue','Cleric','Tank',6),('How far can a rogue go?','7','6','5','8',7),('What is the game name?','Dungeon & Die','Dungeon & Dies','Dublous & Die','Board Game',8),('What color is the Dragon?','Red','Blue','Gold','Black',9),('How many Answers does Trivia have?','4','2','3','5',10),('What animal can you not shoot in Firing Range?','Frog','Orc','Goblin','Trolls',11),('What animal does exist in Firing Range?','Frogs','Kittens','Puppies','Birds',12),('How many shapes must you find in Odd One Out?','1','2','10','5',13),('Where are you in the game?','Dungeon','Battlefeild','Maze','Line',14),('What is your character trying to do?','Escape','Find the bathroom','Sit Down','Dance',15),('What is the starting health of a Rogue?','4','6','5','8',16),('What is the max health of a Tank?','8','6','9000','1',17),('Can a cleric heal twice in one turn?','Yes','No','maybe','Squrrel!!!',18),('How much score does the winner get?','2000','1000','5000','3000',19),('What is the maximum number of players this game can have?','4','2','3','1',20);
/*!40000 ALTER TABLE `trivia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-19 21:51:07



-- MySQL dump 10.13  Distrib 8.0.11, for macos10.13 (x86_64)
--
-- Host: localhost    Database: board
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `scheduler_users`
--

USE board;
DROP TABLE IF EXISTS `scheduler_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `scheduler_users` (
  `user_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_fName` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_mName` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_lName` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subject` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_id`,`department`,`subject`),
  KEY `scheduler_users_user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduler_users`
--

LOCK TABLES `scheduler_users` WRITE;
/*!40000 ALTER TABLE `scheduler_users` DISABLE KEYS */;
INSERT INTO `scheduler_users` VALUES ('admin','Admin','','','Owner','','admin');
/*!40000 ALTER TABLE `scheduler_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-27 11:13:21

