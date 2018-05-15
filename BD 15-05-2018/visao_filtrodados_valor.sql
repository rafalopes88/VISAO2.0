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
-- Table structure for table `filtrodados_valor`
--

DROP TABLE IF EXISTS `filtrodados_valor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filtrodados_valor` (
  `cod_filtroDados_valor` int(11) NOT NULL AUTO_INCREMENT,
  `valor` decimal(10,0) DEFAULT NULL,
  `valor_informacao_cod_valor_informacao` int(11) NOT NULL,
  `filtroDados_cod_filtroDados` int(11) NOT NULL,
  PRIMARY KEY (`cod_filtroDados_valor`),
  KEY `fk_filtroDados_valor_valor_informacao1_idx` (`valor_informacao_cod_valor_informacao`),
  KEY `fk_filtroDados_valor_filtroDados1_idx` (`filtroDados_cod_filtroDados`),
  CONSTRAINT `fk_filtroDados_valor_filtroDados1` FOREIGN KEY (`filtroDados_cod_filtroDados`) REFERENCES `filtrodados` (`cod_filtroDados`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_filtroDados_valor_valor_informacao1` FOREIGN KEY (`valor_informacao_cod_valor_informacao`) REFERENCES `valor_informacao` (`cod_valor_informacao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filtrodados_valor`
--

LOCK TABLES `filtrodados_valor` WRITE;
/*!40000 ALTER TABLE `filtrodados_valor` DISABLE KEYS */;
/*!40000 ALTER TABLE `filtrodados_valor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-15 14:58:01
