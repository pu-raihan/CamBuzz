-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 18, 2023 at 01:38 PM
-- Server version: 8.1.0
-- PHP Version: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cambuzz`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profilePic` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `profilePic`) VALUES
(1, 'admin1', 'cambuzz@pondiuni.ac.in', '$2a$10$un9yJHBHc8nuQS8vyvyP6OwtElBdCWmAvaWjJstzTILIP6NVZOOly', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `atm`
--

CREATE TABLE `atm` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `atm`
--

INSERT INTO `atm` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'SBI ATM', 0x00000000010100000057ec8de4bd0b2840629b9a0c12f75340, 1, 'Outside Campus.'),
(2, 'HDFC ATM', 0x00000000010100000046b72654800a28402693f85c0cf75340, 1, 'Outside Campus.'),
(3, 'Axis ATM', 0x000000000101000000c738abe4b90928405c2fc29f07f75340, 1, 'Outside Campus.'),
(4, 'Canara ATM', 0x000000000101000000022d2752b80628400af191fce7f65340, 1, 'Outside Campus.'),
(5, 'Canara PEC Bank', 0x0000000001010000007596108e090728407498af95a4f65340, 1, 'Bank inside PEC Campus.'),
(6, 'SBI RMY', 0x0000000001010000007e90d7bf01092840b6489c0201f75340, 1, 'Outside Campus.'),
(7, 'Indian Bank ATM', 0x00000000010100000072143fb5f509284068fefd9003f75340, 0, 'Bank inside PU Campus near gate1.');

-- --------------------------------------------------------

--
-- Table structure for table `bus`
--

CREATE TABLE `bus` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bus`
--

INSERT INTO `bus` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Gate 2', 0x000000000101000000a1f0005b2208284033115172f1f65340, 1, 'Time : 8.30 AM  =>  SJ Campus'),
(4, 'SJ Campus', 0x000000000101000000d800f70af7102840074b90fce2f65340, 1, 'Science Block( 8.45 AM ),  Central Library( 9.15 AM, 9.20 AM, 9.30 AM, 01.40 PM, 03.30 PM, 04.30 PM, 05.10 PM ),  Admin Block( 10.30 AM),  Thiruvalluvar( 12.00 PM, 12.20 PM, 12.40 PM, 01.00 PM, 01.20 PM)'),
(5, 'Science Block', 0x00000000010100000027a5452ca00828401c9cac06c2f65340, 1, 'SJ Campus( 9.00 AM, 9.05 AM ),  Admin Block( 09.05 AM)'),
(6, 'Admin Block', 0x000000000101000000863db5095e0a28402938172ddef65340, 1, 'SJ Campus( 9.15 AM )'),
(7, 'Central Library', 0x000000000101000000ac5cad45940a284079b2bd8fc6f65340, 1, 'SJ Campus( 10.15 AM, 11.45 AM, 03.00 PM, 04.00 PM, 04.45 PM ),  Thiruvalluvar( 12.00 PM, 12.20 PM, 12.40 PM, 01.00 PM, 01.20 PM)'),
(8, 'Thiruvalluvar', 0x0000000001010000000949316d2f0e2840d17e0dbc42f65340, 1, 'SJ Campus( 12.10 PM, 12.30 PM, 12.50 PM, 01.10 PM, 01.30 PM ),  Central Library( 12.10 PM, 12.30 PM, 12.50 PM, 01.10 PM, 01.30 PM )');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int NOT NULL,
  `sender` varchar(200) NOT NULL,
  `receiver` varchar(200) NOT NULL,
  `message` varchar(500) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `sender`, `receiver`, `message`, `time`) VALUES
(1, 'raihan.io', 'Razin', 'hi bro', '2023-05-07 13:33:14'),
(2, 'Razin', 'raihan.io', 'hey buddy', '2023-05-07 13:33:56'),
(3, 'razvin', 'raihan.io', 'bro where are you?', '2023-05-07 14:15:23'),
(4, 'Razin', 'razvin', 'How are you?', '2023-05-07 14:15:44'),
(5, 'Amal', 'raihan.io', 'daa', '2023-05-07 14:25:04'),
(6, 'raihan.io', 'razvin', 'in hostel', '2023-05-07 14:25:35'),
(7, 'Amal', 'raihan.io', 'nthe', '2023-05-07 14:30:13'),
(8, 'razvin', 'raihan.io', 'okay', '2023-05-07 14:35:44'),
(9, 'raihan.io', 'Razin', 'oii', '2023-05-07 14:37:03'),
(10, 'raihan.io', 'Amal', 'onnulleda', '2023-05-07 17:59:35'),
(11, 'Razin', 'raihan.io', 'nobody talks to me like that I dont want this from you. so come tommorrow', '2023-05-07 18:00:23'),
(12, 'raihan.io', 'Razin', 'okey i wont repeat and you donyour home works project is due what arte you doing with ur life', '2023-05-07 18:01:09'),
(18, 'raihan.io', 'Razin', 'hi', '2023-05-07 18:22:15'),
(19, 'raihan.io', 'razvin', 'When are you coming to hostel', '2023-05-07 18:22:53'),
(20, 'raihan.io', 'razvin', 'Hellooo?', '2023-05-07 18:43:39'),
(21, 'Razin', 'raihan.io', 'Good for you', '2023-05-07 22:04:04'),
(22, 'raihan.io', 'Razin', 'hi evde nee', '2023-05-08 00:12:41'),
(23, 'Suresh', 'raihan.io', 'Raihan', '2023-05-08 15:53:27'),
(24, 'raihan.io', 'Suresh', 'hello sir', '2023-05-08 15:53:27'),
(25, 'Suresh', 'raihan.io', 'Come to department ASAP', '2023-05-08 15:53:27'),
(26, 'raihan.io', 'Suresh', 'Sure sir', '2023-05-08 15:53:27'),
(27, 'raihan.io', 'Suresh', 'i,m coming to department', '2023-05-22 12:53:46'),
(28, 'Suresh', 'raihan.io', 'okay', '2023-05-22 12:55:01'),
(29, 'raihan.io', 'Suresh', 'hi, sir', '2023-08-14 13:08:22'),
(30, 'razvin', 'Razin', 'I\'m fine bro', '2023-08-29 02:14:17'),
(31, 'razvin', 'Razin', 'Train evdethi', '2023-08-29 02:14:22'),
(32, 'raihan.io', 'Suresh', 'Hello', '2023-09-07 15:10:31'),
(33, 'raihan.io', 'Suresh', 'How are you ', '2023-09-07 15:12:40'),
(34, 'Suresh', 'raihan.io', 'Hi', '2023-09-07 15:13:11');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `faculty` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `dept`, `faculty`) VALUES
(3, 'MCA', 'Computer Science', 'Suresh'),
(4, 'MTech CSE', 'Computer Science', 'ravi'),
(5, 'MSc. CS', 'Computer Science', 'Nandhini');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cid` int NOT NULL,
  `desc` varchar(45) NOT NULL,
  `createdAt` varchar(45) NOT NULL,
  `username` varchar(50) NOT NULL,
  `postid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`cid`, `desc`, `createdAt`, `username`, `postid`) VALUES
(4, 'hi', '2023-04-04 16:41:45', 'raihan.io', 21),
(5, 'Doctor Strange !!', '2023-04-08 17:01:28', 'razvin', 34),
(6, 'wowwwwww', '2023-04-09 14:00:24', 'Razin', 34),
(7, 'hey', '2023-04-09 14:00:37', 'Razin', 26),
(9, 'Bro this is awesome ( \" _\" )', '2023-04-12 01:54:58', 'Razin', 37),
(10, 'Super cool Kid', '2023-05-07 13:09:59', 'raihan.io', 39),
(11, 'Jeet and Welwin', '2023-05-10 03:38:21', 'raihan.io', 45),
(13, 'Basi vava', '2023-08-14 13:27:41', 'raihan.io', 21),
(14, 'Super bro', '2023-08-29 02:17:08', 'raihan.io', 34),
(15, 'Nawalikkaaaa', '2023-09-03 17:04:33', 'Suresh', 23);

-- --------------------------------------------------------

--
-- Table structure for table `dept`
--

CREATE TABLE `dept` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dept`
--

