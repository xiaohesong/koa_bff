CREATE TABLE   IF NOT EXISTS  `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;