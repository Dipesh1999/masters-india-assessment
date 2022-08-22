-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2022 at 07:40 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `masters_india`
--

-- --------------------------------------------------------

--
-- Table structure for table `snippets`
--

CREATE TABLE `snippets` (
  `id` int(11) NOT NULL,
  `snippet` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `snippets`
--

INSERT INTO `snippets` (`id`, `snippet`) VALUES
(1, 'router.use((req, res, next) => {\n    if (!req.user || !req.user.isAdmin) {\n        res.status(401).json({ error: \'Unauthorized\' });\n        return;\n    }\n    next();\n});'),
(2, 'router.post(\'/books/add\', async (req, res) => {\r\n try {\r\n  const book = await Book.add(Object.assign({ userId: req.user.id }, req.body));\r\n  res.json(book);\r\n } catch (err) {\r\n  logger.error(err);\r\n  res.json({ error: err.message || err.toString() });\r\n }\r\n});'),
(3, 'router.get(\'/books\', async (req, res) => {\r\n try {\r\n  const books = await Book.list();\r\n  res.json(books);\r\n } catch (err) {\r\n  res.json({ error: err.message || err.toString() });\r\n }\r\n});'),
(4, 'render() {\n  return (\n   <svg className={`icon icon--chevron-left ${this.props.className}`} viewBox={this.getViewBox()}>\n    <polygon points=\"41.34 1.2 47.35 7.21 24.1 58.8 12.58 29.96 41.34 1.2\" />\n   </svg>\n  );\n }'),
(5, 'render() {\n  return (\n   <div>\n    {!this.state.online && (\n     <styles.Root>\n      <styles.Label> Offline </styles.Label>\n     </styles.Root>\n    )}\n   </div>\n  );\n }'),
(6, 'router.post(\'/torrents/delete\', (req, res) => {\r\n const {deleteData, hash: hashes} = req.body;\r\n const callback = ajaxUtil.getResponseFn(res);\r\n\r\n req.services.clientGatewayService\r\n  .removeTorrents({hashes, deleteData})\r\n  .then(callback)\r\n  .catch(err => {\r\n   callback(null, err);\r\n  });\r\n});'),
(7, 'app.use(serveStatic(path.join(__dirname, \'../playground\'), {\r\n   lastModified: false,\r\n   etag: false,\r\n   setHeaders: (res, url) => {\r\n    if (url.indexOf(\'/index.html\') !== -1) {\r\n     res.setHeader(\'Cache-Control\', \'no-cache\');\r\n    }\r\n   }\r\n  }));'),
(8, '// Rooms\r\nrouter.get(\'/rooms\', [User.isAuthenticated, function(req, res, next) {\r\n  Room.find(function(err, rooms){\r\n    if(err) throw err;\r\n    res.render(\'rooms\', { rooms });\r\n  });\r\n}]);'),
(9, '// Main logix\r\nPromise.fromNode(cb => {\r\n api.listen(config.LANDO_METRICS_PORT, cb);\r\n})\r\n.then(() => {\r\n log.info(\'Listening on port: %s\', config.LANDO_METRICS_PORT);\r\n});'),
(10, 'router.get(\'/books/detail/:slug\', async (req, res) => {\r\n try {\r\n  const book = await Book.getBySlug({ slug: req.params.slug });\r\n  res.json(book);\r\n } catch (err) {\r\n  res.json({ error: err.message || err.toString() });\r\n }\r\n});'),
(11, '// Basic HTTP response\r\napp.get(\'/\', (req, res) => {\r\n res.header(\'Content-type\', \'text/html\');\r\n return res.end(\'<h1>DANCING DANCING STARLIGHT</h1>\');\r\n});'),
(12, 'const app = express()\napp.use(morgan(\'dev\'))\napp.use(bodyparser.json())'),
(13, 'app.prepare().then(async () => {\n const server = express();'),
(14, 'router.get(\'/books\', async (req, res) => {\n try {\n  const books = await Book.list();\n  res.json(books);\n } catch (err) {\n  res.json({ error: err.message || err.toString() });\n }\n});serverStartComplete: () => {\n expect(Parse.applicationId).toEqual(\'aTestApp\');\n const app = express();\n app.use(\'/parse\', parseServer.app);'),
(15, 'router.get(\'/books/detail/:slug\', async (req, res) => {\n try {\n  const book = await Book.getBySlug({ slug: req.params.slug });\n  res.json(book);\n } catch (err) {\n  res.json({ error: err.message || err.toString() });\n }\n});');

-- --------------------------------------------------------

--
-- Table structure for table `snippet_tag_mapping`
--

CREATE TABLE `snippet_tag_mapping` (
  `id` int(11) NOT NULL,
  `snippet_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `snippet_tag_mapping`
--

INSERT INTO `snippet_tag_mapping` (`id`, `snippet_id`, `tag_id`) VALUES
(1, 5, 2),
(2, 4, 2),
(3, 3, 1),
(4, 2, 1),
(5, 1, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag`) VALUES
(1, 'express'),
(2, 'react');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`) VALUES
(2, 'test@gmail.com', '123456', 'TEST'),
(3, 'test@gmail.co', '1234', 'TESt'),
(4, 'demo@gmail.com', '123456', 'DEMO');

-- --------------------------------------------------------

--
-- Table structure for table `user_favourites`
--

CREATE TABLE `user_favourites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `snippet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_favourites`
--

INSERT INTO `user_favourites` (`id`, `user_id`, `snippet_id`) VALUES
(12, 2, 1),
(15, 4, 3),
(16, 4, 8),
(17, 2, 2),
(18, 4, 2),
(19, 4, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `snippets`
--
ALTER TABLE `snippets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `snippet_tag_mapping`
--
ALTER TABLE `snippet_tag_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `snippet_id` (`snippet_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_favourites`
--
ALTER TABLE `user_favourites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `snippet_id` (`snippet_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `snippets`
--
ALTER TABLE `snippets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `snippet_tag_mapping`
--
ALTER TABLE `snippet_tag_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_favourites`
--
ALTER TABLE `user_favourites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `snippet_tag_mapping`
--
ALTER TABLE `snippet_tag_mapping`
  ADD CONSTRAINT `snippet_tag_mapping_ibfk_1` FOREIGN KEY (`snippet_id`) REFERENCES `snippets` (`id`),
  ADD CONSTRAINT `snippet_tag_mapping_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `user_favourites`
--
ALTER TABLE `user_favourites`
  ADD CONSTRAINT `user_favourites_ibfk_1` FOREIGN KEY (`snippet_id`) REFERENCES `snippets` (`id`),
  ADD CONSTRAINT `user_favourites_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
