
-- now that users may be getting added to the db dynamically add an id
alter table mock_users add column id INT AUTO_INCREMENT PRIMARY KEY;

alter table mock_users drop column id;

-- add the about field
alter table mock_users add column about varchar(1000);

-- add a timestamp
ALTER TABLE mock_users add column time_added TIMESTAMP default current_timestamp;

-- add the about field
alter table mock_users add column first_name varchar(100);

alter table mock_users add column last_name varchar(100);

alter table mock_users add column user_type varchar(100);


update mock_users set mock_users.first_name = C1;
update mock_users set mock_users.last_name = C2;
update mock_users set mock_users.user_type = C3;


-- check the table
select id,first_name, user_type, skills,  looking_for
from mock_users;




-- __EXPORT __START



CREATE TABLE `mock_users` (
  `first_name` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(11) CHARACTER SET utf8 DEFAULT NULL,
  `user_type` varchar(9) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `skills` varchar(200) DEFAULT NULL,
  `q_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `about` varchar(1000) DEFAULT NULL,
  `time_added` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mock_users`
--

INSERT INTO `mock_users` (`first_name`, `last_name`, `user_type`, `gender`, `skills`, `q_id`, `id`, `about`, `time_added`) VALUES
('Aaron', 'CHASE', 'mock user', 'male', 'angular, html, javascript, php, interview practice, c#, c, web dev', 10000340, 1, NULL, '2020-05-21 16:33:42'),
('Aaron', 'MCDOWELL', 'mock user', 'male', 'data, c', 10008880, 2, NULL, '2020-05-21 16:33:42'),
('Abigail', 'CONLEY', 'mock user', 'female', 'c++, math, rust, artificial intelligence, elixir, security, js, data', 10003380, 3, NULL, '2020-05-21 16:33:42'),
('Abigail', 'PETTY', 'mock user', 'female', 'big data, math, go, html, .net, statistics', 10000250, 4, NULL, '2020-05-21 16:33:42'),
('Alexander', 'LEVINE', 'mock user', 'male', 'js, artificial intelligence, c++', 10001110, 5, NULL, '2020-05-21 16:33:42'),
('Alexander', 'HOLCOMB', 'mock user', 'male', 'testing, iphone', 10004830, 6, NULL, '2020-05-21 16:33:42'),
('Alexis', 'OWENS', 'mock user', 'female', 'apache, excel, math, visual basic, data, python', 10000800, 7, NULL, '2020-05-21 16:33:42'),
('Alexis', 'GOULD', 'mock user', 'female', 'visual basic, math, testing, android', 10009520, 8, NULL, '2020-05-21 16:33:42'),
('Ann', 'WALLACE', 'mock user', 'female', 'math, angular, mobile, ruby, c, game, swift', 10005180, 9, NULL, '2020-05-21 16:33:42'),
('Ann', 'PADILLA', 'mock user', 'female', 'c#, visual basic, go, html', 10007370, 10, NULL, '2020-05-21 16:33:42'),
('Anna', 'CAMACHO', 'mock user', 'female', 'ai, game', 10001300, 11, NULL, '2020-05-21 16:33:42'),
('Anna', 'MEADOWS', 'mock user', 'female', 'data, mobile, node, iphone', 10004370, 12, NULL, '2020-05-21 16:33:42'),
('Arthur', 'HENDRIX', 'mock user', 'male', 'statistics, react, r, computer science, interview practice, c, hack', 10007980, 13, NULL, '2020-05-21 16:33:42'),
('Arthur', 'MCCLAIN', 'mock user', 'male', 'machine learning, visual basic, git, react, testing', 10006770, 14, NULL, '2020-05-21 16:33:42'),
('Ashley', 'CLARK', 'mock user', 'female', 'iphone, math, html, c, c#, testing', 10009920, 15, NULL, '2020-05-21 16:33:42'),
('Ashley', 'DECKER', 'mock user', 'female', 'mobile, data', 10009300, 16, NULL, '2020-05-21 16:33:42'),
('Ashley', 'VARGAS', 'mock user', 'female', 'math, css', 10006710, 17, NULL, '2020-05-21 16:33:42'),
('Barbara', 'BLANKENSHIP', 'mock user', 'female', 'rust, web dev, testing, game, ai, artificial intelligence, visual basic, swift, big data, aws', 10005680, 18, NULL, '2020-05-21 16:33:42'),
('Barbara', 'BOWERS', 'mock user', 'female', 'testing, git', 10008240, 19, NULL, '2020-05-21 16:33:42'),
('Benjamin', 'PRESTON', 'mock user', 'male', 'interview practice, java, go, c, hack, r', 10004160, 20, NULL, '2020-05-21 16:33:42'),
('Benjamin', 'WYNN', 'mock user', 'male', 'git, ruby, javascript', 10006100, 21, NULL, '2020-05-21 16:33:42'),
('Benjamin', 'RIVAS', 'mock user', 'male', 'data, elixir, game, css, machine learning, c#, apache', 10008030, 22, NULL, '2020-05-21 16:33:42'),
('Beverly', 'DEAN', 'mock user', 'female', 'excel, angular, go, statistics, algorithms, r, math, react', 10001840, 23, NULL, '2020-05-21 16:33:42'),
('Billy', 'DILLON', 'mock user', 'male', 'ai, .net, java, statistics, iphone', 10005100, 24, NULL, '2020-05-21 16:33:42'),
('Billy', 'VELEZ', 'mock user', 'male', 'ai, js, artificial intelligence, swift, app', 10009990, 25, NULL, '2020-05-21 16:33:42'),
('Bobby', 'ERICKSON', 'mock user', 'male', 'app, html, aws, ai, computer science, elixir, php', 10004640, 26, NULL, '2020-05-21 16:33:42'),
('Bradley', 'CLAYTON', 'mock user', 'male', 'python, php, c#, web dev, go, git', 10003250, 27, NULL, '2020-05-21 16:33:42'),
('Brittany', 'PATE', 'mock user', 'female', 'java, .net, web dev, excel', 10002310, 28, NULL, '2020-05-21 16:33:42'),
('Bryan', 'EVERETT', 'mock user', 'male', 'js, c, swift, mobile, game', 10001820, 29, NULL, '2020-05-21 16:33:42'),
('Carol', 'BEST', 'mock user', 'female', 'testing, sql, math, c++, swift, cloud, artificial intelligence, excel', 10002170, 30, NULL, '2020-05-21 16:33:42'),
('Carolyn', 'VANG', 'mock user', 'female', 'testing, react, math, elixir, c#, ruby', 10005390, 31, NULL, '2020-05-21 16:33:42'),
('Carolyn', 'HARRELL', 'mock user', 'female', 'js, node, react, game, sql, interview practice, python, math, go, .net', 10000430, 32, NULL, '2020-05-21 16:33:42'),
('Catherine', 'LANDRY', 'mock user', 'female', 'c++, .net', 10005990, 33, NULL, '2020-05-21 16:33:42'),
('Charles', 'LYONS', 'mock user', 'male', '.net, machine learning, js, c#, web dev', 10008670, 34, NULL, '2020-05-21 16:33:42'),
('Charles', 'CHEN', 'mock user', 'male', 'testing, react, math, elixir, c#, ruby', 10005390, 35, NULL, '2020-05-21 16:33:42'),
('Cheryl', 'JOHNS', 'mock user', 'female', 'css, hack, php, angular', 10000930, 36, NULL, '2020-05-21 16:33:42'),
('Christian', 'WALLACE', 'mock user', 'male', 'excel, elixir, aws', 10008480, 37, NULL, '2020-05-21 16:33:42'),
('Christian', 'PADILLA', 'mock user', 'male', 'c++, go, cloud, react, js, hack', 10009600, 38, NULL, '2020-05-21 16:33:42'),
('Christina', 'WEAVER', 'mock user', 'female', 'swift, go, hack, security, mobile', 10002560, 39, NULL, '2020-05-21 16:33:42'),
('Christopher', 'SHIELDS', 'mock user', 'male', 'web dev, app', 10004000, 40, NULL, '2020-05-21 16:33:42'),
('Cynthia', 'REESE', 'mock user', 'female', 'math, python, cloud, swift', 10002320, 41, NULL, '2020-05-21 16:33:42'),
('Danielle', 'SARGENT', 'mock user', 'female', 'interview practice, rust, c#, ai', 10009590, 42, NULL, '2020-05-21 16:33:42'),
('Danielle', 'LAMB', 'mock user', 'female', 'testing, node, html, algorithms, r, interview practice, game, php', 10001000, 43, NULL, '2020-05-21 16:33:42'),
('David', 'BLANKENSHIP', 'mock user', 'male', 'math, testing, hack, javascript', 10006240, 44, NULL, '2020-05-21 16:33:42'),
('David', 'BOWERS', 'mock user', 'male', 'apache, css, artificial intelligence, data, security, ai, rust, swift', 10008170, 45, NULL, '2020-05-21 16:33:42'),
('Debra', 'HERNANDEZ', 'mock user', 'female', 'hack, mobile, apache, swift, interview practice, game', 10002160, 46, NULL, '2020-05-21 16:33:42'),
('Debra', 'FOWLER', 'mock user', 'female', 'git, python, elixir, android, big data, testing, game, react, security', 10006260, 47, NULL, '2020-05-21 16:33:42'),
('Debra', 'SNYDER', 'mock user', 'female', 'apache, big data, android, testing, artificial intelligence, .net', 10004850, 48, NULL, '2020-05-21 16:33:42'),
('Debra', 'WILDER', 'mock user', 'female', 'testing, .net, big data', 10005480, 49, NULL, '2020-05-21 16:33:42'),
('Dennis', 'VANG', 'mock user', 'male', 'c++, visual basic, rust', 10002830, 50, NULL, '2020-05-21 16:33:42'),
('Dennis', 'HARRELL', 'mock user', 'male', 'swift, testing, math, android, game, algorithms, js, statistics', 10007690, 51, NULL, '2020-05-21 16:33:42'),
('Diana', 'FRAZIER', 'mock user', 'female', 'ai, js, artificial intelligence, swift, app', 10009990, 52, NULL, '2020-05-21 16:33:42'),
('Douglas', 'FERNANDEZ', 'mock user', 'male', 'testing, react, sql, statistics, node, math, visual basic, security, hack', 10006850, 53, NULL, '2020-05-21 16:33:42'),
('Douglas', 'GREGORY', 'mock user', 'male', 'math, c, testing, game, rust, statistics, c#, git', 10004310, 54, NULL, '2020-05-21 16:33:42'),
('Douglas', 'MUNOZ', 'mock user', 'male', 'statistics, ruby, html, apache', 10000980, 55, NULL, '2020-05-21 16:33:42'),
('Douglas', 'MADDOX', 'mock user', 'male', 'rust, swift, testing', 10001990, 56, NULL, '2020-05-21 16:33:42'),
('Eric', 'CHASE', 'mock user', 'male', 'node, rust, app, cloud', 10006990, 57, NULL, '2020-05-21 16:33:42'),
('Eric', 'MCDOWELL', 'mock user', 'male', 'app, css, react, js, elixir, web dev, sql', 10008990, 58, NULL, '2020-05-21 16:33:42'),
('Eugene', 'CONLEY', 'mock user', 'male', 'app, .net, artificial intelligence, hack, php', 10003980, 59, NULL, '2020-05-21 16:33:42'),
('Eugene', 'PETTY', 'mock user', 'male', 'visual basic, .net, excel, react, cloud, algorithms, machine learning, c++', 10002940, 60, NULL, '2020-05-21 16:33:42'),
('Evelyn', 'CAIN', 'mock user', 'female', 'ruby, swift, game, machine learning, python, ai', 10002740, 61, NULL, '2020-05-21 16:33:42'),
('Frances', 'SOLIS', 'mock user', 'female', 'cloud, css, hack, android, algorithms, game', 10004910, 62, NULL, '2020-05-21 16:33:42'),
('Frank', 'RAYMOND', 'mock user', 'male', 'artificial intelligence, math', 10006310, 63, NULL, '2020-05-21 16:33:42'),
('Gary', 'JACKSON', 'mock user', 'male', 'c++, math, game', 10006810, 64, NULL, '2020-05-21 16:33:42'),
('George', 'BEST', 'mock user', 'male', 'game, android, rust, hack, excel', 10005120, 65, NULL, '2020-05-21 16:33:42'),
('Gerald', 'JACOBS', 'mock user', 'male', 'testing, ruby, interview practice, statistics, visual basic, iphone, hack', 10005160, 66, NULL, '2020-05-21 16:33:42'),
('Gerald', 'SANDOVAL', 'mock user', 'male', 'python, machine learning, css, big data, apache', 10000460, 67, NULL, '2020-05-21 16:33:42'),
('Hannah', 'HENDRIX', 'mock user', 'female', 'hack, algorithms, python, artificial intelligence, game, interview practice, app, big data, machine learning', 10006800, 68, NULL, '2020-05-21 16:33:42'),
('Hannah', 'MCCLAIN', 'mock user', 'female', 'ai, excel, testing, big data, angular, algorithms, git, html, php, c++', 10002640, 69, NULL, '2020-05-21 16:33:42'),
('Heather', 'CHASE', 'mock user', 'female', 'js, apache, ruby, java', 10002770, 70, NULL, '2020-05-21 16:33:42'),
('Heather', 'MCDOWELL', 'mock user', 'female', 'angular, python, android, math, visual basic, excel, react, data, machine learning, r', 10005960, 71, NULL, '2020-05-21 16:33:42'),
('Helen', 'JACKSON', 'mock user', 'female', 'node, data, elixir, c++, big data, c#, git, visual basic, js', 10001480, 72, NULL, '2020-05-21 16:33:42'),
('Jack', 'ZAMORA', 'mock user', 'male', 'sql, aws, hack, python, visual basic, excel, c#', 10009510, 73, NULL, '2020-05-21 16:33:42'),
('Jack', 'BRADFORD', 'mock user', 'male', 'c, html, testing', 10003140, 74, NULL, '2020-05-21 16:33:42'),
('Jack', 'BARNES', 'mock user', 'male', 'git, apache, sql, html, math, react, python, machine learning, game, elixir', 10007140, 75, NULL, '2020-05-21 16:33:42'),
('Jacob', 'CANTRELL', 'mock user', 'male', 'artificial intelligence, math', 10006310, 76, NULL, '2020-05-21 16:33:42'),
('Jacqueline', 'MCKINNEY', 'mock user', 'female', 'aws, node', 10000110, 77, NULL, '2020-05-21 16:33:42'),
('James', 'MCGEE', 'mock user', 'male', 'c#, algorithms', 10001610, 78, NULL, '2020-05-21 16:33:42'),
('Jane', 'CLAYTON', 'mock user', 'female', 'computer science, elixir, interview practice, r, .net', 10007710, 79, NULL, '2020-05-21 16:33:42'),
('Janet', 'MCKEE', 'mock user', 'female', 'rust, testing, .net, php, algorithms, js', 10003740, 80, NULL, '2020-05-21 16:33:42'),
('Janice', 'EVERETT', 'mock user', 'female', 'mobile, aws, artificial intelligence, data, c, web dev, ai', 10005550, 81, NULL, '2020-05-21 16:33:42'),
('Jason', 'POPE', 'mock user', 'male', 'android, c, git, math', 10006530, 82, NULL, '2020-05-21 16:33:42'),
('Jeremy', 'SOLIS', 'mock user', 'male', 'algorithms, swift, mobile, visual basic, html, testing, statistics', 10006010, 83, NULL, '2020-05-21 16:33:42'),
('Jerry', 'MCKEE', 'mock user', 'male', 'excel, c#, javascript, php, game', 10000450, 84, NULL, '2020-05-21 16:33:42'),
('John', 'GUTIERREZ', 'mock user', 'male', 'computer science, ruby, rust, cloud, angular, c++, game', 10004240, 85, NULL, '2020-05-21 16:33:42'),
('John', 'WINTERS', 'mock user', 'male', 'artificial intelligence, computer science, aws, math, android, node', 10009820, 86, NULL, '2020-05-21 16:33:42'),
('Jonathan', 'CAMACHO', 'mock user', 'male', 'android, rust, html', 10006400, 87, NULL, '2020-05-21 16:33:42'),
('Jonathan', 'MEADOWS', 'mock user', 'male', 'machine learning, interview practice, rust, visual basic, iphone, go, mobile, python, apache', 10002520, 88, NULL, '2020-05-21 16:33:42'),
('Joshua', 'JENKINS', 'mock user', 'male', 'excel, math, mobile, statistics, react, artificial intelligence, sql, php, machine learning', 10003410, 89, NULL, '2020-05-21 16:33:42'),
('Joyce', 'FERNANDEZ', 'mock user', 'female', 'hack, interview practice', 10009480, 90, NULL, '2020-05-21 16:33:42'),
('Joyce', 'GREGORY', 'mock user', 'female', 'aws, machine learning, c', 10007170, 91, NULL, '2020-05-21 16:33:42'),
('Joyce', 'MUNOZ', 'mock user', 'female', 'java, c, javascript, data, mobile', 10007400, 92, NULL, '2020-05-21 16:33:42'),
('Joyce', 'MADDOX', 'mock user', 'female', 'css, go, html, java', 10005500, 93, NULL, '2020-05-21 16:33:42'),
('Julia', 'DILLON', 'mock user', 'female', 'testing, big data, c++, elixir, security, sql, react, computer science', 10005300, 94, NULL, '2020-05-21 16:33:42'),
('Julia', 'VELEZ', 'mock user', 'female', 'ai, js, artificial intelligence, swift, app', 10009990, 95, NULL, '2020-05-21 16:33:42'),
('Justin', 'DOYLE', 'mock user', 'male', 'python, git, ai, machine learning, hack', 10004040, 96, NULL, '2020-05-21 16:33:42'),
('Justin', 'GUERRA', 'mock user', 'male', 'rust, hack', 10000230, 97, NULL, '2020-05-21 16:33:42'),
('Karen', 'LYONS', 'mock user', 'female', 'apache, php, node, iphone, c#, excel, testing, java', 10009030, 98, NULL, '2020-05-21 16:33:42'),
('Karen', 'CHEN', 'mock user', 'female', 'cloud, git, mobile', 10004470, 99, NULL, '2020-05-21 16:33:42'),
('Katherine', 'RAYMOND', 'mock user', 'female', 'ruby, css, android, python, aws, html, math, r', 10005250, 100, NULL, '2020-05-21 16:33:42'),
('Kathleen', 'CANTRELL', 'mock user', 'female', 'machine learning, .net, cloud', 10002850, 101, NULL, '2020-05-21 16:33:42'),
('Keith', 'JOHNSTON', 'mock user', 'male', 'data, js, rust, c#, big data, r, artificial intelligence, algorithms, node, game', 10008500, 102, NULL, '2020-05-21 16:33:42'),
('Kelly', 'BAXTER', 'mock user', 'female', 'git, game, web dev', 10003950, 103, NULL, '2020-05-21 16:33:42'),
('Kelly', 'EDWARDS', 'mock user', 'female', 'sql, js, aws, game, html, php, hack, iphone, app', 10004250, 104, NULL, '2020-05-21 16:33:42'),
('Kyle', 'PRUITT', 'mock user', 'male', 'ruby, algorithms, mobile, .net, php, rust, statistics, testing', 10009400, 105, NULL, '2020-05-21 16:33:42'),
('Kyle', 'CHRISTIAN', 'mock user', 'male', 'game, ruby, ai, iphone', 10004260, 106, NULL, '2020-05-21 16:33:42'),
('Kyle', 'LITTLE', 'mock user', 'male', 'android, go, security, java, cloud, c, visual basic, aws', 10003090, 107, NULL, '2020-05-21 16:33:42'),
('Kyle', 'RIVERA', 'mock user', 'male', 'git, data, r, c++, ruby, game', 10002690, 108, NULL, '2020-05-21 16:33:42'),
('Kyle', 'TYSON', 'mock user', 'male', 'security, r, java, angular, interview practice, mobile, c, c#, algorithms, apache', 10004150, 109, NULL, '2020-05-21 16:33:42'),
('Laura', 'POPE', 'mock user', 'female', 'testing, php, c#, html, data, react, aws, java, swift', 10002680, 110, NULL, '2020-05-21 16:33:42'),
('Lauren', 'PRUITT', 'mock user', 'female', 'swift, math, excel, aws, javascript, iphone, testing, algorithms', 10000950, 111, NULL, '2020-05-21 16:33:42'),
('Lauren', 'CHRISTIAN', 'mock user', 'female', 'python, visual basic, node, game, html, security, javascript, go', 10006720, 112, NULL, '2020-05-21 16:33:42'),
('Lauren', 'LITTLE', 'mock user', 'female', 'android', 10000760, 113, NULL, '2020-05-21 16:33:42'),
('Lauren', 'RIVERA', 'mock user', 'female', 'c, interview practice, game', 10003640, 114, NULL, '2020-05-21 16:33:42'),
('Lauren', 'TYSON', 'mock user', 'female', 'cloud, javascript, statistics, testing, apache, r, react, machine learning', 10005920, 115, NULL, '2020-05-21 16:33:42'),
('Linda', 'MCCARTY', 'mock user', 'female', '.net, machine learning, js, c#, web dev', 10008670, 116, NULL, '2020-05-21 16:33:42'),
('Linda', 'PUGH', 'mock user', 'female', 'game, swift, java, visual basic, web dev, cloud, artificial intelligence, mobile', 10005600, 117, NULL, '2020-05-21 16:33:42'),
('Linda', 'SCHROEDER', 'mock user', 'female', 'c++, algorithms, angular, game', 10001980, 118, NULL, '2020-05-21 16:33:42'),
('Linda', 'ODOM', 'mock user', 'female', 'android, go, security, java, cloud, c, visual basic, aws', 10003090, 119, NULL, '2020-05-21 16:33:42'),
('Linda', 'MITCHELL', 'mock user', 'female', 'elixir, excel', 10009500, 120, NULL, '2020-05-21 16:33:42'),
('Logan', 'PATE', 'mock user', 'male', 'artificial intelligence, c++, testing, math', 10008260, 121, NULL, '2020-05-21 16:33:42'),
('Lori', 'ERICKSON', 'mock user', 'female', 'hack, algorithms, c++, big data, machine learning, php, web dev', 10002800, 122, NULL, '2020-05-21 16:33:42'),
('Louis', 'FRAZIER', 'mock user', 'male', 'c++, go, ai, testing, html', 10009220, 123, NULL, '2020-05-21 16:33:42'),
('Madison', 'CONRAD', 'mock user', 'female', 'aws, php, swift, machine learning, elixir, ai, python', 10007680, 124, NULL, '2020-05-21 16:33:42'),
('Marilyn', 'MERCER', 'mock user', 'female', 'android', 10000760, 125, NULL, '2020-05-21 16:33:42'),
('Mark', 'GONZALES', 'mock user', 'male', 'web dev, ruby, iphone, android, git, sql, python, angular', 10000740, 126, NULL, '2020-05-21 16:33:42'),
('Martha', 'JOHNSTON', 'mock user', 'female', 'go, apache, machine learning, interview practice, iphone, game, elixir, mobile, web dev', 10001430, 127, NULL, '2020-05-21 16:33:42'),
('Mary', 'MCGEE', 'mock user', 'female', 'app, node, git, c++, math, mobile, js, swift, python', 10004940, 128, NULL, '2020-05-21 16:33:42'),
('Megan', 'JACOBS', 'mock user', 'female', 'computer science, artificial intelligence, machine learning, c', 10000390, 129, NULL, '2020-05-21 16:33:42'),
('Megan', 'SANDOVAL', 'mock user', 'female', 'machine learning, big data, app, excel, java, .net, interview practice, statistics, artificial intelligence', 10007130, 130, NULL, '2020-05-21 16:33:42'),
('Michael', 'MCCARTY', 'mock user', 'male', 'math, visual basic, js, react, app, big data, apache, angular, javascript', 10004480, 131, NULL, '2020-05-21 16:33:42'),
('Michael', 'PUGH', 'mock user', 'male', 'testing, node, html, algorithms, r, interview practice, game, php', 10001000, 132, NULL, '2020-05-21 16:33:42'),
('Michael', 'SCHROEDER', 'mock user', 'male', 'aws, .net, game, artificial intelligence, testing, visual basic', 10001580, 133, NULL, '2020-05-21 16:33:42'),
('Michael', 'ODOM', 'mock user', 'male', 'c, html, node, iphone, computer science, ruby, js', 10004880, 134, NULL, '2020-05-21 16:33:42'),
('Michael', 'MITCHELL', 'mock user', 'male', 'c, javascript, mobile, hack, artificial intelligence', 10009680, 135, NULL, '2020-05-21 16:33:42'),
('Michelle', 'JENKINS', 'mock user', 'female', 'ai, swift, excel', 10003770, 136, NULL, '2020-05-21 16:33:42'),
('Nancy', 'SHIELDS', 'mock user', 'female', 'math, testing, computer science, swift, statistics, big data, angular', 10009800, 137, NULL, '2020-05-21 16:33:42'),
('Natalie', 'FREEMAN', 'mock user', 'female', 'aws, php, swift, machine learning, elixir, ai, python', 10007680, 138, NULL, '2020-05-21 16:33:42'),
('Nathan', 'WEAVER', 'mock user', 'male', 'game, react, artificial intelligence, c++', 10009000, 139, NULL, '2020-05-21 16:33:42'),
('Nicole', 'GILBERT', 'mock user', 'female', 'game, r, big data, visual basic, apache, c++, android, algorithms, math', 10001940, 140, NULL, '2020-05-21 16:33:42'),
('Nicole', 'ALEXANDER', 'mock user', 'female', 'ruby, swift, game, machine learning, python, ai', 10002740, 141, NULL, '2020-05-21 16:33:42'),
('Pamela', 'DOYLE', 'mock user', 'female', 'web dev, app, interview practice, .net, data, game, css, c++', 10007850, 142, NULL, '2020-05-21 16:33:42'),
('Pamela', 'GUERRA', 'mock user', 'female', 'css, angular, app, math, swift, testing, data, javascript, aws, iphone', 10001050, 143, NULL, '2020-05-21 16:33:42'),
('Patricia', 'GUTIERREZ', 'mock user', 'female', 'testing, computer science, data, go, mobile, ai, javascript, sql, artificial intelligence', 10001700, 144, NULL, '2020-05-21 16:33:42'),
('Patricia', 'WINTERS', 'mock user', 'female', 'swift, game', 10005350, 145, NULL, '2020-05-21 16:33:42'),
('Patrick', 'HERNANDEZ', 'mock user', 'male', 'c, math, java', 10001630, 146, NULL, '2020-05-21 16:33:42'),
('Patrick', 'FOWLER', 'mock user', 'male', 'mobile, hack, excel, interview practice, statistics, swift, math, c++, c', 10002110, 147, NULL, '2020-05-21 16:33:42'),
('Patrick', 'SNYDER', 'mock user', 'male', 'big data, security, cloud', 10005660, 148, NULL, '2020-05-21 16:33:42'),
('Patrick', 'WILDER', 'mock user', 'male', 'python, iphone, .net, node, mobile, web dev, big data, data, angular', 10001960, 149, NULL, '2020-05-21 16:33:42'),
('Paul', 'CLARK', 'mock user', 'male', 'machine learning, .net, cloud', 10002850, 150, NULL, '2020-05-21 16:33:42'),
('Paul', 'DECKER', 'mock user', 'male', 'r, machine learning, testing, apache, game, iphone, interview practice, math, elixir', 10008350, 151, NULL, '2020-05-21 16:33:42'),
('Paul', 'VARGAS', 'mock user', 'male', 'node, r, math, artificial intelligence, web dev, php', 10003200, 152, NULL, '2020-05-21 16:33:42'),
('Peter', 'BAXTER', 'mock user', 'male', 'css, hack, php, angular', 10000930, 153, NULL, '2020-05-21 16:33:42'),
('Peter', 'EDWARDS', 'mock user', 'male', 'sql, interview practice, machine learning, big data, rust, aws, excel, c++, hack', 10005070, 154, NULL, '2020-05-21 16:33:42'),
('Philip', 'OWENS', 'mock user', 'male', 'swift, go, hack, security, mobile', 10002560, 155, NULL, '2020-05-21 16:33:42'),
('Philip', 'GOULD', 'mock user', 'male', 'java, app, c++', 10007600, 156, NULL, '2020-05-21 16:33:42'),
('Rachel', 'ZAMORA', 'mock user', 'female', 'computer science, big data', 10000320, 157, NULL, '2020-05-21 16:33:42'),
('Rachel', 'BRADFORD', 'mock user', 'female', 'machine learning, rust, app, visual basic, interview practice, ai, mobile', 10008790, 158, NULL, '2020-05-21 16:33:42'),
('Rachel', 'BARNES', 'mock user', 'female', 'c++, java, c#, computer science, ai, android, app', 10003000, 159, NULL, '2020-05-21 16:33:42'),
('Ralph', 'DEAN', 'mock user', 'male', 'react, big data, visual basic, testing, php, javascript', 10008640, 160, NULL, '2020-05-21 16:33:42'),
('Randy', 'ROBINSON', 'mock user', 'male', 'computer science, c++, ai, excel, interview practice, statistics', 10004190, 161, NULL, '2020-05-21 16:33:42'),
('Raymond', 'LANDRY', 'mock user', 'male', 'java, go, elixir, css, testing', 10005050, 162, NULL, '2020-05-21 16:33:42'),
('Rebecca', 'SIMS', 'mock user', 'female', 'game, math, r, excel, elixir', 10002650, 163, NULL, '2020-05-21 16:33:42'),
('Richard', 'CONTRERAS', 'mock user', 'male', 'elixir, cloud', 10008130, 164, NULL, '2020-05-21 16:33:42'),
('Roger', 'JOHNS', 'mock user', 'male', 'testing, php, c#, html, data, react, aws, java, swift', 10002680, 165, NULL, '2020-05-21 16:33:42'),
('Ronald', 'MCKEE', 'mock user', 'male', 'game, react, artificial intelligence, c++', 10009000, 166, NULL, '2020-05-21 16:33:42'),
('Rose', 'ROBINSON', 'mock user', 'female', 'node, rust, app, cloud', 10006990, 167, NULL, '2020-05-21 16:33:42'),
('Roy', 'MERCER', 'mock user', 'male', 'visual basic, cloud, statistics, apache, big data, game, python, testing, iphone, excel', 10007930, 168, NULL, '2020-05-21 16:33:42'),
('Russell', 'FREEMAN', 'mock user', 'male', 'web dev, big data, data, aws, testing', 10008690, 169, NULL, '2020-05-21 16:33:42'),
('Ryan', 'REESE', 'mock user', 'male', 'r, security, statistics, hack, excel, c#, angular', 10009660, 170, NULL, '2020-05-21 16:33:42'),
('Samantha', 'PRESTON', 'mock user', 'female', 'react, algorithms, java, hack, security, apache, android, machine learning', 10002230, 171, NULL, '2020-05-21 16:33:42'),
('Samantha', 'WYNN', 'mock user', 'female', 'testing, sql, math, c++, swift, cloud, artificial intelligence, excel', 10002170, 172, NULL, '2020-05-21 16:33:42'),
('Samantha', 'RIVAS', 'mock user', 'female', 'visual basic, ai, css, aws, sql, .net', 10004180, 173, NULL, '2020-05-21 16:33:42'),
('Sandra', 'GONZALES', 'mock user', 'female', 'data, mobile, node, iphone', 10004370, 174, NULL, '2020-05-21 16:33:42'),
('Scott', 'GILBERT', 'mock user', 'male', 'computer science, android, ruby, rust', 10009310, 175, NULL, '2020-05-21 16:33:42'),
('Scott', 'ALEXANDER', 'mock user', 'male', 'elixir, web dev, visual basic, swift, excel, rust, python', 10003450, 176, NULL, '2020-05-21 16:33:42'),
('Shirley', 'CHASE', 'mock user', 'female', 'computer science, android, ruby, rust', 10009310, 177, NULL, '2020-05-21 16:33:42'),
('Shirley', 'MCDOWELL', 'mock user', 'female', 'react, javascript', 10006210, 178, NULL, '2020-05-21 16:33:42'),
('Sophia', 'PIERCE', 'mock user', 'female', 'c, html, testing', 10003140, 179, NULL, '2020-05-21 16:33:42'),
('Sophia', 'LEE', 'mock user', 'female', 'python, web dev, security, mobile, node', 10007030, 180, NULL, '2020-05-21 16:33:42'),
('Stephanie', 'MCKEE', 'mock user', 'female', 'hack, web dev, git, angular', 10005760, 181, NULL, '2020-05-21 16:33:42'),
('Susan', 'CONTRERAS', 'mock user', 'female', 'swift, testing, math, android, game, algorithms, js, statistics', 10007690, 182, NULL, '2020-05-21 16:33:42'),
('Terry', 'MCKINNEY', 'mock user', 'male', 'c++, cloud, html, java, sql, apache, app, iphone', 10001170, 183, NULL, '2020-05-21 16:33:42'),
('Timothy', 'SIMS', 'mock user', 'male', 'hack, algorithms, c++, big data, machine learning, php, web dev', 10002800, 184, NULL, '2020-05-21 16:33:42'),
('Vincent', 'PIERCE', 'mock user', 'male', 'app, ruby, swift, c#, interview practice, elixir, node, git, artificial intelligence', 10000480, 185, NULL, '2020-05-21 16:33:42'),
('Vincent', 'LEE', 'mock user', 'male', 'artificial intelligence, interview practice, html, apache, css, security, swift, r, visual basic, js', 10004020, 186, NULL, '2020-05-21 16:33:42'),
('Virginia', 'LEVINE', 'mock user', 'female', 'react, big data, visual basic, testing, php, javascript', 10008640, 187, NULL, '2020-05-21 16:33:42'),
('Virginia', 'HOLCOMB', 'mock user', 'female', 'computer science, cloud', 10001140, 188, NULL, '2020-05-21 16:33:42'),
('Walter', 'CAIN', 'mock user', 'male', 'java, git, swift, android, game, visual basic, app, excel', 10009770, 189, NULL, '2020-05-21 16:33:42'),
('Wayne', 'SARGENT', 'mock user', 'male', 'security, c, ai, r, angular, machine learning', 10005440, 190, NULL, '2020-05-21 16:33:42'),
('Wayne', 'LAMB', 'mock user', 'male', '.net, apache, excel, android, elixir, swift, angular', 10007880, 191, NULL, '2020-05-21 16:33:42'),
('Willie', 'CONRAD', 'mock user', 'male', 'hack, artificial intelligence, data, mobile, app, visual basic, sql, angular', 10003070, 192, NULL, '2020-05-21 16:33:42'),
(NULL, NULL, 'real user', NULL, NULL, NULL, 193, NULL, '2020-05-21 16:42:08'),
(NULL, NULL, 'real user', NULL, NULL, NULL, 194, NULL, '2020-05-21 16:43:43'),
(NULL, NULL, 'real user', NULL, NULL, NULL, 195, NULL, '2020-05-21 16:47:02'),
('juliusaaaaa', NULL, 'real user', NULL, 'math,css,javascript,python', NULL, 196, 'hiiiiisuuup', '2020-05-21 16:53:34'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 197, '', '2020-05-21 17:04:17'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 198, '', '2020-05-21 17:07:10'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 199, '', '2020-05-21 17:14:42'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 200, '', '2020-05-21 17:22:35'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 201, '', '2020-05-21 17:23:07'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 202, '', '2020-05-21 17:24:39'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 203, '', '2020-05-21 17:25:44'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 204, '', '2020-05-21 17:35:14'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 205, '', '2020-05-21 17:46:10'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 206, '', '2020-05-21 17:47:24'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 207, '', '2020-05-21 17:49:43'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 208, '', '2020-05-21 17:50:13'),
('SELECT  FRO', NULL, 'real user', NULL, 'math, css, javascript, php', NULL, 209, '', '2020-05-21 17:56:46'),
('julius yooo', NULL, 'real user', NULL, 'html, php, sql', NULL, 210, 'not much', '2020-05-21 18:56:21'),
('julius yooo', NULL, 'real user', NULL, 'html, php, sql', NULL, 211, 'not much', '2020-05-21 18:58:06'),
('romulus', NULL, 'real user', NULL, 'interview practice, java, go, c, hack, r', NULL, 212, 'hii', '2020-05-21 18:59:17'),
('augustus', NULL, 'real user', NULL, 'apache, excel, math, visual basic, data, python', NULL, 213, 'hi world', '2020-05-21 19:06:22'),
('tiberius', NULL, 'real user', NULL, 'c, interview practice, game, php, sql', NULL, 214, 'im a coder', '2020-05-21 19:07:26'),
('julius aaaa', NULL, 'real user', NULL, 'math, css, javascript, python', NULL, 215, 'hiiiii suuup', '2020-05-21 20:27:23');








-- END OF FILE