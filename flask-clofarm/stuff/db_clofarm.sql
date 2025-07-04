-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 04, 2025 at 06:37 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_clofarm`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_agrowisata`
--

CREATE TABLE `tb_agrowisata` (
  `id_agrowisata` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `city` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `ticket_price` varchar(100) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `maps_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_agrowisata`
--

INSERT INTO `tb_agrowisata` (`id_agrowisata`, `name`, `description`, `city`, `province`, `ticket_price`, `image_url`, `maps_url`) VALUES
(1, 'Eco Bike Coffee', 'mmmm', 'Kintamani', 'Bali', 'Rp. 50.000', 'https://asset-2.tstatic.net/bali/foto/bank/images/kintamani-eco-bike-coffee-salah-satu-kafe-yang-berada-di-bangli-bali.jpg\n', 'https://www.google.com/maps/place/Kintamani+Coffee+-+Eco+Bike+Coffee/@-8.2695116,115.3436286,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd1f44fe731a7e1:0xa03282dac89d6ce1!8m2!3d-8.2695116!4d115.3436286!16s%2Fg%2F11g8xbddrp?entry=ttu&g_ep=EgoyMDI1MDYyOS4wIKXMDSoASAFQAw%3D%3D\n'),
(2, 'Eco Bike Coffee', 'bbb', 'Kintamani', 'Bali', 'Rp. 50.000', 'https://asset-2.tstatic.net/bali/foto/bank/images/kintamani-eco-bike-coffee-salah-satu-kafe-yang-berada-di-bangli-bali.jpg\n', 'https://www.google.com/maps/place/Kintamani+Coffee+-+Eco+Bike+Coffee/@-8.2695116,115.3436286,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd1f44fe731a7e1:0xa03282dac89d6ce1!8m2!3d-8.2695116!4d115.3436286!16s%2Fg%2F11g8xbddrp?entry=ttu&g_ep=EgoyMDI1MDYyOS4wIKXMDSoASAFQAw%3D%3D\n');

-- --------------------------------------------------------

--
-- Table structure for table `tb_agrowisata_reviews`
--

CREATE TABLE `tb_agrowisata_reviews` (
  `id_agrowisata_reviews` int NOT NULL,
  `id_agrowisata` int NOT NULL,
  `id_user` int NOT NULL,
  `rating` int NOT NULL,
  `review_text` text,
  `url_images` varchar(200) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_articles`
--

CREATE TABLE `tb_articles` (
  `id_articles` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `article_url` varchar(500) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_articles`
--

INSERT INTO `tb_articles` (`id_articles`, `title`, `description`, `article_url`, `image_url`) VALUES
(1, 'Smart Farming Project', 'Hydroponic: A Sustainable Farming', 'https://www.imphaltimes.com/articles/hydroponic-a-sustainable-farming/', 'https://imphaltimes.b-cdn.net/wp-content/uploads/2025/07/Hydroponic-A-Sustainable-Farming-optimized.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_community_comments`
--

CREATE TABLE `tb_community_comments` (
  `id_community_comments` int NOT NULL,
  `id_user` int DEFAULT NULL,
  `id_community_posts` int DEFAULT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_community_likes`
--

CREATE TABLE `tb_community_likes` (
  `id_community_likes` int NOT NULL,
  `id_user` int NOT NULL,
  `id_community_posts` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_community_likes`
--

INSERT INTO `tb_community_likes` (`id_community_likes`, `id_user`, `id_community_posts`) VALUES
(2, 1, 1),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_community_posts`
--

CREATE TABLE `tb_community_posts` (
  `id_community_posts` int NOT NULL,
  `id_user` int NOT NULL,
  `content` text NOT NULL,
  `images_url` varchar(255) DEFAULT NULL,
  `likes_count` int DEFAULT '0',
  `comments_count` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_community_posts`
--

INSERT INTO `tb_community_posts` (`id_community_posts`, `id_user`, `content`, `images_url`, `likes_count`, `comments_count`) VALUES
(1, 1, 'menanam cabe', 'https://farmee.id/wp-content/uploads/2020/10/cara-menanam-selada-hidroponik-1024x1024.jpg', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_mentorship`
--

CREATE TABLE `tb_mentorship` (
  `id_mentorship` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `mentorship_url` varchar(500) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_mentorship`
--

INSERT INTO `tb_mentorship` (`id_mentorship`, `title`, `description`, `mentorship_url`, `image_url`) VALUES
(1, 'SEMINAR NANAM CABE', 'cabenya buat dijual', 'https://chat.whatsapp.com/K9mKp7cCe0WHPv1R3dtRQv?mode=ac_c', 'https://magri.upnjatim.ac.id/wp-content/uploads/2023/09/webinar-1-723x1024.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_mentorship_registration`
--

CREATE TABLE `tb_mentorship_registration` (
  `id_mentorship_registration` int NOT NULL,
  `id_user` int NOT NULL,
  `id_mentorship` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text,
  `occupation` enum('Student','Employed','Unemployed','Looking for a job') NOT NULL,
  `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_mentorship_registration`
--

INSERT INTO `tb_mentorship_registration` (`id_mentorship_registration`, `id_user`, `id_mentorship`, `name`, `email`, `phone_number`, `address`, `occupation`, `registered_at`) VALUES
(1, 1, 1, 'lele', 'le@gmail.com', '081987564258', 'pantai selatan', 'Unemployed', '2025-07-02 10:22:51'),
(2, 1, 1, 'lele', 'le@gmail.com', '081987564258', 'kos', 'Unemployed', '2025-07-02 10:23:46');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tutorials`
--

CREATE TABLE `tb_tutorials` (
  `id_tutorials` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `tutorial_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_tutorials`
--

INSERT INTO `tb_tutorials` (`id_tutorials`, `title`, `description`, `thumbnail_url`, `tutorial_url`) VALUES
(1, 'tutorial menanam cabe', 'cabe enak', 'https://img.youtube.com/vi/wv4AguW_dmM/sddefault.jpg', 'https://youtube.com/watch?v=wv4AguW_dmM');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id_user` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id_user`, `username`, `phone_number`, `password`, `photo_url`, `name`) VALUES
(1, 'clofarm', '08125311559', 'scrypt:32768:8:1$in4MGmFGhAeI6AMh$77fab31091c927ba97a7ae7c3ce253ecb0d15b9678ede918effe505a2d452a28d3fb595366742066453464ede10acf4167e153e9551a198704c910cb5028acc6', 'https://img.youtube.com/vi/B3e3c-HYw-U/mqdefault.jpg', 'nana'),
(2, 'nenek tapasya', '08125311559', 'scrypt:32768:8:1$gC8gptousngVOnMF$1ed53a5286393ebecc225df29f0b3a250e3845e2ad31cfdc00d4fe9ac9edfeb81e77df33e05a0fb2347418028131628ddd152468156d337844761bdeadde7317', NULL, 'nekta');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_agrowisata`
--
ALTER TABLE `tb_agrowisata`
  ADD PRIMARY KEY (`id_agrowisata`);

--
-- Indexes for table `tb_agrowisata_reviews`
--
ALTER TABLE `tb_agrowisata_reviews`
  ADD PRIMARY KEY (`id_agrowisata_reviews`),
  ADD KEY `id_agrowisata` (`id_agrowisata`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_articles`
--
ALTER TABLE `tb_articles`
  ADD PRIMARY KEY (`id_articles`);

--
-- Indexes for table `tb_community_comments`
--
ALTER TABLE `tb_community_comments`
  ADD PRIMARY KEY (`id_community_comments`),
  ADD KEY `user_id` (`id_user`),
  ADD KEY `post_id` (`id_community_posts`);

--
-- Indexes for table `tb_community_likes`
--
ALTER TABLE `tb_community_likes`
  ADD PRIMARY KEY (`id_community_likes`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_community_posts` (`id_community_posts`);

--
-- Indexes for table `tb_community_posts`
--
ALTER TABLE `tb_community_posts`
  ADD PRIMARY KEY (`id_community_posts`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tb_mentorship`
--
ALTER TABLE `tb_mentorship`
  ADD PRIMARY KEY (`id_mentorship`);

--
-- Indexes for table `tb_mentorship_registration`
--
ALTER TABLE `tb_mentorship_registration`
  ADD PRIMARY KEY (`id_mentorship_registration`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_mentorship` (`id_mentorship`);

--
-- Indexes for table `tb_tutorials`
--
ALTER TABLE `tb_tutorials`
  ADD PRIMARY KEY (`id_tutorials`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_agrowisata`
--
ALTER TABLE `tb_agrowisata`
  MODIFY `id_agrowisata` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_agrowisata_reviews`
--
ALTER TABLE `tb_agrowisata_reviews`
  MODIFY `id_agrowisata_reviews` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_articles`
--
ALTER TABLE `tb_articles`
  MODIFY `id_articles` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_community_comments`
--
ALTER TABLE `tb_community_comments`
  MODIFY `id_community_comments` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_community_likes`
--
ALTER TABLE `tb_community_likes`
  MODIFY `id_community_likes` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_community_posts`
--
ALTER TABLE `tb_community_posts`
  MODIFY `id_community_posts` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_mentorship`
--
ALTER TABLE `tb_mentorship`
  MODIFY `id_mentorship` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_mentorship_registration`
--
ALTER TABLE `tb_mentorship_registration`
  MODIFY `id_mentorship_registration` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_tutorials`
--
ALTER TABLE `tb_tutorials`
  MODIFY `id_tutorials` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_agrowisata_reviews`
--
ALTER TABLE `tb_agrowisata_reviews`
  ADD CONSTRAINT `tb_agrowisata_reviews_ibfk_1` FOREIGN KEY (`id_agrowisata`) REFERENCES `tb_agrowisata` (`id_agrowisata`) ON DELETE CASCADE,
  ADD CONSTRAINT `tb_agrowisata_reviews_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `tb_users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `tb_community_comments`
--
ALTER TABLE `tb_community_comments`
  ADD CONSTRAINT `tb_community_comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_users` (`id_user`),
  ADD CONSTRAINT `tb_community_comments_ibfk_2` FOREIGN KEY (`id_community_posts`) REFERENCES `tb_community_posts` (`id_community_posts`);

--
-- Constraints for table `tb_community_likes`
--
ALTER TABLE `tb_community_likes`
  ADD CONSTRAINT `tb_community_likes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_users` (`id_user`),
  ADD CONSTRAINT `tb_community_likes_ibfk_2` FOREIGN KEY (`id_community_posts`) REFERENCES `tb_community_posts` (`id_community_posts`);

--
-- Constraints for table `tb_community_posts`
--
ALTER TABLE `tb_community_posts`
  ADD CONSTRAINT `tb_community_posts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_users` (`id_user`);

--
-- Constraints for table `tb_mentorship_registration`
--
ALTER TABLE `tb_mentorship_registration`
  ADD CONSTRAINT `tb_mentorship_registration_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tb_users` (`id_user`),
  ADD CONSTRAINT `tb_mentorship_registration_ibfk_2` FOREIGN KEY (`id_mentorship`) REFERENCES `tb_mentorship` (`id_mentorship`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
