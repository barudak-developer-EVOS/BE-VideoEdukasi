-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 28, 2024 at 12:53 PM
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
  `account_profile_photo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('student','tutor') COLLATE utf8mb4_general_ci NOT NULL,
  `account_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_name`, `account_email`, `account_password`, `account_profile_photo`, `role`, `account_created_at`, `account_updated_at`) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$d5ddvC36CAQhlBeX6gLxBuYou5a1A3ULjNc2nmhuiibWGBru9wR02', NULL, 'student', '2024-12-12 04:10:48', '2024-12-12 04:10:48'),
(2, 'Mamat Uncal', 'mamatuncal@example.com', '$2a$10$m9/2uKTUOBH7PBgUNnXNduN/v0jrO7aGUOBIlQeqdhdMNYA8nodUW', NULL, 'student', '2024-12-12 04:21:48', '2024-12-12 04:25:36'),
(4, 'Abdul', 'tutor@example.com', '$2a$10$dH3DnTYNfBQ7egmf9bQCLeygcmCTP/ZYhpfMoHBpowRoZ2hmJXDw.', NULL, 'tutor', '2024-12-24 04:35:56', '2024-12-24 04:35:56'),
(5, 'Hapis', 'student@example.com', '$2a$10$KrqEM.QWgxSFc7gF6HJ.yeOAt/Bns67ac7p/rh.Y/FxbgC2597dFW', NULL, 'student', '2024-12-25 06:36:37', '2024-12-25 06:36:37');

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

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `comment_content`, `account_id`, `video_id`, `comment_created_at`) VALUES
(2, 'Ini adalah komentar', 4, 5, '2024-12-25 05:06:05');

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
  `views` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`video_id`, `video_title`, `video_description`, `video_url`, `video_thumbnail`, `account_id`, `video_education_level`, `video_subject`, `video_created_at`, `video_updated_at`, `likes`, `dislikes`, `views`) VALUES
(1, 'Video Title', 'Description', 'https://www.youtube.com/watch?v=y7wplRy7w84', 'hayamhayam', 4, 'SMP', 'Matematika', '2024-12-24 04:48:46', '2024-12-24 04:48:46', 0, 0, 0),
(4, 'Bejalar IPAdasar', 'Konsep dasar IPA untuk siswa SMA', 'http://localhost:3000/uploads/videos/1735102190927-127065694-2024-12-12 11-24-14.mp4', 'http://localhost:3000/uploads/thumbnails/1735102191008-801681998-Usecase diagram.png', 4, 'SMA', 'IPA', '2024-12-25 04:49:51', '2024-12-25 04:49:51', 0, 0, 0),
(5, 'Bejalar IPS dasar', 'Konsep dasar IPS untuk siswa SD', 'http://localhost:3000/uploads/videos/1735103015029-175375293-2024-12-12 11-24-14.mp4', 'http://localhost:3000/uploads/thumbnails/1735103015110-544405673-Usecase diagram.png', 4, 'SD', 'IPS', '2024-12-25 05:03:35', '2024-12-25 05:03:35', 0, 0, 0),
(6, 'Belajar ingfi Lanjutan', 'Video untuk memahami matematika lanjutan', 'https://www.youtube.com/watch?v=updated_example', 'http://example.com/new_thumbnail.jpg', 4, 'SMA', 'Matematika', '2024-12-25 06:43:09', '2024-12-25 07:17:18', 0, 0, 0);

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
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `video_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
