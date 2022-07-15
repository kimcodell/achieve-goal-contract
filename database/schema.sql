DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` INTEGER NOT NULL auto_increment,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `passwordHash` VARCHAR(255),
  `nickname` VARCHAR(100) NOT NULL,
  `registerType` INTEGER NOT NULL,
  `walletAddress` VARCHAR(255),
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` INTEGER NOT NULL auto_increment,
  `userId` INTEGER NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT NOT NULL,
  `distributionTokenAmount` VARCHAR(255) NOT NULL,
  `certificationStartDate` DATETIME NOT NULL,
  `certificationEndDate` DATETIME NOT NULL,
  `certificationCycle` INTEGER NOT NULL,
  `certificationTime` INTEGER NOT NULL,
  `status` INTEGER NOT NULL DEFAULT 1,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `certiPost`;
CREATE TABLE IF NOT EXISTS `certiPost` (
  `id` INTEGER NOT NULL auto_increment,
  `postId` INTEGER NOT NULL,
  `comment` TEXT NOT NULL,
  `imageUrl` VARCHAR(255),
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` INTEGER NOT NULL auto_increment,
  `postId` INTEGER NOT NULL,
  `userId` INTEGER NOT NULL,
  `comment` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `goalToCheck`;
-- CREATE TABLE IF NOT EXISTS `goalToCheck` (
--   `id` INTEGER NOT NULL auto_increment,
--   `postId` INTEGER NOT NULL,
--   `isDone` INTEGER NOT NULL DEFAULT 0,
--   `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- );

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` INTEGER NOT NULL auto_increment,
  `jobName` VARCHAR(200) NOT NULL,
  `transactionHash` VARCHAR(255),
  `contractAddress` VARCHAR(255),
  `fromAddress` VARCHAR(255),
  `toAddress` VARCHAR(255),
  `amount` VARCHAR(255),
  `status` INTEGER NOT NULL DEFAULT 1,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 외래키 설정

ALTER TABLE `achieve-goal-contract`.`post` 
ADD INDEX `post_userId_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `achieve-goal-contract`.`post` 
ADD CONSTRAINT `post_userId`
  FOREIGN KEY (`userId`)
  REFERENCES `achieve-goal-contract`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `achieve-goal-contract`.`certiPost` 
ADD INDEX `certiPost_postId_idx` (`postId` ASC) VISIBLE;
;
ALTER TABLE `achieve-goal-contract`.`certiPost` 
ADD CONSTRAINT `certiPost_postId`
  FOREIGN KEY (`postId`)
  REFERENCES `achieve-goal-contract`.`post` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `achieve-goal-contract`.`comment` 
ADD INDEX `comments_postId_idx` (`postId` ASC) VISIBLE,
ADD INDEX `comments_userId_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `achieve-goal-contract`.`comment` 
ADD CONSTRAINT `comment_postId`
  FOREIGN KEY (`postId`)
  REFERENCES `achieve-goal-contract`.`post` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `comment_userId`
  FOREIGN KEY (`userId`)
  REFERENCES `achieve-goal-contract`.`user` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
