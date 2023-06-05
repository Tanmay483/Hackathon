-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2023 at 03:45 PM
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
-- Table structure for table `hackathon`
--

CREATE TABLE `hackathon` (
  `hId` int(11) NOT NULL,
  `vTitle` varchar(500) NOT NULL,
  `vImage` varchar(250) NOT NULL,
  `vUniversity` varchar(500) NOT NULL,
  `vAddress` varchar(500) NOT NULL,
  `vBrif` varchar(500) NOT NULL,
  `vDetails` varchar(500) NOT NULL,
  `vDeadline` varchar(100) NOT NULL,
  `iTeamSize` int(11) NOT NULL,
  `vEligibility` varchar(200) NOT NULL,
  `tCreatedDate` datetime NOT NULL,
  `tUpdatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hackathon`
--

INSERT INTO `hackathon` (`hId`, `vTitle`, `vImage`, `vUniversity`, `vAddress`, `vBrif`, `vDetails`, `vDeadline`, `iTeamSize`, `vEligibility`, `tCreatedDate`, `tUpdatedDate`) VALUES
(2, 'hackathon', 'http://localhost:8085/app/Images/image-1685971535803.png', 'gmit', 'sidser', 'timepass', 'sasti hackathon', 'never ending', 10000, 'you must born', '1885-05-10 00:00:00', '2089-10-05 00:00:00'),
(4, 'hackNuthon', 'http://localhost:8085/app/Images/image-1685971385890.png', 'nirma', 'ahmdabad', 'hack nu thon', 'state leavel', '5 days left', 2, 'under garduate', '0000-00-00 00:00:00', '2024-05-06 00:00:00');

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
  `vTeamType` enum('individual','team') NOT NULL DEFAULT 'individual',
  `iNumberOfMembers` int(11) NOT NULL,
  `vProblemStatement` varchar(500) NOT NULL,
  `Document` varchar(200) NOT NULL,
  `Password` varchar(10) NOT NULL,
  `keyStatus` enum('active','deactive','block') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Id`, `vName`, `vEmail`, `vMobileNumber`, `vAddress`, `vQualification`, `vProfession`, `vTeamType`, `iNumberOfMembers`, `vProblemStatement`, `Document`, `Password`, `keyStatus`) VALUES
(1, 'tanmay makwana', 'makwanatanmay48@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 0, 'convert JSON data into XML', 'app\\Documents\\docs-1685894823282.pdf', 'h*djWbc1', 'active'),
(2, 'tanmay makwana', 'mtanum483@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 0, 'convert JSON data into XML', 'app\\Documents\\docs-1685894902575.pdf', 'UxJ5LWqk', 'active'),
(3, 'tanmay makwana', 'naman.makwana178@gmail.com', '8905691100', 'bhavnager', 'greduate', 'web-devloper', 'individual', 0, 'convert JSON data into XML', 'app\\Documents\\docs-1685894989801.pdf', 'T9k*dGh0', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hackathon`
--
ALTER TABLE `hackathon`
  ADD PRIMARY KEY (`hId`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hackathon`
--
ALTER TABLE `hackathon`
  MODIFY `hId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