INSERT INTO `dept` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Computer Science', 0x00000000010100000046155444e807284087568c16b4f65340, 1, 'Department of Computer Science. Courses provided are MSc.CS, MCA, Mtech CSE'),
(2, 'Pollution Control and Environmental Engineering', 0x0000000001010000005e5dd983ff072840456a12669ff65340, 1, 'Centre for Pollution Control and Environmental Engineering.'),
(3, 'Green Energy Technology', 0x000000000101000000ff16044e2f082840cddb402190f65340, 1, 'Centre for Green Energy Technology .'),
(4, 'Bioinformatics', 0x000000000101000000a275ea72a30828400141406e9af65340, 1, 'Dept of Bioinformatics .'),
(5, 'Earth Sciences', 0x00000000010100000080b4478ae60828405371fa9290f65340, 1, 'Dept of Earth Sciences .'),
(6, 'Biotechnology', 0x000000000101000000ed7a5917c2082840c672faeba0f65340, 1, 'Dept of Biotechnology .'),
(7, 'Physics', 0x000000000101000000670862604e082840ca47e97da1f65340, 1, 'Dept of Physics .'),
(8, 'Statistics', 0x000000000101000000d8814af740082840d1482953aaf65340, 1, 'Dept of Statistics .'),
(9, 'Biochemistry and Molecular Biology', 0x0000000001010000007e59e6c051082840c16f4a24c8f65340, 1, 'Dept of Biochemistry and Molecular Biology.'),
(10, 'Microbiology', 0x000000000101000000aa35a6dd29082840696f8a32c5f65340, 1, 'Dept of Microbiology.'),
(11, 'Ecology', 0x0000000001010000004b361ab63f082840761ceac8c2f65340, 1, 'Dept of Ecology.'),
(12, 'Chemistry', 0x0000000001010000000ec2b934e7082840eca313efc1f65340, 1, 'Dept of Chemistry.'),
(13, 'Distant Education', 0x000000000101000000d44133e272092840cef518a798f65340, 1, 'Directorate of Distant Education.'),
(14, 'Economics', 0x000000000101000000c5332d21390b284069c34bf4a8f65340, 1, 'Dept of Economics.'),
(15, 'Commerce', 0x000000000101000000c393cf50340b284029c44b75aff65340, 1, 'Dept of Commerce.'),
(16, 'Banking and Technology', 0x000000000101000000d5818fbe160b2840d3c3cb8eacf65340, 1, 'Dept of Banking and Technology.'),
(17, 'International Business', 0x00000000010100000070f4dc00350b2840c3c48b99b4f65340, 1, 'Dept of International Business.'),
(18, 'Management Studies', 0x0000000001010000004b0bd6335c0b28405ec50bfec0f65340, 1, 'Dept of Management Studies.'),
(19, 'Horticulture', 0x000000000101000000b2ba2cfddd0a284073cd47b19af65340, 1, 'Dept of Horticulture.'),
(20, 'Start Up Centre', 0x000000000101000000e9678bce990b2840e36081208ff65340, 1, 'Pondicherry University Start Up Centre.'),
(22, 'Physical Education and Sports', 0x00000000010100000013912401550c2840b81d4d718ff65340, 1, 'Dept of Physical Education and Sports.'),
(23, 'Food Science', 0x000000000101000000874bb23e310e28400f6bf65cc5f65340, 1, 'Dept of Food Science.'),
(24, 'E-Media and Mass-Comm', 0x0000000001010000009ab860e6c11028408a9be13fd1f65340, 1, 'Dept of Electronic Media and Mass Communication.'),
(25, 'Educational Multimedia Research Centre (EMRC)', 0x000000000101000000794835f8f4102840780bad3bd2f65340, 1, 'Educational Multimedia Research Centre (EMRC).'),
(26, 'SJ Campus', 0x000000000101000000066355bf2b11284070921e17ebf65340, 1, 'Silver Jubilee Campus.'),
(27, 'History', 0x000000000101000000d578b4602f11284083919fcae1f65340, 1, 'Dept of History.'),
(28, 'Social Sciences', 0x0000000001010000008b4758de3511284009f8aa5ae6f65340, 1, 'School of Social Sciences.'),
(30, 'Sociology', 0x0000000001010000003a19d5685f1128408cf83893e3f65340, 1, 'Dept of Sociology.'),
(31, 'Politics and International Studies', 0x0000000001010000005d4d19308011284048ce4b86e5f65340, 1, 'Dept of Politics and International Studies.'),
(32, 'English', 0x0000000001010000005a65918c57112840453af13af5f65340, 1, 'Dept of English.'),
(33, 'French', 0x000000000101000000b8108d0542112840f9113a29f7f65340, 1, 'Dept of French.'),
(34, 'Psychology', 0x000000000101000000402d1ff538112840df7df0f5f9f65340, 1, 'Dept of Applied Psychology.'),
(35, 'Sanskrit', 0x000000000101000000544c5d870c112840d6402575f6f65340, 1, 'Dept of Sanskrit.'),
(36, 'Hindi', 0x000000000101000000ded232aaf8102840aaa9c94df7f65340, 1, 'Dept of Hindi.'),
(37, 'Education', 0x00000000010100000060bfb6c025112840ae10846df2f65340, 1, 'School of Education.'),
(38, 'Humanities', 0x000000000101000000d0182ce11711284054bcd89df3f65340, 1, 'School of Humanities.'),
(39, 'Tamil', 0x0000000001010000002c96f91f7c112840febc7838d6f65340, 1, 'School of Tamil.'),
(40, 'UGC HRDC', 0x000000000101000000c8666c6fa5102840c52cf843fdf65340, 1, 'UGC HRDC Building.'),
(41, 'UMISARC', 0x000000000101000000d9c619a4d50f2840d460ddeef2f65340, 1, 'Unesco Madanjeet Singh Institute of South Asia Regional Corporation.');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `desc` varchar(200) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `date` datetime NOT NULL,
  `venue` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `desc`, `img`, `username`, `createdAt`, `date`, `venue`) VALUES
