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
-- Table structure for table `municipio_filtrogeografico`
--

DROP TABLE IF EXISTS `municipio_filtrogeografico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `municipio_filtrogeografico` (
  `cod_municipio_filtroGeografico` int(11) NOT NULL AUTO_INCREMENT,
  `municipio_cod_municipio` int(11) NOT NULL,
  `filtroGeografico_cod_FiltroGeografico` int(11) NOT NULL,
  PRIMARY KEY (`cod_municipio_filtroGeografico`),
  KEY `fk_municipio_has_filtroGeografico_municipio1_idx` (`municipio_cod_municipio`),
  KEY `fk_municipio_has_filtroGeografico_filtroGeografico1_idx` (`filtroGeografico_cod_FiltroGeografico`),
  CONSTRAINT `fk_municipio_has_filtroGeografico_filtroGeografico1` FOREIGN KEY (`filtroGeografico_cod_FiltroGeografico`) REFERENCES `filtrogeografico` (`cod_FiltroGeografico`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_municipio_has_filtroGeografico_municipio1` FOREIGN KEY (`municipio_cod_municipio`) REFERENCES `municipio` (`cod_municipio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipio_filtrogeografico`
--

LOCK TABLES `municipio_filtrogeografico` WRITE;
/*!40000 ALTER TABLE `municipio_filtrogeografico` DISABLE KEYS */;
INSERT INTO `municipio_filtrogeografico` VALUES (1,5300108,1),(2,3304557,1),(3,3550308,1),(4,2704302,2),(5,3304557,2);
/*!40000 ALTER TABLE `municipio_filtrogeografico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-15 14:57:59
