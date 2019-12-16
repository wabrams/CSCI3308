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
CREATE SCHEMA IF NOT EXISTS `filebox` DEFAULT CHARACTER SET utf8 ;
USE `filebox` ;

-- -----------------------------------------------------
-- Table `csci3308`.`Users`
-- -----------------------------------------------------

DROP TABLE users;
CREATE TABLE IF NOT EXISTS `users` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` INT NOT NULL AUTO_INCREMENT COMMENT 'GUID',
  PRIMARY KEY (`userID`));

CREATE UNIQUE INDEX `email_UNIQUE` ON `filebox`.`users` (`email` ASC) VISIBLE;

CREATE UNIQUE INDEX `username_UNIQUE` ON `filebox`.`users` (`username` ASC) VISIBLE;

INSERT INTO users (username, email, password) VALUES ('public', 'test123@test.com', '1234567');

-- -----------------------------------------------------
-- Table `csci3308`.`Files`
-- -----------------------------------------------------
DROP TABLE files;
CREATE TABLE IF NOT EXISTS `files` (
  `fileID` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL DEFAULT 1,
  `uploaded` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(255) NOT NULL,
  `fileSize` DEC(7,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`fileID`, `owner`),
  CONSTRAINT `userID`
    FOREIGN KEY (`owner`)
    REFERENCES `filebox`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fileOwner_idx` ON `filebox`.`files` (`owner` ASC) VISIBLE;

INSERT INTO files (name) VALUES ('testA.txt'), ('testB.txt'), ('testC.txt'), ('testD.txt');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
