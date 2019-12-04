-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema csci3308
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema csci3308
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `csci3308` DEFAULT CHARACTER SET utf8 ;
USE `csci3308` ;

-- -----------------------------------------------------
-- Table `csci3308`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csci3308`.`Users` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` INT NOT NULL AUTO_INCREMENT COMMENT 'GUID',
  PRIMARY KEY (`userID`));

CREATE UNIQUE INDEX `email_UNIQUE` ON `csci3308`.`Users` (`email` ASC) VISIBLE;

CREATE UNIQUE INDEX `username_UNIQUE` ON `csci3308`.`Users` (`username` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `csci3308`.`Files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csci3308`.`Files` (
  `fileID` INT NOT NULL AUTO_INCREMENT,
  `owner` CHAR(16) NOT NULL,
  `uploaded` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `filePath` VARCHAR(255) NOT NULL,
  `fileSize` DEC(7,2) NOT NULL,
  PRIMARY KEY (`fileID`, `owner`),
  CONSTRAINT `userID`
    FOREIGN KEY (`owner`)
    REFERENCES `csci3308`.`Users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fileOwner_idx` ON `csci3308`.`Files` (`owner` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