(1, 'CamBuzz Launch', '1680423414380bgwhiteIcon.png', 'Nandhini', '2023-05-10 01:40:57', '2023-05-15 01:40:57', 'Computer Science department'),
(2, 'Football Tournament', '1680522534038PXL_20220731_213028814.PHOTOSPHERE.jpg', 'Suresh', '2023-05-10 02:12:54', '2023-05-27 17:40:57', 'Thiruvalluvar Stadium'),
(3, 'Dance Competition', '1683669405071PXL_20220805_165710294.jpg', 'Suresh', '2023-05-10 03:26:45', '2023-05-10 03:26:45', 'SJ Campus');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Canteen 1', 0x000000000101000000a586916f320b28408d876636c9f65340, 1, 'Near Admin Block'),
(2, 'Canteen 2', 0x0000000001010000000c076e2ef007284036c284f2abf65340, 1, 'Near Ramanujan school of Mathematics'),
(3, 'Shopping Complex(ponlait)', 0x000000000101000000f36b9c781b0928403bcf39ffa1f65340, 1, 'Multiple shops provides different kind of foods and drinkables'),
(4, 'Mother Teresa Mess', 0x0000000001010000001f470979570b28406ab5f29045f65340, 1, 'Mess for women and a shop with tea and snacks '),
(5, 'Amudham Mess', 0x0000000001010000007bbbf542e50e2840cd3ca4a372f65340, 1, 'Mess for nearby hostels '),
(6, 'New Mega Mess', 0x0000000001010000008502664d140f28400784205d8ff65340, 1, 'Mess for nearby hostels. Access only for men '),
(7, 'Shop outside SJ Campus', 0x000000000101000000c8650c14cf1028404b9cfa55f6f65340, 1, 'Tea and snacks'),
(8, 'Canteen 4, SJ Campus', 0x000000000101000000c23b304861112840c0a165b3eef65340, 1, 'Canteen inside SJ Campus');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `id` int NOT NULL,
  `sender` varchar(100) NOT NULL,
  `message` varchar(500) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`id`, `sender`, `message`, `time`) VALUES
(1, 'Razin', 'Hi welcome to  PU Forum', '2023-05-07 20:05:00'),
(2, 'razvin', 'Hello there! CamBuzz is trending in PU', '2023-05-07 20:05:30'),
(3, 'raihan.io', 'Oh really?', '2023-05-07 20:07:24'),
(4, 'raihan.io', 'Where can I get my Id', '2023-05-07 20:07:47'),
(5, 'Razin', 'Go to Library... you\'ll get it from there', '2023-05-07 20:23:33'),
(6, 'raihan.io', 'okay thanks a lot', '2023-05-07 20:24:40'),
(7, 'Razin', 'Welcome', '2023-05-07 20:25:02'),
(8, 'Suresh', 'Hello students', '2023-05-07 23:12:26'),
(9, 'raihan.io', 'hi sir', '2023-05-08 00:12:51'),
(10, 'raihan.io', 'Good day', '2023-05-08 00:23:17'),
(11, 'raihan.io', 'hello', '2023-08-14 13:07:28'),
(12, 'raihan.io', 'rai', '2023-08-14 13:08:10'),
(13, 'raihan.io', 'Soll sir ', '2023-09-07 15:14:18'),
(14, 'Suresh', 'Good night ', '2023-09-07 15:14:19');

-- --------------------------------------------------------

