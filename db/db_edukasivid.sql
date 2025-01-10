-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2025 at 11:19 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_email` varchar(255) NOT NULL,
  `account_password` varchar(255) NOT NULL,
  `account_profile_photo` varchar(255) DEFAULT NULL,
  `role` enum('student','tutor') NOT NULL,
  `account_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `account_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_name`, `account_email`, `account_password`, `account_profile_photo`, `role`, `account_created_at`, `account_updated_at`) VALUES
INSERT INTO `account` (`account_id`, `account_name`, `account_email`, `account_password`, `account_profile_photo`, `role`, `account_created_at`, `account_updated_at`) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$d5ddvC36CAQhlBeX6gLxBuYou5a1A3ULjNc2nmhuiibWGBru9wR02', NULL, 'student', '2024-12-12 04:10:48', '2024-12-12 04:10:48'),
(2, 'Mamat Uncal', 'mamatuncal@example.com', '$2a$10$m9/2uKTUOBH7PBgUNnXNduN/v0jrO7aGUOBIlQeqdhdMNYA8nodUW', NULL, 'student', '2024-12-12 04:21:48', '2024-12-12 04:25:36'),
(4, 'Abdul', 'tutor@example.com', '$2a$10$dH3DnTYNfBQ7egmf9bQCLeygcmCTP/ZYhpfMoHBpowRoZ2hmJXDw.', NULL, 'tutor', '2024-12-24 04:35:56', '2024-12-24 04:35:56'),
(5, 'Hapis', 'student@example.com', '$2a$10$KrqEM.QWgxSFc7gF6HJ.yeOAt/Bns67ac7p/rh.Y/FxbgC2597dFW', NULL, 'student', '2024-12-25 06:36:37', '2024-12-25 06:36:37'),
(6, 'jaguar', 'ejaguar@gmail.com', '$2a$10$ltUOKUzaLZEwYQE9BBAUPeyPO02QQwpHrsBhsfp1vpQyyh6akitzi', 'D:\\xampp\\htdocs\\BE-VideoEdukasi\\server\\uploads\\profile_photos\\1736426940936-409935783-5f6da653c1860.jpg', 'tutor', '2025-01-09 12:49:01', '2025-01-09 12:49:01'),
(7, 'Putri', 'putri@gmail.com', '$2y$10$pTksRAmktphbsRRYA3ImceEPxoAMcH8PK40sa0NgyYqX71lNIGmbW', NULL, 'tutor', '2025-01-09 02:36:39', '2025-01-09 02:37:00'),
(12, 'abdul', 'abdul10@gmail.com', '$2a$10$iK4PFxAdDFehix810bY1IO70HgArbYMJgUvqmLO5umqhzPsStNujK', 'C:\\Semester 5\\BE-VideoEdukasi\\server\\uploads\\profile_photos\\1736427339719-501082779-WhatsApp Image 2024-08-28 at 20.55.32_6ce453e3.jpg', 'tutor', '2025-01-09 12:55:39', '2025-01-09 12:55:39');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `comment_content` text NOT NULL,
  `account_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `comment_created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `video_id` int(11) NOT NULL,
  `video_title` varchar(255) NOT NULL,
  `video_description` text DEFAULT NULL,
  `video_url` varchar(255) NOT NULL,
  `video_thumbnail` varchar(255) NOT NULL,
  `account_id` int(11) NOT NULL,
  `video_education_level` enum('SD','SMP','SMA') NOT NULL,
  `video_subject` enum('PPKn','Bahasa Indonesia','Matematika','IPA','IPS','Agama','PJOK') NOT NULL,
  `video_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `video_updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `likes` int(11) DEFAULT 0,
  `dislikes` int(11) DEFAULT 0,
  `views` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video`
-- Dumping data for table `video`
--

INSERT INTO `video` (`video_id`, `video_title`, `video_description`, `video_url`, `video_thumbnail`, `account_id`, `video_education_level`, `video_subject`, `video_created_at`, `video_updated_at`, `likes`, `dislikes`, `views`) VALUES
(1, 'Video Title', 'Description', 'https://www.youtube.com/watch?v=y7wplRy7w84', 'hayamhayam', 4, 'SMP', 'Matematika', '2024-12-24 04:48:46', '2024-12-24 04:48:46', 0, 0, 0),
(2, 'Bejalar IPAdasar', 'Konsep dasar IPA untuk siswa SMA', 'http://localhost:3000/uploads/videos/1735102190927-127065694-2024-12-12 11-24-14.mp4', 'http://localhost:3000/uploads/thumbnails/1735102191008-801681998-Usecase diagram.png', 4, 'SMA', 'IPA', '2024-12-25 04:49:51', '2024-12-25 04:49:51', 0, 0, 0),
(3, 'Bejalar IPS dasar', 'Konsep dasar IPS untuk siswa SD', 'http://localhost:3000/uploads/videos/1735103015029-175375293-2024-12-12 11-24-14.mp4', 'http://localhost:3000/uploads/thumbnails/1735103015110-544405673-Usecase diagram.png', 4, 'SD', 'IPS', '2024-12-25 05:03:35', '2024-12-25 05:03:35', 0, 0, 0),
(4, 'Belajar ingfi Lanjutan', 'Video untuk memahami matematika lanjutan', 'https://www.youtube.com/watch?v=updated_example', 'http://example.com/new_thumbnail.jpg', 4, 'SMA', 'Matematika', '2024-12-25 06:43:09', '2024-12-25 07:17:18', 0, 0, 0),
(5, 'My Awesome Video', 'A description of the video', 'http://localhost:3000/uploads/videos/1736312260327-643641175-2024-12-25 08-31-37.mkv', 'http://localhost:3000/uploads/thumbnails/1736312260685-291208996-Screenshot 2024-12-31 062000.png', 4, 'SD', 'Bahasa Indonesia', '2025-01-08 04:57:40', '2025-01-08 04:57:40', 0, 0, 0),
(6, 'Belajar Aljabar', 'Konsep dasar Aljabar', 'http://localhost:3000/uploads/videos/1736414860155-820411589-testi.mp4', 'http://localhost:3000/uploads/thumbnails/1736414860169-500179009-testi2.jpg', 7, 'SMA', 'Matematika', '2025-01-09 09:27:40', '2025-01-09 09:27:40', 0, 0, 0),
(7, 'Belajar IPA', 'Konsep dasar IPA', 'http://localhost:3000/uploads/videos/1736417497736-949783877-1.mp4', 'http://localhost:3000/uploads/thumbnails/1736417497752-371708056-1.jpg', 7, 'SMA', 'IPA', '2025-01-09 10:11:37', '2025-01-09 10:11:37', 0, 0, 0),
(8, 'Belajar IPS', 'Konsep dasar IPS', 'http://localhost:3000/uploads/videos/1736417539872-238326736-2.mp4', 'http://localhost:3000/uploads/thumbnails/1736417539895-50317816-2.jpg', 7, 'SMA', 'IPS', '2025-01-09 10:12:19', '2025-01-09 10:12:19', 0, 0, 0),
(9, 'Matriks', 'Belajar Matriks 5 Menit', 'http://localhost:3000/uploads/videos/1736417719320-324214624-3.mp4', 'http://localhost:3000/uploads/thumbnails/1736417719372-783047865-3.jpg', 7, 'SMA', 'Matematika', '2025-01-09 10:15:19', '2025-01-09 10:15:19', 0, 0, 0),
(10, 'Basket Ball', 'Belajar Basket Ball', 'http://localhost:3000/uploads/videos/1736417796693-661821747-4.mp4', 'http://localhost:3000/uploads/thumbnails/1736417796702-244201585-4.jpg', 7, 'SMA', 'PJOK', '2025-01-09 10:16:36', '2025-01-09 10:16:36', 0, 0, 0),
(11, 'Bahasa Indonesia', 'Belajar Bahasa Indonesia', 'http://localhost:3000/uploads/videos/1736427728571-788885197-WhatsApp Video 2025-01-09 at 19.23.34_cf83a93a.mp4', 'http://localhost:3000/uploads/thumbnails/1736427728585-713311195-Anselma.jpg', 12, 'SMP', 'Bahasa Indonesia', '2025-01-09 13:02:08', '2025-01-09 13:02:08', 0, 0, 0),
(12, 'Sepak Bola', 'Teknik Dasar Bermain Bola', 'http://localhost:3000/uploads/videos/1736428000966-633480890-WhatsApp Video 2025-01-09 at 20.03.23_e473c4b6.mp4', 'http://localhost:3000/uploads/thumbnails/1736428000992-249620219-WhatsApp Image 2024-07-10 at 13.46.05_3169efff.jpg', 12, 'SMP', 'PJOK', '2025-01-09 13:06:40', '2025-01-09 13:06:40', 0, 0, 0),
(13, 'Sistem Klasifikasi Makhluk Hidup', 'Konsep Dasar Klasifikasi Makhluk Hidup', 'http://localhost:3000/uploads/videos/1736428080469-293060821-WhatsApp Video 2025-01-09 at 20.04.02_d83d0d86.mp4', 'http://localhost:3000/uploads/thumbnails/1736428080503-641906130-1e0311e402e15031f1aed14ecaf10a4d.jpg', 12, 'SMP', 'IPA', '2025-01-09 13:08:00', '2025-01-09 13:12:21', 0, 0, 0),
(14, 'Geografi', 'Belajar Geografi', 'http://localhost:3000/uploads/videos/1736428147258-42345273-WhatsApp Video 2025-01-09 at 20.04.32_9cad6058.mp4', 'http://localhost:3000/uploads/thumbnails/1736428147317-358640785-5f204ae94281563ca3cc7c7b68f14a22.jpg', 12, 'SMP', 'IPS', '2025-01-09 13:09:07', '2025-01-09 13:12:30', 0, 0, 0),
(15, 'Geometri dan Pengukuran', 'Konsep Dasar Geometri dan Pengukuran', 'http://localhost:3000/uploads/videos/1736428216023-518109289-WhatsApp Video 2025-01-09 at 20.05.17_76ec91f5.mp4', 'http://localhost:3000/uploads/thumbnails/1736428216082-932803740-3a7f5ee5ef5187327b7113c1ca39874d.jpg', 12, 'SMP', 'Matematika', '2025-01-09 13:10:16', '2025-01-09 13:12:40', 0, 0, 0),
(16, 'EL FAMILIA', 'kewarganegaraan', 'http://localhost:3000/uploads/videos/1736429289541-67143863-intro backsound 10 detik Â¶Â¶ music no copyright Â¶Â¶.mp4', 'http://localhost:3000/uploads/thumbnails/1736429289550-228729091-5f6da653c1860.jpg', 6, 'SD', 'PPKn', '2025-01-09 12:56:42', '2025-01-09 13:28:09', 0, 0, 0),
(17, 'Olahraga sehat kali', 'Semua tentang kesehatan', 'http://localhost:3000/uploads/videos/1736429465808-728409337-Intro Outro Music 10 Seconds.mp4', 'http://localhost:3000/uploads/thumbnails/1736429465815-183716095-5f6da653c1860.jpg', 6, 'SD', 'PJOK', '2025-01-09 12:59:56', '2025-01-09 13:31:05', 0, 0, 0),
(18, 'Sejarah tentang ytta', 'semua tentang sejarah', 'http://localhost:3000/uploads/videos/1736429611330-624805433-Video 10 detik.mp4', 'http://localhost:3000/uploads/thumbnails/1736429611342-210058386-5f6da653c1860.jpg', 6, 'SD', 'IPS', '2025-01-09 13:00:57', '2025-01-09 13:33:31', 0, 0, 0),
(19, 'aku cinta indonesia', 'semua tentang indonesia', 'http://localhost:3000/uploads/videos/1736429651212-626254087-10 Second Beep Timer.mp4', 'http://localhost:3000/uploads/thumbnails/1736429651215-796728297-5f6da653c1860.jpg', 6, 'SD', 'Bahasa Indonesia', '2025-01-09 13:03:23', '2025-01-09 13:34:11', 0, 0, 0),
(20, 'ilmu pengetahuan ytta', 'semua tentang ilmu ytta', 'http://localhost:3000/uploads/videos/1736429703217-507339229-10 Second Timer Timer 10 Detik.mp4', 'http://localhost:3000/uploads/thumbnails/1736429703221-643750540-5f6da653c1860.jpg', 6, 'SD', 'IPA', '2025-01-09 13:04:05', '2025-01-09 13:35:03', 0, 0, 0);


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
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
