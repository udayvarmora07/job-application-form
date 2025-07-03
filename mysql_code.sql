-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: Job_Application
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `education_details`
--

DROP TABLE IF EXISTS `education_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `course_name` varchar(50) DEFAULT NULL,
  `board_university` varchar(50) DEFAULT NULL,
  `passing_year` varchar(4) DEFAULT NULL,
  `percentage` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `education_details_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `language_known`
--

DROP TABLE IF EXISTS `language_known`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language_known` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `language` varchar(30) DEFAULT NULL,
  `can_read` tinyint(1) DEFAULT NULL,
  `can_write` tinyint(1) DEFAULT NULL,
  `can_speak` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `language_known_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personal_details`
--

DROP TABLE IF EXISTS `personal_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_details` (
  `job_application_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `designation` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address1` varchar(50) DEFAULT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `relationship_status` varchar(20) DEFAULT NULL,
  `date_of_birth` varchar(15) NOT NULL,
  PRIMARY KEY (`job_application_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preferd_locations`
--

DROP TABLE IF EXISTS `preferd_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferd_locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `preferd_locations_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `notice_period` varchar(20) DEFAULT NULL,
  `expacted_ctc` decimal(10,2) DEFAULT NULL,
  `current_ctc` decimal(10,2) DEFAULT NULL,
  `department` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reference_contact`
--

DROP TABLE IF EXISTS `reference_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `relation` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `reference_contact_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `technology_known`
--

DROP TABLE IF EXISTS `technology_known`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technology_known` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `technology` varchar(30) DEFAULT NULL,
  `proficiency` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `technology_known_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profilePicture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_application_id` int NOT NULL,
  `company_name` varchar(30) DEFAULT NULL,
  `designation` varchar(30) DEFAULT NULL,
  `from_date` varchar(15) DEFAULT NULL,
  `to_date` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_application_id` (`job_application_id`),
  CONSTRAINT `work_experience_ibfk_1` FOREIGN KEY (`job_application_id`) REFERENCES `personal_details` (`job_application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-04 20:22:46
