CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `name` varchar(120),
  `username` varchar(120),
  `phone` varchar(120),
  `sex` varchar(120),
  `password` varchar(120),
  `status` tinyint(1),
  `create_by` varchar(120),
  `create_at` timestamp
);

CREATE TABLE `roles` (
  `role_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120),
  `code` int,
  `discription` varchar(255),
  `create_at` timestamp
);

CREATE TABLE `customers` (
  `cust_id` int int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120),
  `phone` varchar(18),
  `email` varchar(120),
  `address` text,
  `create_at` timestamp
);

CREATE TABLE `category` (
  `category_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `code` int(11),
  `description` varchar(120),
  `img` blob
);

CREATE TABLE `products` (
  `product_id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int,
  `product_type_id` int,
  `name` varchar(120),
  `brand` varchar(120),
  `barcode` varchar(120),
  `description` text,
  `qty` int(6),
  `price` DECIMAL(7,2),
  `discount` DECIMAL(3,2),
  `status` tinyint(1),
  `image` blob,
  `create_by` varchar(120),
  `create_at` timestamp
);

CREATE TABLE `orders` (
  `order_id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int,
  `order_no` varchar(120),
  `user_id` int(11),
  `paid_amount` DECIMAL(7,2),
  `payment_method` varchar(120),
  `remark` text,
  `status` boolean,
  `create_by` varchar(120),
  `create_at` timestamp
);

CREATE TABLE `order_items` (
  `orderitem_id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int,
  `product_id` int,
  `qty` int(6),
  `price` DECIMAL(7,2),
  `discount` DECIMAL(7,2),
  `total` DECIMAL(7,2)
);

CREATE TABLE `ivoices` (
  `invoice_id` int PRIMARY KEY AUTO_INCREMENT,
  `invoice_no` varchar(120),
  `order_id` int,
  `customer_id` int(11),
  `shipp_company` varchar(255),
  `shipp_cost` DECIMAL(7,2),
  `paid_amount` DECIMAL(7,2),
  `total_amount` DECIMAL(7,2),
  `paid_date` datetime,
  `payment_status` varchar(120),
  `create_by` varchar(120),
  `create_at` timestamp
);

CREATE TABLE `product_type` (
  `pro_type_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_type_name` VARCHAR(255),
  `image` blob,
  `create_by` varchar(120),
  `create_at` timestamp
);

CREATE TABLE `exchange_rate` (
  `user_id` int,
  `khh_currency` decimal,
  `usd_currency` decimal
);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`pro_type_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`cust_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `ivoices` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

ALTER TABLE `exchange_rate` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
