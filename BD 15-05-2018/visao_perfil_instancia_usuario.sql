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
-- Table structure for table `perfil_instancia_usuario`
--

DROP TABLE IF EXISTS `perfil_instancia_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil_instancia_usuario` (
  `cod_perfil_instancia_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_cod_usuario` int(11) NOT NULL,
  `instancia_cod_instancia` int(11) NOT NULL,
  `perfil_cod_perfil` int(11) NOT NULL,
  PRIMARY KEY (`cod_perfil_instancia_usuario`),
  KEY `fk_perfil_instancia_usuario_usuario1_idx` (`usuario_cod_usuario`),
  KEY `fk_perfil_instancia_usuario_instancia1_idx` (`instancia_cod_instancia`),
  KEY `fk_perfil_instancia_usuario_perfil1_idx` (`perfil_cod_perfil`),
  CONSTRAINT `fk_perfil_instancia_usuario_instancia1` FOREIGN KEY (`instancia_cod_instancia`) REFERENCES `instancia` (`cod_instancia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_perfil_instancia_usuario_perfil1` FOREIGN KEY (`perfil_cod_perfil`) REFERENCES `perfil` (`cod_perfil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_perfil_instancia_usuario_usuario1` FOREIGN KEY (`usuario_cod_usuario`) REFERENCES `usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_instancia_usuario`
--

LOCK TABLES `perfil_instancia_usuario` WRITE;
/*!40000 ALTER TABLE `perfil_instancia_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfil_instancia_usuario` ENABLE KEYS */;
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
