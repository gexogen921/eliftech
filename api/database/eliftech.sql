/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50541
Source Host           : localhost:356
Source Database       : eliftech

Target Server Type    : MYSQL
Target Server Version : 50541
File Encoding         : 65001

Date: 2016-04-2 17:41:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `companies`
-- ----------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_parent` int(11) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `earnings` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of companies
-- ----------------------------
INSERT INTO `companies` VALUES ('1', '0', 'Company1', '25.5');
INSERT INTO `companies` VALUES ('2', '1', 'Company2', '1.3');
INSERT INTO `companies` VALUES ('3', '2', 'Company3', '5');
INSERT INTO `companies` VALUES ('4', '1', 'Company4', '1');
INSERT INTO `companies` VALUES ('5', '0', 'Company5', '10');
