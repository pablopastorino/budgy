SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET @@auto_increment_increment = 1;
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema budgy_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema budgy_db
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `budgy_db`;
CREATE SCHEMA IF NOT EXISTS `budgy_db` DEFAULT CHARACTER SET utf8 ;
USE `budgy_db` ;

-- -----------------------------------------------------
-- Table `budgy_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgy_db`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `is_earning` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8; 


-- -----------------------------------------------------
-- Table `budgy_db`.`concepts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgy_db`.`concepts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `categories_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_concepts_categories1_idx` (`categories_id` ASC),
  CONSTRAINT `fk_concepts_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `budgy_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `budgy_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgy_db`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `registration_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `budgy_db`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgy_db`.`transactions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ammount` DECIMAL(10,0) NOT NULL,
  `transaction_date` DATE NOT NULL,
  `registration_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `score` VARCHAR(45) NULL DEFAULT NULL,
  `users_id` INT(11) NOT NULL,
  `concepts_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transactions_users1_idx` (`users_id` ASC),
  INDEX `fk_transactions_concepts1_idx` (`concepts_id` ASC),
  CONSTRAINT `fk_transactions_concepts1`
    FOREIGN KEY (`concepts_id`)
    REFERENCES `budgy_db`.`concepts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_transactions_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `budgy_db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `budgy_db`.`categories` (name, is_earning) 
	VALUES
		('housing', 0),
		('transportation', 0),
		('food', 0),
		('utilities', 0),
		('insurance', 0),
		('medical & healthcare', 0),
		('saving, investing & debt payments',	0),
		('personal spending', 0),
		('recreation & entertainment',0),
		('miscellaneous', 0),
		('salary & wages', 1),
		('investment', 1),
		('business', 1),
		('interests', 1),
		('rental', 1),
		('other', 1);