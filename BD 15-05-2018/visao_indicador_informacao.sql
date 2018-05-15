-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: visao
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `indicador_informacao`
--

DROP TABLE IF EXISTS `indicador_informacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indicador_informacao` (
  `cod_indicador_informacao` int(11) NOT NULL AUTO_INCREMENT,
  `ordem` int(11) DEFAULT NULL,
  `antecessor` varchar(45) DEFAULT NULL,
  `indicador_cod_indicador` int(11) NOT NULL,
  `informacao_cod_informacao` int(11) NOT NULL,
  PRIMARY KEY (`cod_indicador_informacao`),
  KEY `fk_indicador_informacao_indicador1_idx` (`indicador_cod_indicador`),
  KEY `fk_indicador_informacao_informacao1_idx` (`informacao_cod_informacao`),
  CONSTRAINT `fk_indicador_informacao_indicador1` FOREIGN KEY (`indicador_cod_indicador`) REFERENCES `indicador` (`cod_indicador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_informacao_informacao1` FOREIGN KEY (`informacao_cod_informacao`) REFERENCES `informacao` (`cod_informacao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicador_informacao`
--

LOCK TABLES `indicador_informacao` WRITE;
/*!40000 ALTER TABLE `indicador_informacao` DISABLE KEYS */;
INSERT INTO `indicador_informacao` VALUES (1,1,NULL,1,2),(2,2,'*1000/',1,1),(3,1,NULL,2,1);
/*!40000 ALTER TABLE `indicador_informacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-15 14:57:58