--
-- Table structure for table `gym`
--

CREATE TABLE `gym` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gym`
--

INSERT INTO `gym` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Women\'s Gym', 0x0000000001010000001cee172ecb0a2840dda2823862f65340, 1, 'Only women can access.'),
(2, 'Men\'s Gym', 0x00000000010100000049edf376750f284079cf6daf68f65340, 1, 'Only men can access.');

-- --------------------------------------------------------

--
-- Table structure for table `health`
--

CREATE TABLE `health` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `health`
--

INSERT INTO `health` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Health Centre, PU', 0x000000000101000000dd757ec7130a284020ef561273f65340, 1, 'Health Centre Inside Campus. Affiliated to PIMS '),
(2, 'Jipmer Hospital', 0x000000000101000000ff65b7aaf6e72740d2ca7579fcf25340, 1, 'Outside Campus. Govt. Medical College '),
(3, 'PIMS Hospital', 0x000000000101000000618caff31e182840d17fb17cc7f65340, 1, 'Outside Campus. Private Medical College ');

-- --------------------------------------------------------

--
-- Table structure for table `hostel`
--

CREATE TABLE `hostel` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hostel`
--

INSERT INTO `hostel` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'C V Raman Hostel', 0x00000000010100000096c47e32cc0d284059930ebc98f65340, 1, 'Boys Hostel'),
(2, 'Ilango Hostel', 0x0000000001010000008a72d631740e284043fcea8794f65340, 1, 'Boys Hostel'),
(3, 'Sri Aurobindo Hostel', 0x000000000101000000875f4f29fe0e28408e1cbcec9af65340, 1, 'Boys Hostel'),
(4, 'Kamban Hostel', 0x000000000101000000801de4ae300f2840e07bfe2a89f65340, 1, 'Boys Hostel'),
(5, 'Valmiki Hostel', 0x0000000001010000005ebb15d8d80e284056d7e5a57df65340, 1, 'Girls Hostel'),
(6, 'Tagore Hostel', 0x000000000101000000484709d16b0f28401156bb3575f65340, 1, 'Boys Hostel'),
(7, 'Kannadas Hostel', 0x000000000101000000fd10d8eb070f2840fcac252d69f65340, 1, 'Boys Hostel'),
(8, 'Kalidas Hostel', 0x000000000101000000b829010f810f2840c1a575895ef65340, 1, 'Boys Hostel'),
(9, 'Kabirdas Hostel', 0x0000000001010000009276a345f70e2840d6a464295bf65340, 0, 'Boys Hostel'),
(10, 'MAKA Hostel', 0x000000000101000000e7aefaa0430f2840ef2d34c053f65340, 1, 'Boys Hostel'),
(11, 'SRK Hostel', 0x00000000010100000028cfc37dca0e284045b4d03642f65340, 1, 'Boys Hostel'),
(12, 'Kalpana Hostel', 0x00000000010100000045a9c886ed0b2840896a43be3df65340, 1, 'Girls Hostel'),
(13, 'Narmada Hostel', 0x0000000001010000002447af71a90b2840e968c32c31f65340, 1, 'Girls Hostel'),
(14, 'Madame Curie Hostel', 0x000000000101000000d4bd0164c80b2840916b432b49f65340, 1, 'Girls Hostel'),
(15, 'Yamuna Hostel', 0x0000000001010000000dfef47f920b2840832bac7250f65340, 1, 'Girls Hostel'),
(16, 'Ganga Hostel', 0x000000000101000000a1ce69d7670b28409b8aab935cf65340, 0, 'Girls Hostel'),
(17, 'Saraswati Hostel', 0x0000000001010000006cf1c064fe0a2840a7ae7c9462f65340, 1, 'Girls Hostel'),
(18, 'Cauvery Hostel', 0x000000000101000000327c80aa780a284070bc2a136cf65340, 1, 'Girls Hostel');

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lab`
--

INSERT INTO `lab` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Chemical Lab', 0x00000000010100000071709be0f30828404c18963cc0f65340, 1, 'Laboratory inside dept of chemistry'),
(2, 'BioChemistry Lab', 0x0000000001010000002bcb7b274c082840c3992840c7f65340, 1, 'Laboratory inside dept of BioChemistry'),
(3, 'Cell Signalling Lab', 0x0000000001010000003e09990c07082840458abaa9c6f65340, 1, 'Laboratory inside dept of MicroBioogy'),
(4, 'Computer Science Lab', 0x000000000101000000b8cec57ed0072840ff963f27b5f65340, 1, 'Computer Lap with fast internet connection'),
(5, 'Pollution Lab', 0x000000000101000000e81e31dae6072840e47e2db49df65340, 1, 'Laboratory inside dept of Pollution and Tech'),
(6, 'Nano Science Lab', 0x000000000101000000303d6ae3190828407e3dbab28ff65340, 1, 'Laboratory inside dept of Green Energy'),
(7, 'Physics Lab', 0x000000000101000000382f3187590828408f4d411d9ef65340, 1, 'Laboratory inside dept of Physics'),
(8, 'Geology Lab', 0x000000000101000000cbbd0dc8be082840f8a1500291f65340, 1, 'Laboratory inside dept of Earth science'),
(9, 'Pilot Laboratory', 0x000000000101000000f5ece7bf070e28406404e829cbf65340, 1, 'Laboratory inside dept of Food science'),
(10, 'Food Processing lab', 0x00000000010100000073f97ee8300e2840b0db840ccdf65340, 1, 'Laboratory inside dept of Food science');

-- --------------------------------------------------------

--
-- Table structure for table `library`
--

CREATE TABLE `library` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `library`
--

INSERT INTO `library` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Ananda Rangapillai Library', 0x000000000101000000569076dc690a2840ae932591c8f65340, 1, 'Accessible by university students and staffs only. Upon request to concerned authority, a visit inside library is possible for outsiders'),
(2, 'ADVANCED LIBRARY', 0x000000000101000000233725928b0a284099376a11bbf65340, 1, 'An Advanced Library inside Annex'),
(3, 'Annex-Reading Room', 0x0000000001010000006bd5c6f27b0a2840bad9268dbff65340, 1, 'Library Annexure Reading Room. Air conditioning available');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `postid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `username`, `postid`) VALUES
(2, 'Razvin', 10),
(25, 'raihan.io', 10),
(36, 'Razin', 21),
(38, 'Razin', 23),
(41, 'raihan.io', 26),
(42, 'raihan.io', 23),
(46, 'Razin', 26),
(47, 'Razin', 10),
(48, 'razvin', 21),
(49, 'Razin', 34),
(51, 'razvin', 10),
(52, 'raihan.io', 36),
(53, 'raihan.io', 34),
(55, 'razvin', 37),
(57, 'Razin', 37),
(58, 'raihan.io', 37),
(65, 'raihan.io', 21),
(67, 'Razin', 36),
(68, 'raihan.io', 39),
(72, 'raihan.io', 45),
(74, 'razvin', 45),
(75, 'razvin', 40),
(76, 'raihan.io', 42),
(77, 'raihan.io', 40),
(78, 'Suresh', 45),
(80, 'Suresh', 40),
(82, 'Suresh', 48),
(83, 'Suresh', 23);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postid` int NOT NULL,
  `desc` varchar(200) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `published` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postid`, `desc`, `img`, `username`, `createdAt`, `published`) VALUES
