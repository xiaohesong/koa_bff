CREATE TABLE IF NOT EXISTS  `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origin_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `oss_path` varchar(255) DEFAULT NULL,
  `status` VARCHAR(10) DEFAULT 'pending',
  `type` VARCHAR(10) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 -- status: 0 is pending, 1 is processing, 2 is done
 -- type: 0 is cars, 1 is drivers