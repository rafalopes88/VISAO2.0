-- MySQL Script generated by MySQL Workbench
-- Seg 12 Mar 2018 18:53:08 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema visao
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema visao
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `visao` DEFAULT CHARACTER SET utf8 ;
USE `visao` ;

-- -----------------------------------------------------
-- Table `visao`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`estado` (
  `cod_estado` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL,
  PRIMARY KEY (`cod_estado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`mesoRegiao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`mesoRegiao` (
  `cod_mesoRegiao` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL,
  PRIMARY KEY (`cod_mesoRegiao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`municipio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`municipio` (
  `cod_municipio` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL,
  `geometria` GEOMETRY NULL,
  `estado_estado` INT NOT NULL,
  `mesoRegiao_cod_mesoRegiao` INT NOT NULL,
  PRIMARY KEY (`cod_municipio`),
  INDEX `fk_municipio_estado_idx` (`estado_estado` ASC),
  INDEX `fk_municipio_mesoRegiao1_idx` (`mesoRegiao_cod_mesoRegiao` ASC),
  CONSTRAINT `fk_municipio_estado`
    FOREIGN KEY (`estado_estado`)
    REFERENCES `visao`.`estado` (`cod_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_municipio_mesoRegiao1`
    FOREIGN KEY (`mesoRegiao_cod_mesoRegiao`)
    REFERENCES `visao`.`mesoRegiao` (`cod_mesoRegiao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`instituicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`instituicao` (
  `cod_instituicao` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_instituicao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`usuario` (
  `cod_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `cpf` VARCHAR(45) NULL,
  `nascimento` DATE NULL,
  `lattes` VARCHAR(255) NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(500) NOT NULL,
  `sexo` TINYINT(1) NULL,
  `nascionalidade` VARCHAR(45) NULL,
  `pais` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `instituicao_cod_instituicao` INT NOT NULL,
  PRIMARY KEY (`cod_usuario`),
  INDEX `fk_usuario_instituicao1_idx` (`instituicao_cod_instituicao` ASC),
  CONSTRAINT `fk_usuario_instituicao1`
    FOREIGN KEY (`instituicao_cod_instituicao`)
    REFERENCES `visao`.`instituicao` (`cod_instituicao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`perfil` (
  `cod_perfil` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_perfil`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`instancia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`instancia` (
  `cod_instancia` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `url` VARCHAR(255) NULL,
  `disponibilidade` TINYINT(1) NULL,
  PRIMARY KEY (`cod_instancia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`perfil_instancia_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`perfil_instancia_usuario` (
  `cod_perfil_instancia_usuario` INT NOT NULL AUTO_INCREMENT,
  `usuario_cod_usuario` INT NOT NULL,
  `instancia_cod_instancia` INT NOT NULL,
  `perfil_cod_perfil` INT NOT NULL,
  PRIMARY KEY (`cod_perfil_instancia_usuario`),
  INDEX `fk_perfil_instancia_usuario_usuario1_idx` (`usuario_cod_usuario` ASC),
  INDEX `fk_perfil_instancia_usuario_instancia1_idx` (`instancia_cod_instancia` ASC),
  INDEX `fk_perfil_instancia_usuario_perfil1_idx` (`perfil_cod_perfil` ASC),
  CONSTRAINT `fk_perfil_instancia_usuario_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_perfil_instancia_usuario_instancia1`
    FOREIGN KEY (`instancia_cod_instancia`)
    REFERENCES `visao`.`instancia` (`cod_instancia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_perfil_instancia_usuario_perfil1`
    FOREIGN KEY (`perfil_cod_perfil`)
    REFERENCES `visao`.`perfil` (`cod_perfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`instancia_usuario_permissao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`instancia_usuario_permissao` (
  `cod_instancia_usuario_permissao` INT NOT NULL AUTO_INCREMENT,
  `usuario_cod_usuario` INT NOT NULL,
  `instancia_cod_instancia` INT NOT NULL,
  PRIMARY KEY (`cod_instancia_usuario_permissao`),
  INDEX `fk_instancia_usuario_permissao_usuario1_idx` (`usuario_cod_usuario` ASC),
  INDEX `fk_instancia_usuario_permissao_instancia1_idx` (`instancia_cod_instancia` ASC),
  CONSTRAINT `fk_instancia_usuario_permissao_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_instancia_usuario_permissao_instancia1`
    FOREIGN KEY (`instancia_cod_instancia`)
    REFERENCES `visao`.`instancia` (`cod_instancia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`grupo` (
  `cod_grupo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(255) NULL,
  `instancia_cod_instancia` INT NOT NULL,
  PRIMARY KEY (`cod_grupo`),
  INDEX `fk_grupo_instancia1_idx` (`instancia_cod_instancia` ASC),
  CONSTRAINT `fk_grupo_instancia1`
    FOREIGN KEY (`instancia_cod_instancia`)
    REFERENCES `visao`.`instancia` (`cod_instancia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`permissao_grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`permissao_grupo` (
  `cod_permissao_grupo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_permissao_grupo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`grupo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`grupo_usuario` (
  `cod_grupo_usuario` INT NOT NULL AUTO_INCREMENT,
  `grupo_cod_grupo` INT NOT NULL,
  `usuario_cod_usuario` INT NOT NULL,
  `permissao_grupo_cod_permissao_grupo` INT NOT NULL,
  PRIMARY KEY (`cod_grupo_usuario`),
  INDEX `fk_grupo_usuario_grupo1_idx` (`grupo_cod_grupo` ASC),
  INDEX `fk_grupo_usuario_usuario1_idx` (`usuario_cod_usuario` ASC),
  INDEX `fk_grupo_usuario_permissao_grupo1_idx` (`permissao_grupo_cod_permissao_grupo` ASC),
  CONSTRAINT `fk_grupo_usuario_grupo1`
    FOREIGN KEY (`grupo_cod_grupo`)
    REFERENCES `visao`.`grupo` (`cod_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grupo_usuario_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grupo_usuario_permissao_grupo1`
    FOREIGN KEY (`permissao_grupo_cod_permissao_grupo`)
    REFERENCES `visao`.`permissao_grupo` (`cod_permissao_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`fonte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`fonte` (
  `cod_fonte` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL,
  PRIMARY KEY (`cod_fonte`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`unidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`unidade` (
  `cod_unidade` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cod_unidade`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`informacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`informacao` (
  `cod_informacao` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `data` DATE NULL,
  `descricao` VARCHAR(255) NULL,
  `permissao` INT NULL,
  `fonte_cod_fonte` INT NULL,
  `unidade_cod_unidade` INT NULL,
  `usuario_cod_usuario` INT NULL,
  PRIMARY KEY (`cod_informacao`),
  INDEX `fk_informacao_fonte1_idx` (`fonte_cod_fonte` ASC),
  INDEX `fk_informacao_unidade1_idx` (`unidade_cod_unidade` ASC),
  INDEX `fk_informacao_usuario1_idx` (`usuario_cod_usuario` ASC),
  CONSTRAINT `fk_informacao_fonte1`
    FOREIGN KEY (`fonte_cod_fonte`)
    REFERENCES `visao`.`fonte` (`cod_fonte`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_informacao_unidade1`
    FOREIGN KEY (`unidade_cod_unidade`)
    REFERENCES `visao`.`unidade` (`cod_unidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_informacao_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`valor_informacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`valor_informacao` (
  `cod_valor_informacao` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(10,0) NULL,
  `municipio_cod_municipio` INT NOT NULL,
  `informacao_cod_informacao` INT NOT NULL,
  PRIMARY KEY (`cod_valor_informacao`),
  INDEX `fk_valor_informacao_municipio1_idx` (`municipio_cod_municipio` ASC),
  INDEX `fk_valor_informacao_informacao1_idx` (`informacao_cod_informacao` ASC),
  CONSTRAINT `fk_valor_informacao_municipio1`
    FOREIGN KEY (`municipio_cod_municipio`)
    REFERENCES `visao`.`municipio` (`cod_municipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_valor_informacao_informacao1`
    FOREIGN KEY (`informacao_cod_informacao`)
    REFERENCES `visao`.`informacao` (`cod_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`filtroGeografico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`filtroGeografico` (
  `cod_FiltroGeografico` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(255) NULL,
  `usuario_cod_usuario` INT NOT NULL,
  `base` TINYINT(1) NULL,
  PRIMARY KEY (`cod_FiltroGeografico`),
  INDEX `fk_filtroGeografico_usuario1_idx` (`usuario_cod_usuario` ASC),
  CONSTRAINT `fk_filtroGeografico_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`municipio_filtroGeografico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`municipio_filtroGeografico` (
  `cod_municipio_filtroGeografico` INT NOT NULL AUTO_INCREMENT,
  `municipio_cod_municipio` INT NOT NULL,
  `filtroGeografico_cod_FiltroGeografico` INT NOT NULL,
  INDEX `fk_municipio_has_filtroGeografico_municipio1_idx` (`municipio_cod_municipio` ASC),
  INDEX `fk_municipio_has_filtroGeografico_filtroGeografico1_idx` (`filtroGeografico_cod_FiltroGeografico` ASC),
  PRIMARY KEY (`cod_municipio_filtroGeografico`),
  CONSTRAINT `fk_municipio_has_filtroGeografico_municipio1`
    FOREIGN KEY (`municipio_cod_municipio`)
    REFERENCES `visao`.`municipio` (`cod_municipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_municipio_has_filtroGeografico_filtroGeografico1`
    FOREIGN KEY (`filtroGeografico_cod_FiltroGeografico`)
    REFERENCES `visao`.`filtroGeografico` (`cod_FiltroGeografico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`Camada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`Camada` (
  `cod_Camada` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(45) NULL,
  `usuario_cod_usuario` INT NOT NULL,
  `base` TINYINT(1) NULL,
  PRIMARY KEY (`cod_Camada`),
  INDEX `fk_Camada_usuario1_idx` (`usuario_cod_usuario` ASC),
  CONSTRAINT `fk_Camada_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`geometria_camada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`geometria_camada` (
  `cod_geometria_camada` INT NOT NULL AUTO_INCREMENT,
  `geometria` GEOMETRY NULL,
  `Camada_cod_Camada` INT NOT NULL,
  PRIMARY KEY (`cod_geometria_camada`),
  INDEX `fk_geometria_camada_Camada1_idx` (`Camada_cod_Camada` ASC),
  CONSTRAINT `fk_geometria_camada_Camada1`
    FOREIGN KEY (`Camada_cod_Camada`)
    REFERENCES `visao`.`Camada` (`cod_Camada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`filtroDados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`filtroDados` (
  `cod_filtroDados` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NULL,
  PRIMARY KEY (`cod_filtroDados`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`filtroDados_valor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`filtroDados_valor` (
  `cod_filtroDados_valor` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(10,0) NULL,
  `valor_informacao_cod_valor_informacao` INT NOT NULL,
  `filtroDados_cod_filtroDados` INT NOT NULL,
  PRIMARY KEY (`cod_filtroDados_valor`),
  INDEX `fk_filtroDados_valor_valor_informacao1_idx` (`valor_informacao_cod_valor_informacao` ASC),
  INDEX `fk_filtroDados_valor_filtroDados1_idx` (`filtroDados_cod_filtroDados` ASC),
  CONSTRAINT `fk_filtroDados_valor_valor_informacao1`
    FOREIGN KEY (`valor_informacao_cod_valor_informacao`)
    REFERENCES `visao`.`valor_informacao` (`cod_valor_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_filtroDados_valor_filtroDados1`
    FOREIGN KEY (`filtroDados_cod_filtroDados`)
    REFERENCES `visao`.`filtroDados` (`cod_filtroDados`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`categoria` (
  `cod_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`indicador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`indicador` (
  `cod_indicador` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `descricao` VARCHAR(45) NULL,
  `unidade_cod_unidade` INT NOT NULL,
  `categoria_cod_categoria` INT NOT NULL,
  `base` TINYINT(1) NULL,
  `usuario_cod_usuario` INT NOT NULL,
  PRIMARY KEY (`cod_indicador`),
  INDEX `fk_indicador_unidade1_idx` (`unidade_cod_unidade` ASC),
  INDEX `fk_indicador_categoria1_idx` (`categoria_cod_categoria` ASC),
  INDEX `fk_indicador_usuario1_idx` (`usuario_cod_usuario` ASC),
  CONSTRAINT `fk_indicador_unidade1`
    FOREIGN KEY (`unidade_cod_unidade`)
    REFERENCES `visao`.`unidade` (`cod_unidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_categoria1`
    FOREIGN KEY (`categoria_cod_categoria`)
    REFERENCES `visao`.`categoria` (`cod_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`indicador_informacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`indicador_informacao` (
  `cod_indicador_informacao` INT NOT NULL AUTO_INCREMENT,
  `ordem` INT NULL,
  `antecessor` VARCHAR(45) NULL,
  `indicador_cod_indicador` INT NOT NULL,
  `informacao_cod_informacao` INT NOT NULL,
  PRIMARY KEY (`cod_indicador_informacao`),
  INDEX `fk_indicador_informacao_indicador1_idx` (`indicador_cod_indicador` ASC),
  INDEX `fk_indicador_informacao_informacao1_idx` (`informacao_cod_informacao` ASC),
  CONSTRAINT `fk_indicador_informacao_indicador1`
    FOREIGN KEY (`indicador_cod_indicador`)
    REFERENCES `visao`.`indicador` (`cod_indicador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_informacao_informacao1`
    FOREIGN KEY (`informacao_cod_informacao`)
    REFERENCES `visao`.`informacao` (`cod_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`indicador_instancia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`indicador_instancia` (
  `cod_indicador_instancia` INT NOT NULL AUTO_INCREMENT,
  `indicador_cod_indicador` INT NOT NULL,
  `instancia_cod_instancia` INT NOT NULL,
  `vizivel` TINYINT(1) NULL,
  PRIMARY KEY (`cod_indicador_instancia`),
  INDEX `fk_indicador_instancia_indicador1_idx` (`indicador_cod_indicador` ASC),
  INDEX `fk_indicador_instancia_instancia1_idx` (`instancia_cod_instancia` ASC),
  CONSTRAINT `fk_indicador_instancia_indicador1`
    FOREIGN KEY (`indicador_cod_indicador`)
    REFERENCES `visao`.`indicador` (`cod_indicador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_instancia_instancia1`
    FOREIGN KEY (`instancia_cod_instancia`)
    REFERENCES `visao`.`instancia` (`cod_instancia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`indicador_grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`indicador_grupo` (
  `idindicador_grupo` INT NOT NULL AUTO_INCREMENT,
  `indicador_cod_indicador` INT NOT NULL,
  `grupo_cod_grupo` INT NOT NULL,
  PRIMARY KEY (`idindicador_grupo`),
  INDEX `fk_indicador_grupo_indicador1_idx` (`indicador_cod_indicador` ASC),
  INDEX `fk_indicador_grupo_grupo1_idx` (`grupo_cod_grupo` ASC),
  CONSTRAINT `fk_indicador_grupo_indicador1`
    FOREIGN KEY (`indicador_cod_indicador`)
    REFERENCES `visao`.`indicador` (`cod_indicador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_grupo_grupo1`
    FOREIGN KEY (`grupo_cod_grupo`)
    REFERENCES `visao`.`grupo` (`cod_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`palavraChave`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`palavraChave` (
  `cod_palavraChave` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_palavraChave`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`palavraChave_informacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`palavraChave_informacao` (
  `idpalavraChave_informacao` INT NOT NULL AUTO_INCREMENT,
  `palavraChave_cod_palavraChave` INT NOT NULL,
  `informacao_cod_informacao` INT NOT NULL,
  PRIMARY KEY (`idpalavraChave_informacao`),
  INDEX `fk_palavraChave_informacao_palavraChave1_idx` (`palavraChave_cod_palavraChave` ASC),
  INDEX `fk_palavraChave_informacao_informacao1_idx` (`informacao_cod_informacao` ASC),
  CONSTRAINT `fk_palavraChave_informacao_palavraChave1`
    FOREIGN KEY (`palavraChave_cod_palavraChave`)
    REFERENCES `visao`.`palavraChave` (`cod_palavraChave`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_palavraChave_informacao_informacao1`
    FOREIGN KEY (`informacao_cod_informacao`)
    REFERENCES `visao`.`informacao` (`cod_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`usuario_informacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`usuario_informacao` (
  `cod_usuario_informacao` INT NOT NULL AUTO_INCREMENT,
  `informacao_cod_informacao` INT NOT NULL,
  `usuario_cod_usuario` INT NOT NULL,
  `permissao` INT NULL,
  PRIMARY KEY (`cod_usuario_informacao`),
  INDEX `fk_usuario_informacao_informacao1_idx` (`informacao_cod_informacao` ASC),
  INDEX `fk_usuario_informacao_usuario1_idx` (`usuario_cod_usuario` ASC),
  CONSTRAINT `fk_usuario_informacao_informacao1`
    FOREIGN KEY (`informacao_cod_informacao`)
    REFERENCES `visao`.`informacao` (`cod_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_informacao_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`estadoTramitacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`estadoTramitacao` (
  `cod_estadoTramitacao` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`cod_estadoTramitacao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`tramitacaoIndicadorBase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`tramitacaoIndicadorBase` (
  `cod_tramitacaoIndicadorBase` INT NOT NULL AUTO_INCREMENT,
  `dataInicio` DATE NULL,
  `dataFinal` VARCHAR(45) NULL,
  `indicador_cod_indicador` INT NOT NULL,
  `estadoTramitacao_cod_estadoTramitacao` INT NOT NULL,
  PRIMARY KEY (`cod_tramitacaoIndicadorBase`),
  INDEX `fk_tramitacaoIndicadorBase_indicador1_idx` (`indicador_cod_indicador` ASC),
  INDEX `fk_tramitacaoIndicadorBase_estadoTramitacao1_idx` (`estadoTramitacao_cod_estadoTramitacao` ASC),
  CONSTRAINT `fk_tramitacaoIndicadorBase_indicador1`
    FOREIGN KEY (`indicador_cod_indicador`)
    REFERENCES `visao`.`indicador` (`cod_indicador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tramitacaoIndicadorBase_estadoTramitacao1`
    FOREIGN KEY (`estadoTramitacao_cod_estadoTramitacao`)
    REFERENCES `visao`.`estadoTramitacao` (`cod_estadoTramitacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`grupo_informacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`grupo_informacao` (
  `cod_grupo_informcao` INT NOT NULL AUTO_INCREMENT,
  `informacao_cod_informacao` INT NOT NULL,
  `grupo_cod_grupo` INT NOT NULL,
  PRIMARY KEY (`cod_grupo_informcao`),
  INDEX `fk_grupo_informcao_informacao1_idx` (`informacao_cod_informacao` ASC),
  INDEX `fk_grupo_informcao_grupo1_idx` (`grupo_cod_grupo` ASC),
  CONSTRAINT `fk_grupo_informcao_informacao1`
    FOREIGN KEY (`informacao_cod_informacao`)
    REFERENCES `visao`.`informacao` (`cod_informacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_grupo_informcao_grupo1`
    FOREIGN KEY (`grupo_cod_grupo`)
    REFERENCES `visao`.`grupo` (`cod_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `visao`.`indicador_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `visao`.`indicador_usuario` (
  `idindicador_usuario` INT NOT NULL AUTO_INCREMENT,
  `indicador_cod_indicador` INT NOT NULL,
  `usuario_cod_usuario` INT NOT NULL,
  PRIMARY KEY (`idindicador_usuario`),
  INDEX `fk_indicador_usuario_indicador1_idx` (`indicador_cod_indicador` ASC),
  INDEX `fk_indicador_usuario_usuario1_idx` (`usuario_cod_usuario` ASC),
  CONSTRAINT `fk_indicador_usuario_indicador1`
    FOREIGN KEY (`indicador_cod_indicador`)
    REFERENCES `visao`.`indicador` (`cod_indicador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicador_usuario_usuario1`
    FOREIGN KEY (`usuario_cod_usuario`)
    REFERENCES `visao`.`usuario` (`cod_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