(10, 'Hi tehre', '1680348436677IMG-20230309-WA0019.jpg', 'razvin', '2023-04-01 16:57:16', 1),
(21, 'basikka', '1680606562643PXL_20220915_080939927.PORTRAIT.jpg', 'raihan.io', '2023-04-04 16:39:22', 1),
(23, '', '1680631993717PXL_20221116_130413399.MP.jpg', 'Razin', '2023-04-04 23:43:13', 1),
(26, 'hey', '1680646428676PXL_20221005_151746524.jpg', 'Razin', '2023-04-05 03:43:48', 1),
(34, '', '1680866278919994433.jpg', 'raihan.io', '2023-04-07 16:47:58', 1),
(36, 'Doggy Dog', '1681244531706PXL_20230120_041443631.MP.jpg', 'raihan.io', '2023-04-12 01:52:11', 1),
(37, 'Tea clickzz \nsometimes I wonder..... why shud I bother about past\njust live in the present\npeace out...', '168124464368120200305_154302.jpg', 'razvin', '2023-04-12 01:54:03', 1),
(39, 'Sweet kannan', '1683088950013PXL_20220823_115042855.jpg', 'raihan.io', '2023-05-03 10:12:30', 1),
(40, '', '1683480634306PXL_20220811_143912142.jpg', 'raihan.io', '2023-05-07 23:00:34', 1),
(42, 'New Post', '168348082159820200305_154302.jpg', 'Suresh', '2023-05-07 23:03:41', 1),
(45, 'Friend jeet', '1683540993315PXL_20220805_165842329.jpg', 'raihan.io', '2023-05-08 15:46:33', 1),
(48, 'Hi there', '1684734877777PXL_20230117_121438188.PORTRAIT.jpg', 'raihan.io', '2023-05-22 11:24:37', 1),
(51, 'PU', '1692095503910loginbg.jpg', 'razvin', '2023-08-15 10:31:44', 0);

-- --------------------------------------------------------

--
-- Table structure for table `printer`
--

CREATE TABLE `printer` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `printer`
--

INSERT INTO `printer` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(1, 'Shopping Complex (Ponlait)', 0x000000000101000000ab53630b2a092840f6684fb1a1f65340, 1, 'Available on working days'),
(2, 'Science Block', 0x00000000010100000066344a49680828404714b313bef65340, 1, 'Opposite to science block'),
(3, 'Xerox SJ', 0x0000000001010000003cd59c686711284061db2e7ee9f65340, 1, 'Xerox and Printer shop inside SJ compound');

-- --------------------------------------------------------

--
-- Table structure for table `relationships`
--

CREATE TABLE `relationships` (
  `id` int NOT NULL,
  `follower` varchar(50) NOT NULL,
  `followed` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `relationships`
--

INSERT INTO `relationships` (`id`, `follower`, `followed`) VALUES
(2, 'basith.anu', 'raihan.io'),
(23, 'raihan.io', 'razvin'),
(25, 'raihan.io', 'basith.anu'),
(32, 'Razin', 'razvin'),
(37, 'Razin', 'raihan.io'),
(52, 'raihan.io', 'Razin'),
(54, 'Suresh', 'Razin'),
(55, 'razvin', 'Suresh'),
(56, 'razvin', 'raihan.io'),
(60, 'Suresh', 'raihan.io'),
(61, 'razvin', 'ARYASREETG'),
(62, 'razvin', 'Razin');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `heading` varchar(100) NOT NULL,
  `desc` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `name`, `heading`, `desc`) VALUES
(1, 'water', 'Drinking Water', 'Drinkable and non-drinkable water available in campus '),
(2, 'printer', 'Printers & Xerox', NULL),
(3, 'food', 'Food Outlets', NULL),
(4, 'toilet', 'Toilets / Washrooms', NULL),
(5, 'health', 'Health Center', NULL),
(6, 'atm', 'ATM / Bank', NULL),
(7, 'dept', 'Departments', NULL),
(8, 'hostel', 'Hostels', NULL),
(9, 'bus', 'Bus Stops', NULL),
(10, 'lab', 'Labs', NULL),
(11, 'library', 'Reading Rooms / Libraries', NULL),
(12, 'gym', 'Gyms ', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `sid` int NOT NULL,
  `img` varchar(200) NOT NULL,
  `username` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`sid`, `img`, `username`, `createdAt`) VALUES
