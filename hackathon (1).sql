-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2023 at 09:29 AM
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
-- Database: `hackathon`
--

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Id` int(11) NOT NULL,
  `vName` varchar(100) NOT NULL,
  `vEmail` varchar(150) NOT NULL,
  `vMobileNumber` varchar(20) NOT NULL,
  `vAddress` varchar(250) NOT NULL,
  `vQualification` varchar(100) NOT NULL,
  `vProfession` varchar(200) NOT NULL,
  `vTeamType` enum('individual','team','','') NOT NULL DEFAULT 'individual',
  `iNumberOfMembers` int(11) NOT NULL,
  `vProblemStatement` varchar(500) NOT NULL,
  `Document` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Id`, `vName`, `vEmail`, `vMobileNumber`, `vAddress`, `vQualification`, `vProfession`, `vTeamType`, `iNumberOfMembers`, `vProblemStatement`, `Document`) VALUES
(1, 'dev Makwana', 'bcd@gmail.com', '2314509872', 'ahemdabad', 'graduate', 'web-devloper', 'individual', 0, 'test project', ''),
(2, 'tanmay makwana', 'abc@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 1, 'convert JSON data into XML ', 'docs-1684565856908.pdf'),
(3, 'tanmay makwana', 'abc@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 1, 'convert JSON data into XML ', 'docs-1684565857684.pdf'),
(4, 'tanmay makwana', 'abc@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 1, 'convert JSON data into XML ', 'docs-1684565858422.pdf'),
(5, 'dev Makwana', 'bcd@gmail.com', '2314509872', 'ahemdabad', 'graduate', 'web-devloper', 'individual', 0, 'undefined', 'docs-1684567539874.pdf'),
(6, 'tanmay makwana', 'abc@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 0, 'convert JSON data into XML ', 'docs-1684565898579.pdf'),
(7, 'tanmay makwana', 'abc@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 0, 'convert JSON data into XML ', 'docs-1684565979910.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
