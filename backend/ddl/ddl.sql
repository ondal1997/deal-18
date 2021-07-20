CREATE TABLE `user` (
  `id` varchar(20) PRIMARY KEY,
  `town_name` varchar(10) NOT NULL
);

CREATE TABLE `town` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `name` varchar(10) NOT NULL,

  CONSTRAINT FK_town_user_id FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `price` int,
  `description` varchar(200) NOT NULL,
  `town` varchar(10) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `state` char(10) NOT NULL,
  `category` char(20) NOT NULL,
  `watch_count` int default 0 NOT NULL,
  `created_date` datetime default now() NOT NULL,
  `product_img_url` varchar(500) NOT NULL,

  CONSTRAINT FK_product_user_id FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `product_img` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `img_url` varchar(500) NOT NULL,
  `product_id` int NOT NULL,

  CONSTRAINT FK_product_img_product_id FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `user_like` (
  `user_id` varchar(20) NOT NULL,
  `product_id` int NOT NULL,

  CONSTRAINT PK_user_like PRIMARY KEY (`user_id`, `product_id`),
  CONSTRAINT FK_user_like_product_id FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_user_like_user_id FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `chat`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `seller_id` varchar(20) NOT NULL,
  `customer_id` varchar(20) NOT NULL,
  `uncheck_count_seller` int default 0 NOT NULL,
  `uncheck_count_customer` int default 0 NOT NULL,
  CONSTRAINT FK_chat_product_id FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_chat_seller_id FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_chat_customer_id FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `chat_log` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `message` varchar(100) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `chat_id` int NOT NULL,
  `created_date` datetime default now() NOT NULL,
  CONSTRAINT FK_chat_user_id FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FK_chat_chat_id FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
