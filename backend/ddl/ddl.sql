CREATE TABLE `user` (
  `id` varchar(20) PRIMARY KEY
);

CREATE TABLE `town` (
  `user_id` varchar(20),
  `name` varchar(10)
);

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(20),
  `price` int,
  `description` varchar(200),
  `town` varchar(10),
  `user_id` varchar(20),
  `state` char(10),
  `category` char(20),
  `watch_count` int default 0,
  `created_date` datetime default now()
);

CREATE TABLE `product_img` (
  `img_url` varchar(500),
  `product_id` int
);

CREATE TABLE `user_like` (
  `user_id` varchar(20),
  `product_id` int
);

CREATE TABLE `chat`(
    `id` int PRIMARY KEY AUTO_INCREMENT,
    `product_id` int,
    `seller_id` varchar(20),
    `customer_id` varchar(20),
    `uncheck_count_seller` int default 0,
    `uncheck_count_customer` int default 0
);

CREATE TABLE `chat_log` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `message` varchar(100),
  `user_id` varchar(20),
  `product_id` int,
  `created_date` datetime default now()
);

ALTER TABLE `user_like` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `user_like` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `town` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `product_img` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `chat_log` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `chat_log` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `chat` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

ALTER TABLE `chat` ADD FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`);

ALTER TABLE `chat` ADD FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`);
