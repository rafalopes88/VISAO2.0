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
-- Table structure for table `mesoregiao`
--

DROP TABLE IF EXISTS `mesoregiao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mesoregiao` (
  `cod_mesoRegiao` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cod_mesoRegiao`)
) ENGINE=InnoDB AUTO_INCREMENT=5302 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesoregiao`
--

LOCK TABLES `mesoregiao` WRITE;
/*!40000 ALTER TABLE `mesoregiao` DISABLE KEYS */;
INSERT INTO `mesoregiao` VALUES (1101,'Madeira-Guaporé'),(1102,'Leste Rondoniense'),(1201,'Vale do Juruá'),(1202,'Vale do Acre'),(1301,'Norte Amazonense'),(1302,'Sudoeste Amazonense'),(1303,'Centro Amazonense'),(1304,'Sul Amazonense'),(1401,'Norte de Roraima'),(1402,'Sul de Roraima'),(1501,'Baixo Amazonas'),(1502,'Marajó'),(1503,'Metropolitana de Belém'),(1504,'Nordeste Paraense'),(1505,'Sudoeste Paraense'),(1506,'Sudeste Paraense'),(1601,'Norte do Amapá'),(1602,'Sul do Amapá'),(1701,'Ocidental do Tocantins'),(1702,'Oriental do Tocantins'),(2101,'Norte Maranhense'),(2102,'Oeste Maranhense'),(2103,'Centro Maranhense'),(2104,'Leste Maranhense'),(2105,'Sul Maranhense'),(2201,'Norte Piauiense'),(2202,'Centro-Norte Piauiense'),(2203,'Sudoeste Piauiense'),(2204,'Sudeste Piauiense'),(2301,'Noroeste Cearense'),(2302,'Norte Cearense'),(2303,'Metropolitana de Fortaleza'),(2304,'Sertões Cearenses'),(2305,'Jaguaribe'),(2306,'Centro-Sul Cearense'),(2307,'Sul Cearense'),(2401,'Oeste Potiguar'),(2402,'Central Potiguar'),(2403,'Agreste Potiguar'),(2404,'Leste Potiguar'),(2501,'Sertão Paraibano'),(2502,'Borborema'),(2503,'Agreste Paraibano'),(2504,'Mata Paraibana'),(2601,'Sertão Pernambucano'),(2602,'São Francisco Pernambucano'),(2603,'Agreste Pernambucano'),(2604,'Mata Pernambucana'),(2605,'Metropolitana de Recife'),(2701,'Sertão Alagoano'),(2702,'Agreste Alagoano'),(2703,'Leste Alagoano'),(2801,'Sertão Sergipano'),(2802,'Agreste Sergipano'),(2803,'Leste Sergipano'),(2901,'Extremo Oeste Baiano'),(2902,'Vale São-Franciscano da Bahia'),(2903,'Centro Norte Baiano'),(2904,'Nordeste Baiano'),(2905,'Metropolitana de Salvador'),(2906,'Centro Sul Baiano'),(2907,'Sul Baiano'),(3101,'Noroeste de Minas'),(3102,'Norte de Minas'),(3103,'Jequitinhonha'),(3104,'Vale do Mucuri'),(3105,'Triângulo Mineiro/Alto Paranaíba'),(3106,'Central Mineira'),(3107,'Metropolitana de Belo Horizonte'),(3108,'Vale do Rio Doce'),(3109,'Oeste de Minas'),(3110,'Sul/Sudoeste de Minas'),(3111,'Campo das Vertentes'),(3112,'Zona da Mata'),(3201,'Noroeste Espírito-santense'),(3202,'Litoral Norte Espírito-santense'),(3203,'Central Espírito-santense'),(3204,'Sul Espírito-santense'),(3301,'Noroeste Fluminense'),(3302,'Norte Fluminense'),(3303,'Centro Fluminense'),(3304,'Baixadas'),(3305,'Sul Fluminense'),(3306,'Metropolitana do Rio de Janeiro'),(3501,'São José do Rio Preto'),(3502,'Ribeirão Preto'),(3503,'Araçatuba'),(3504,'Bauru'),(3505,'Araraquara'),(3506,'Piracicaba'),(3507,'Campinas'),(3508,'Presidente Prudente'),(3509,'Marília'),(3510,'Assis'),(3511,'Itapetininga'),(3512,'Macro Metropolitana Paulista'),(3513,'Vale do Paraíba Paulista'),(3514,'Litoral Sul Paulista'),(3515,'Metropolitana de São Paulo'),(4101,'Noroeste Paranaense'),(4102,'Centro Ocidental Paranaense'),(4103,'Norte Central Paranaense'),(4104,'Norte Pioneiro Paranaense'),(4105,'Centro Oriental Paranaense'),(4106,'Oeste Paranaense'),(4107,'Sudoeste Paranaense'),(4108,'Centro-Sul Paranaense'),(4109,'Sudeste Paranaense'),(4110,'Metropolitana de Curitiba'),(4201,'Oeste Catarinense'),(4202,'Norte Catarinense'),(4203,'Serrana'),(4204,'Vale do Itajaí'),(4205,'Grande Florianópolis'),(4206,'Sul Catarinense'),(4301,'Noroeste Rio-grandense'),(4302,'Nordeste Rio-grandense'),(4303,'Centro Ocidental Rio-grandense'),(4304,'Centro Oriental Rio-grandense'),(4305,'Metropolitana de Porto Alegre'),(4306,'Sudoeste Rio-grandense'),(4307,'Sudeste Rio-grandense'),(5001,'Pantanais Sul Mato-grossense'),(5002,'Centro Norte de Mato Grosso do Sul'),(5003,'Leste de Mato Grosso do Sul'),(5004,'Sudoeste de Mato Grosso do Sul'),(5101,'Norte Mato-grossense'),(5102,'Nordeste Mato-grossense'),(5103,'Sudoeste Mato-grossense'),(5104,'Centro-Sul Mato-grossense'),(5105,'Sudeste Mato-grossense'),(5201,'Noroeste Goiano'),(5202,'Norte Goiano'),(5203,'Centro Goiano'),(5204,'Leste Goiano'),(5205,'Sul Goiano'),(5301,'Distrito Federal');
/*!40000 ALTER TABLE `mesoregiao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-15 14:58:00
