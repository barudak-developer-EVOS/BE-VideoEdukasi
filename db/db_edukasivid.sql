-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 24, 2024 at 09:53 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_edukasivid`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int NOT NULL,
  `account_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `account_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `account_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('student','tutor') COLLATE utf8mb4_general_ci NOT NULL,
  `account_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_name`, `account_email`, `account_password`, `role`, `account_created_at`, `account_updated_at`) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$d5ddvC36CAQhlBeX6gLxBuYou5a1A3ULjNc2nmhuiibWGBru9wR02', 'student', '2024-12-12 04:10:48', '2024-12-12 04:10:48'),
(2, 'Mamat Uncal', 'mamatuncal@example.com', '$2a$10$m9/2uKTUOBH7PBgUNnXNduN/v0jrO7aGUOBIlQeqdhdMNYA8nodUW', 'student', '2024-12-12 04:21:48', '2024-12-12 04:25:36'),
(4, 'Abdul', 'tutor@example.com', '$2a$10$dH3DnTYNfBQ7egmf9bQCLeygcmCTP/ZYhpfMoHBpowRoZ2hmJXDw.', 'tutor', '2024-12-24 04:35:56', '2024-12-24 04:35:56');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int NOT NULL,
  `comment_content` text COLLATE utf8mb4_general_ci NOT NULL,
  `account_id` int NOT NULL,
  `video_id` int NOT NULL,
  `comment_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `video_id` int NOT NULL,
  `video_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `video_description` text COLLATE utf8mb4_general_ci,
  `video_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `video_thumbnail` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `account_id` int NOT NULL,
  `video_education_level` enum('SD','SMP','SMA') COLLATE utf8mb4_general_ci NOT NULL,
  `video_subject` enum('PPKn','Bahasa Indonesia','Matematika','IPA','IPS','Agama','PJOK') COLLATE utf8mb4_general_ci NOT NULL,
  `video_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `video_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `likes` int DEFAULT '0',
  `dislikes` int DEFAULT '0',
  `views` int NOT NULL,
  `comment_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`video_id`, `video_title`, `video_description`, `video_url`, `video_thumbnail`, `account_id`, `video_education_level`, `video_subject`, `video_created_at`, `video_updated_at`, `likes`, `dislikes`, `views`, `comment_id`) VALUES
(1, 'Video Title', 'Description', 'https://www.youtube.com/watch?v=y7wplRy7w84', 'hayamhayam', 4, 'SMP', 'Matematika', '2024-12-24 04:48:46', '2024-12-24 04:48:46', 0, 0, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD UNIQUE KEY `account_email` (`account_email`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`video_id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `fk_comment_id` (`comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `video_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`);

--
-- Constraints for table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `fk_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
