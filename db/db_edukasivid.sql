-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 08, 2025 at 05:24 AM
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
-- Database: db_edukasivid
--

-- --------------------------------------------------------

--
-- Table structure for table account
--

CREATE TABLE account (
  account_id int(11) NOT NULL,
  account_name varchar(255) NOT NULL,
  account_email varchar(255) NOT NULL,
  account_password varchar(255) NOT NULL,
  account_profile_photo varchar(255) DEFAULT NULL,
  role enum('student','tutor') NOT NULL,
  account_created_at timestamp NOT NULL DEFAULT current_timestamp(),
  account_updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table account
--

INSERT INTO account (account_id, account_name, account_email, account_password, account_profile_photo, role, account_created_at, account_updated_at) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$d5ddvC36CAQhlBeX6gLxBuYou5a1A3ULjNc2nmhuiibWGBru9wR02', NULL, 'student', '2024-12-12 04:10:48', '2024-12-12 04:10:48'),
(2, 'Mamat Uncal', 'mamatuncal@example.com', '$2a$10$m9/2uKTUOBH7PBgUNnXNduN/v0jrO7aGUOBIlQeqdhdMNYA8nodUW', NULL, 'student', '2024-12-12 04:21:48', '2024-12-12 04:25:36'),
(4, 'Abdul', 'tutor@example.com', '$2a$10$dH3DnTYNfBQ7egmf9bQCLeygcmCTP/ZYhpfMoHBpowRoZ2hmJXDw.', NULL, 'tutor', '2024-12-24 04:35:56', '2024-12-24 04:35:56'),
(5, 'Hapis', 'student@example.com', '$2a$10$KrqEM.QWgxSFc7gF6HJ.yeOAt/Bns67ac7p/rh.Y/FxbgC2597dFW', NULL, 'student', '2024-12-25 06:36:37', '2024-12-25 06:36:37'),
(7, 'Putri', 'putri@gmail.com', '$2y$10$pTksRAmktphbsRRYA3ImceEPxoAMcH8PK40sa0NgyYqX71lNIGmbW', NULL, 'tutor', '2025-01-09 02:36:39', '2025-01-09 02:37:00');

-- --------------------------------------------------------

--
-- Table structure for table comment
--

CREATE TABLE comment (
  comment_id int(11) NOT NULL,
  comment_content text NOT NULL,
  account_id int(11) NOT NULL,
  video_id int(11) NOT NULL,
  comment_created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table video
--

CREATE TABLE video (
  video_id int(11) NOT NULL,
  video_title varchar(255) NOT NULL,
  video_description text DEFAULT NULL,
  video_url varchar(255) NOT NULL,
  video_thumbnail varchar(255) NOT NULL,
  account_id int(11) NOT NULL,
  video_education_level enum('SD','SMP','SMA') NOT NULL,
  video_subject enum('PPKn','Bahasa Indonesia','Matematika','IPA','IPS','Agama','PJOK') NOT NULL,
  video_created_at timestamp NOT NULL DEFAULT current_timestamp(),
  video_updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  likes int(11) DEFAULT 0,
  dislikes int(11) DEFAULT 0,
  views int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table video
--

INSERT INTO video (video_id, video_title, video_description, video_url, video_thumbnail, account_id, video_education_level, video_subject, video_created_at, video_updated_at, likes, dislikes, views) VALUES
(7, 'My Awesome Video', 'A description of the video', 'http://localhost:3000/uploads/videos/1736312260327-643641175-2024-12-25 08-31-37.mkv', 'http://localhost:3000/uploads/thumbnails/1736312260685-291208996-Screenshot 2024-12-31 062000.png', 4, 'SD', 'Bahasa Indonesia', '2025-01-08 04:57:40', '2025-01-08 04:57:40', 0, 0, 0),
(8, 'Belajar Aljabar', 'Konsep dasar Aljabar', 'http://localhost:3000/uploads/videos/1736414860155-820411589-testi.mp4', 'http://localhost:3000/uploads/thumbnails/1736414860169-500179009-testi2.jpg', 7, 'SMA', 'Matematika', '2025-01-09 09:27:40', '2025-01-09 09:27:40', 0, 0, 0),
(9, 'Belajar IPA', 'Konsep dasar IPA', 'http://localhost:3000/uploads/videos/1736417497736-949783877-1.mp4', 'http://localhost:3000/uploads/thumbnails/1736417497752-371708056-1.jpg', 7, 'SMA', 'IPA', '2025-01-09 10:11:37', '2025-01-09 10:11:37', 0, 0, 0),
(10, 'Belajar IPS', 'Konsep dasar IPS', 'http://localhost:3000/uploads/videos/1736417539872-238326736-2.mp4', 'http://localhost:3000/uploads/thumbnails/1736417539895-50317816-2.jpg', 7, 'SMA', 'IPS', '2025-01-09 10:12:19', '2025-01-09 10:12:19', 0, 0, 0),
(11, 'Matriks', 'Belajar Matriks 5 Menit', 'http://localhost:3000/uploads/videos/1736417719320-324214624-3.mp4', 'http://localhost:3000/uploads/thumbnails/1736417719372-783047865-3.jpg', 7, 'SMA', 'Matematika', '2025-01-09 10:15:19', '2025-01-09 10:15:19', 0, 0, 0),
(12, 'Basket Ball', 'Belajar Basket Ball', 'http://localhost:3000/uploads/videos/1736417796693-661821747-4.mp4', 'http://localhost:3000/uploads/thumbnails/1736417796702-244201585-4.jpg', 7, 'SMA', 'PJOK', '2025-01-09 10:16:36', '2025-01-09 10:16:36', 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table account
--
ALTER TABLE account
  ADD PRIMARY KEY (account_id),
  ADD UNIQUE KEY account_email (account_email);

--
-- Indexes for table comment
--
ALTER TABLE comment
  ADD PRIMARY KEY (comment_id),
  ADD KEY account_id (account_id),
  ADD KEY video_id (video_id);

--
-- Indexes for table video
--
ALTER TABLE video
  ADD PRIMARY KEY (video_id),
  ADD KEY account_id (account_id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table account
--
ALTER TABLE account
  MODIFY account_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table comment
--
ALTER TABLE comment
  MODIFY comment_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table video
--
ALTER TABLE video
  MODIFY video_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table comment
--
ALTER TABLE comment
  ADD CONSTRAINT comment_ibfk_2 FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE,
  ADD CONSTRAINT comment_ibfk_3 FOREIGN KEY (video_id) REFERENCES video (video_id);

--
-- Constraints for table video
--
ALTER TABLE video
  ADD CONSTRAINT video_ibfk_1 FOREIGN KEY (account_id) REFERENCES account (account_id) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
