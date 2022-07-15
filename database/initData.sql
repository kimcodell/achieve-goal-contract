-- user 데이터
INSERT INTO `achieve-goal-contract`.`user` (`name`, `email`, `passwordHash`, `nickname`, `registerType`, `walletAddress`) VALUES ('홍길동', 'test1@naver.com', '11111111', '유저1', '1', '0x4842923020fB0732F395C99bE5F49831199BB03C');
INSERT INTO `achieve-goal-contract`.`user` (`name`, `email`, `nickname`, `registerType`) VALUES ('김철수', 'test2@naver.com', '유저2', '2');
INSERT INTO `achieve-goal-contract`.`user` (`name`, `email`, `passwordHash`, `nickname`, `registerType`) VALUES ('홍길순', 'test3@naver.com', '11111111', '유저3', '1');
INSERT INTO `achieve-goal-contract`.`user` (`name`, `email`, `nickname`, `registerType`) VALUES ('박서현', 'test4@naver.com', '유저4', '2');
INSERT INTO `achieve-goal-contract`.`user` (`name`, `email`, `passwordHash`, `nickname`, `registerType`) VALUES ('정혜인', 'test5@naver.com', '11111111', '유저5', '1');

-- post 데이터
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('1', '제목1', '안녕하세요.', '100000', '2022-07-15', '2022-08-03', '1', '9');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('1', '제목2', '안녕하세요.', '100000', '2022-07-15', '2022-08-03', '3', '10');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('2', '제목3', '안녕하세요.', '300000', '2022-07-15', '2022-08-03', '2', '8');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('1', '제목4', '안녕하세요.', '100000', '2022-07-15', '2022-08-03', '1', '20');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('3', '제목5', '안녕하세요.', '150000', '2022-07-15', '2022-08-03', '7', '6');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('3', '제목6', '안녕하세요.', '1000000', '2022-07-15', '2022-08-03', '1', '8');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('5', '제목7', '안녕하세요.', '400000', '2022-07-15', '2022-08-03', '2', '11');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('2', '제목8', '안녕하세요.', '100000', '2022-07-15', '2022-08-03', '1', '23');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('5', '제목9', '안녕하세요.', '200000', '2022-07-15', '2022-08-03', '1', '12');
INSERT INTO `achieve-goal-contract`.`post` (`userId`, `title`, `content`, `distributionTokenAmount`, `certificationStartDate`, `certificationEndDate`, `certificationCycle`, `certificationTime`) VALUES ('1', '제목10', '안녕하세요.', '180000', '2022-07-15', '2022-08-03', '1', '15');

-- certiPost 데이터
INSERT INTO `achieve-goal-contract`.`certiPost` (`postId`, `comment`, `imageUrl`, `createdAt`) VALUES ('1', '인증', 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg', '2022-07-15 08:36:12');
INSERT INTO `achieve-goal-contract`.`certiPost` (`postId`, `comment`, `imageUrl`, `createdAt`) VALUES ('1', '인증', 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg', '2022-07-16 08:42:12');
INSERT INTO `achieve-goal-contract`.`certiPost` (`postId`, `comment`, `imageUrl`, `createdAt`) VALUES ('1', '인증', 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg', '2022-07-17 08:47:52 ');
INSERT INTO `achieve-goal-contract`.`certiPost` (`postId`, `comment`, `imageUrl`, `createdAt`) VALUES ('5', '인증', 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg', '2022-07-15 05:58:13');
INSERT INTO `achieve-goal-contract`.`certiPost` (`postId`, `comment`, `imageUrl`, `createdAt`) VALUES ('8', '인증', 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg', '2022-07-15 22:36:12');
INSERT INTO `achieve-goal-contract`.`certiPost` (`postId`, `comment`, `imageUrl`, `createdAt`) VALUES ('7', '인증', 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg', '2022-07-15 10:56:29');

-- comment 데이터
INSERT INTO `achieve-goal-contract`.`comment` (`postId`, `userId`, `comment`) VALUES ('1', '2', '응원합니다.');
INSERT INTO `achieve-goal-contract`.`comment` (`postId`, `userId`, `comment`) VALUES ('1', '4', '응원합니다.');
INSERT INTO `achieve-goal-contract`.`comment` (`postId`, `userId`, `comment`) VALUES ('3', '1', '응원합니다.');
INSERT INTO `achieve-goal-contract`.`comment` (`postId`, `userId`, `comment`) VALUES ('5', '5', '응원합니다.');
INSERT INTO `achieve-goal-contract`.`comment` (`postId`, `userId`, `comment`) VALUES ('8', '1', '응원합니다.');
INSERT INTO `achieve-goal-contract`.`comment` (`postId`, `userId`, `comment`) VALUES ('7', '1', '응원합니다.');