(1, '1680631993717PXL_20221116_130413399.MP.jpg', 'Razin', '2023-04-05 03:43:48'),
(2, '1680606475513PXL_20220809_144736757.jpg', 'raihan.io', '2023-04-05 03:43:48'),
(3, 'loginbg.jpg', 'razvin', '2023-04-05 03:43:48'),
(4, '1680865274394peakpx (1).jpg', 'raihan.io', '2023-04-07 16:31:14'),
(13, '1680953876380PXL_20230118_080149302.PORTRAIT.jpg', 'razvin', '2023-04-08 17:07:56'),
(14, '1681032017924PXL_20230120_034026986.PORTRAIT.jpg', 'Razin', '2023-04-09 14:50:17'),
(15, '1681066571293PXL_20230118_080149302.PORTRAIT.jpg', 'razvin', '2023-04-10 00:26:11'),
(16, '1680864688268peakpx (1).jpg', 'razvin', '2023-04-09 03:26:11'),
(17, '1680606475513PXL_20220809_144736757.jpg', 'razvin', '2023-04-09 01:16:11'),
(18, '1681066932601PXL_20230118_122804725.MP.jpg', 'Razin', '2023-04-10 00:32:12'),
(19, '1681225264668PXL_20230119_050352762.PORTRAIT.jpg', 'Razin', '2023-04-11 20:31:04'),
(20, '1681244454660PXL_20230119_085634554.PORTRAIT.jpg', 'Razin', '2023-04-12 01:50:54'),
(21, '1681244489521PXL_20230120_034016265.PORTRAIT.jpg', 'raihan.io', '2023-04-12 01:51:29'),
(22, '1681244574888PXL_20230122_090648052.PORTRAIT.jpg', 'razvin', '2023-04-12 01:52:54'),
(23, '168124459160120200305_154232.jpg', 'razvin', '2023-04-12 01:53:11'),
(24, '1681316838070PXL_20230119_050521199.PORTRAIT.jpg', 'raihan.io', '2023-04-12 21:57:18'),
(25, '1681316858261PXL_20230120_034419582.MP.jpg', 'raihan.io', '2023-04-12 21:57:38'),
(26, '1681319979773PXL_20230120_042841975.MP.jpg', 'raihan.io', '2023-04-12 22:49:39'),
(27, '1681594111315PXL_20230117_145156300.MP.jpg', 'raihan.io', '2023-04-16 02:58:31'),
(28, '1681594121395PXL_20230118_080145348.PORTRAIT.jpg', 'raihan.io', '2023-04-16 02:58:41'),
(29, '1681594131333PXL_20230119_064533989.PORTRAIT.jpg', 'raihan.io', '2023-04-16 02:58:51'),
(30, '1681594175963PXL_20230119_050352762.PORTRAIT.jpg', 'raihan.io', '2023-04-16 02:59:35'),
(31, '1681907218079PXL_20230119_050516974.PORTRAIT.jpg', 'raihan.io', '2023-04-19 17:56:58'),
(32, '1681920532184PXL_20230117_121438188.PORTRAIT.jpg', 'raihan.io', '2023-04-19 21:38:52'),
(33, '1683056785578PXL_20230119_092111384.PORTRAIT.jpg', 'raihan.io', '2023-05-03 01:16:25'),
(34, '1683056796000PXL_20230118_080149302.PORTRAIT.jpg', 'raihan.io', '2023-05-03 01:16:36'),
(35, '1683056807125PXL_20230119_064547617.PORTRAIT.jpg', 'raihan.io', '2023-05-03 01:16:47'),
(36, '168305681975420200305_154232.jpg', 'raihan.io', '2023-05-03 01:16:59'),
(37, '1683056831676IMG-20210624-WA0019.jpg', 'raihan.io', '2023-05-03 01:17:11'),
(38, '1683479951232PXL_20220828_121344375.jpg', 'raihan.io', '2023-05-07 22:49:11'),
(39, '168348043405420200305_154232.jpg', 'Suresh', '2023-05-07 22:57:14'),
(40, '1683542530102PXL_20220811_143912142.jpg', 'raihan.io', '2023-05-08 16:12:10'),
(41, '1683543504508PXL_20220915_080939927.PORTRAIT~2.jpg', 'raihan.io', '2023-05-08 16:28:24'),
(42, '1683543524036PXL_20220831_204324025.jpg', 'raihan.io', '2023-05-08 16:28:44'),
(43, '168366993182320200305_154232.jpg', 'raihan.io', '2023-05-10 03:35:31'),
(44, '1683669947990PXL_20230119_050521199.PORTRAIT.jpg', 'raihan.io', '2023-05-10 03:35:48'),
(45, '1683670046459PXL_20230120_034021873.PORTRAIT.jpg', 'raihan.io', '2023-05-10 03:37:26'),
(46, '1683670064229PXL_20230117_110855914.MP.jpg', 'raihan.io', '2023-05-10 03:37:44'),
(47, '1683670081732PXL_20230119_085633116.PORTRAIT.jpg', 'raihan.io', '2023-05-10 03:38:01'),
(48, '1683960764234PXL_20230120_030655091.MP.jpg', 'raihan.io', '2023-05-13 12:22:44'),
(49, '1684254134743PXL_20230118_120053985.MP.jpg', 'raihan.io', '2023-05-16 21:52:14'),
(50, '1684254141992PXL_20230119_050508992.PORTRAIT.jpg', 'raihan.io', '2023-05-16 21:52:22'),
(51, '1684254148630PXL_20230118_080421113.MP.jpg', 'raihan.io', '2023-05-16 21:52:28'),
(52, '1684301280357PXL_20230119_085019318.MP.jpg', 'raihan.io', '2023-05-17 10:58:00'),
(53, '1684734735188PXL_20230120_034026986.PORTRAIT.jpg', 'raihan.io', '2023-05-22 11:22:15'),
(54, '1684734808524PXL_20230119_085634554.PORTRAIT.jpg', 'raihan.io', '2023-05-22 11:23:28'),
(55, '1684734840253PXL_20230118_120025973.MP.jpg', 'raihan.io', '2023-05-22 11:24:00'),
(56, '1691597936506IMG_20230717_091358_917.webp', 'raihan.io', '2023-08-09 21:48:56'),
(57, '1692018699370IMG_20230812_084440_993.webp', 'raihan.io', '2023-08-14 13:11:39'),
(58, '1692095485632loginbg.jpg', 'razvin', '2023-08-15 10:31:26');

