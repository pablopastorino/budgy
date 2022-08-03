-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
SET @@auto_increment_increment = 1;
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema heroku_d9618894fe3a79c
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heroku_d9618894fe3a79c
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heroku_d9618894fe3a79c` DEFAULT CHARACTER SET utf8 ;
USE `heroku_d9618894fe3a79c` ;

-- -----------------------------------------------------
-- Table `heroku_d9618894fe3a79c`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_d9618894fe3a79c`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `is_earning` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8; 


-- -----------------------------------------------------
-- Table `heroku_d9618894fe3a79c`.`concepts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_d9618894fe3a79c`.`concepts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL UNIQUE,
  `categories_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_concepts_categories1_idx` (`categories_id` ASC),
  CONSTRAINT `fk_concepts_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `heroku_d9618894fe3a79c`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `heroku_d9618894fe3a79c`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_d9618894fe3a79c`.`users` (
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
-- Table `heroku_d9618894fe3a79c`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_d9618894fe3a79c`.`transactions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ammount` DECIMAL(10,0) NOT NULL,
  `registraton_date` DATETIME NOT NULL,
  `score` VARCHAR(45) NULL DEFAULT NULL,
  `users_id` INT(11) NOT NULL,
  `concepts_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `concepts_id`),
  INDEX `fk_transactions_users1_idx` (`users_id` ASC),
  INDEX `fk_transactions_concepts1_idx` (`concepts_id` ASC),
  CONSTRAINT `fk_transactions_concepts1`
    FOREIGN KEY (`concepts_id`)
    REFERENCES `heroku_d9618894fe3a79c`.`concepts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_transactions_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `heroku_d9618894fe3a79c`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;