-- --------------------------------------------------------

--
-- Table structure for table `toilet`
--

CREATE TABLE `toilet` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uId` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profilePic` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'default.png',
  `coverPic` varchar(200) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'student',
  `class` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uId`, `username`, `fullname`, `email`, `password`, `profilePic`, `coverPic`, `city`, `website`, `type`, `class`) VALUES
(1, 'guest', 'guest', 'guest@pondiuni.ac.in', '$2a$10$iNqbvCwANz4.7d7w8fgOQe0mxfAdQJqQXZ6bctCtpYdAm/5Uvoa3m', 'default.png', 'default.png', 'guest', 'guest', 'guest', 'guest'),
(2, 'raihan.io', 'Muhammed Raihan P A', '21352030@pondiuni.ac.in', '$2a$10$iNqbvCwANz4.7d7w8fgOQe0mxfAdQJqQXZ6bctCtpYdAm/5Uvoa3m', '1680863627938994433.jpg', '1680863627840peakpx (1).jpg', 'Nilambur', 'raihan.io', 'student', 'MCA'),
(4, 'Razin', 'Razin Rahman P A', '21352004@pondiuni.ac.in', '$2a$10$BOUDxo.wRah43VVFr6QalemzwsDH/A90Rsj9AUjj2coFY4cJdnQce', '1680645057565PXL_20230331_123234005_exported_2365_1680281652253.jpg', '1680645155038PXL_20220830_181505032.jpg', 'Mahe', 'mahepu.in', 'student', ''),
(5, 'razvin', 'Razvin Abdulla', '21352030@pondiuni.ac.in', '$2a$10$syY3E6jxU6UkQnbn0JJN4ObQ1dn.OQAJvHK8aFV9prYvKxegG/rcu', '1680953011959IMG-20210624-WA0019.jpg', '1680953011937PXL_20230120_034241338.MP.jpg', 'Kakkove', 'razjaz.in', 'student', ''),
(12, 'basith.anu', 'Abdul Basith', 'anubasith@gmail.com', '$2a$10$zZ.2daMP7887bbnqZd60AumUZKwE/sCN8gWssADjhPF1kKfQytzsO', NULL, NULL, NULL, NULL, 'student', ''),
(20, 'admin1', NULL, 'cambuzz@pondiuni.ac.in', '$2a$10$un9yJHBHc8nuQS8vyvyP6OwtElBdCWmAvaWjJstzTILIP6NVZOOly', NULL, NULL, NULL, NULL, 'student', ''),
(32, 'Nandhini', 'Dr M Nandhini', 'drmnandhini@pondiuni.edu.in', '$2a$10$un9yJHBHc8nuQS8vyvyP6OwtElBdCWmAvaWjJstzTILIP6NVZOOly', NULL, NULL, NULL, NULL, 'faculty', ''),
(37, 'uma', 'Dr Uma V', 'umav@pondiuni.ac.in', '$2a$10$BwSK.4y/hMj4QgpaZnp./OzUWCWlKGXq64JQzDZpzPRr8UN7jYIji', NULL, NULL, NULL, NULL, 'faculty', ''),
(38, 'skvj', 'Dr SKVJ', 'skvjayakumar@pondiuni.ac.in', '$2a$10$.3n.0pWqD.iASu4V9KFqjewkS90MCM/Jk8PHiab09BUOCveMR8vr.', NULL, NULL, NULL, NULL, 'faculty', ''),
(39, 'ravi', 'Dr Ravi', 'ravi@pondiuni.edu.in', '$2a$10$gJ7arkNAKbc901lNE60uoOW7Z1B0EgcUy3OxDfsqLmCtv0A//XFcO', NULL, NULL, NULL, NULL, 'faculty', ''),
(41, 'jayalakshmi', 'DR Jayalakshmi', 'drjayalakshmi@pondiuni.ac.in', '$2a$10$If63zeK3lAV.EMSqp0Ryd.45ZJe7NVbceiak2dYZTLwlWIY8WgFba', NULL, NULL, NULL, NULL, 'faculty', ''),
(42, 'vaidehi', 'Dr Vaidehi', 'drvaidehi@pondiuni.ac.in', '$2a$10$e6Hjzd33jCWf1vaw1IDf6.5X.1c9Jwntt5YEbGLXpzCrAHN5zQCk2', NULL, NULL, NULL, NULL, 'faculty', ''),
(43, 'risham', NULL, '21352037@pondiuni.ac.in', '$2a$10$9fdsttMDMApbgmMoqNwYZOsolbJftnNZZLmfgu19vRyiZ53wMWAXK', NULL, NULL, NULL, NULL, 'student', ''),
(44, 'Suresh', 'Dr Suresh Joseph', '21352067@pondiuni.ac.in', '$2a$10$LTYGRlfTundJ8odFlw1ypeaRGjt9aJWDVD5LY/.1UZ7zN0.RQiHN6', '1683481189950PXL_20221023_181731062.MP.jpg', '1683481189927PXL_20220823_130643740.jpg', NULL, NULL, 'faculty', 'MCA'),
(47, 'ARYASREETG', NULL, '21352008@pondiuni.ac.in', '$2a$10$3XPde2ABHxAGe8RpHJM96OQrB9u4fiwtrXltxm2FEF2BwSIVMXAFG', 'default.png', NULL, NULL, NULL, 'student', 'MCA');

-- --------------------------------------------------------

--
-- Table structure for table `water`
--

CREATE TABLE `water` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `coordinates` point NOT NULL,
  `avail` int DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `water`
--

INSERT INTO `water` (`id`, `name`, `coordinates`, `avail`, `remarks`) VALUES
(4, 'Silver Jubilee ', 0x000000000101000000937f179882112840a7826638e7f65340, 1, 'Multiple water filters with Hot, Cold and Normal water'),
(5, 'E media', 0x000000000101000000d42f68b897102840b9671aaad1f65340, 0, 'Water filter with Hot, Cold and Normal water'),
(6, 'Dept of Food Science and Technology', 0x0000000001010000006fcb43da650e2840a759118bc6f65340, 1, 'Water filter with Normal water'),
(7, 'C V Raman Hostel', 0x0000000001010000003fd61dc6d60d2840dfb9907e98f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(8, 'Ilango Hostel', 0x00000000010100000044de387a740e284076caac4494f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(10, 'Sri Aurobindo Hostel', 0x0000000001010000005a0d73cd020f284050273ca79bf65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(11, 'New Mega Mess', 0x00000000010100000070152ab4080f28403d85c46d8ff65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(13, 'Kamban Hostel', 0x0000000001010000003540a546380f28408909fe4587f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(14, 'Valmiki Hostel', 0x00000000010100000026f61508d90e2840910afeb67ff65340, 1, 'Only Girls Can access.. Water filter with Hot, Cold and Normal water'),
(15, 'Tagore Hostel', 0x000000000101000000dd2462ef6b0f2840116ce8d674f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(16, 'Kannadas Hostel', 0x000000000101000000f685cc070e0f2840701aeafe68f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(17, 'Men\'s Gym', 0x000000000101000000f971c376690f2840b96392bb69f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(19, 'Kalidas Hostel', 0x000000000101000000eff9e210760f2840999cccc65df65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(20, 'Kabirdas Hostel', 0x000000000101000000df3f3646f40e28407e1e94065bf65340, 0, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(21, 'MAKA Hostel', 0x00000000010100000035978047400f284033d41e5251f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(22, 'SRK Hostel', 0x0000000001010000005083f51abc0e28408d703c9d42f65340, 1, 'Only Boys Can access. Water filter with Hot, Cold and Normal water'),
(23, 'Kalpana Hostel', 0x0000000001010000000b49a6ddf80b284013da5c893df65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(24, 'Narmada Hostel', 0x0000000001010000007a43e676b10b2840190bf43f33f65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(25, 'Madame Curie Hostel', 0x00000000010100000051108dc7ca0b28406b46476649f65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(26, 'Yamuna Hostel', 0x00000000010100000070ba357b910b28405435f39152f65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(27, 'Mother Teresa Mess', 0x000000000101000000cc4d18744a0b2840bdbd6b1047f65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(28, 'Ganga Hostel', 0x000000000101000000bb2f55c1650b2840ae50d5de5df65340, 0, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(29, 'Saraswati Hostel', 0x0000000001010000006c0e961c000b28406f1a3eee62f65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(30, 'Women\'s Gym', 0x0000000001010000008c1cd1c9b90a2840bedc92c762f65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(31, 'Cauvery Hostel', 0x000000000101000000844b69b17e0a2840c7070d5f6cf65340, 1, 'Only Girls Can access. Water filter with Hot, Cold and Normal water'),
(32, 'Health Center', 0x0000000001010000007f3784a30c0a2840c5c77c3e73f65340, 1, 'Water filter with Hot, Cold and Normal water'),
(33, 'Shopping Complex (Ponlait)', 0x000000000101000000547a352a2109284069825f48a2f65340, 1, 'Drinking water available from different shops');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `atm`
--
ALTER TABLE `atm`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `cid_UNIQUE` (`cid`),
  ADD KEY `userid_idx` (`username`),
  ADD KEY `postid_idx` (`postid`);

--
-- Indexes for table `dept`
--
ALTER TABLE `dept`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `gym`
--
ALTER TABLE `gym`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `health`
--
ALTER TABLE `health`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `hostel`
--
ALTER TABLE `hostel`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `likeUserid_idx` (`username`),
  ADD KEY `likePostid_idx` (`postid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postid`),
  ADD UNIQUE KEY `postid_UNIQUE` (`postid`),
  ADD KEY `userid_idx` (`username`);

--
-- Indexes for table `printer`
--
ALTER TABLE `printer`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `relationships`
--
ALTER TABLE `relationships`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `followerUser_idx` (`follower`),
  ADD KEY `followedUser_idx` (`followed`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `sid_UNIQUE` (`sid`),
  ADD KEY `sUserid_idx` (`username`);

--
-- Indexes for table `toilet`
--
ALTER TABLE `toilet`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uId`,`username`),
  ADD UNIQUE KEY `userid_UNIQUE` (`username`);

--
-- Indexes for table `water`
--
ALTER TABLE `water`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `atm`
--
ALTER TABLE `atm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bus`
--
ALTER TABLE `bus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `dept`
--
ALTER TABLE `dept`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `gym`
--
ALTER TABLE `gym`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `health`
--
ALTER TABLE `health`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hostel`
--
ALTER TABLE `hostel`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE `lab`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `library`
--
ALTER TABLE `library`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `printer`
--
ALTER TABLE `printer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `relationships`
--
ALTER TABLE `relationships`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `toilet`
--
ALTER TABLE `toilet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `water`
--
ALTER TABLE `water`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comUserid` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `postid` FOREIGN KEY (`postid`) REFERENCES `posts` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likePostid` FOREIGN KEY (`postid`) REFERENCES `posts` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likeUserid` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `userid` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationships`
--
ALTER TABLE `relationships`
  ADD CONSTRAINT `followedUser` FOREIGN KEY (`followed`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followerUser` FOREIGN KEY (`follower`) REFERENCES `users` (`username`);

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `sUserid` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
