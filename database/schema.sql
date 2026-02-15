CREATE DATABASE IF NOT EXISTS techgenx;
USE techgenx;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
);

CREATE TABLE IF NOT EXISTS sessions (
  sessionId CHAR(36) NOT NULL,
  userId BIGINT UNSIGNED NOT NULL,
  expiresAt DATETIME NOT NULL,
  PRIMARY KEY (sessionId),
  KEY idx_sessions_userId (userId),
  CONSTRAINT fk_sessions_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS courses (
  courseId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (courseId)
);

CREATE TABLE IF NOT EXISTS enrollments (
  enrollmentId CHAR(36) NOT NULL,
  userId BIGINT UNSIGNED NOT NULL,
  courseId BIGINT UNSIGNED NOT NULL,
  enrolledAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (enrollmentId),
  UNIQUE KEY uq_enrollments_user_course (userId, courseId),
  KEY idx_enrollments_userId (userId),
  KEY idx_enrollments_courseId (courseId),
  CONSTRAINT fk_enrollments_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_enrollments_course FOREIGN KEY (courseId) REFERENCES courses(courseId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacts (
  contactId CHAR(36) NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  submittedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (contactId)
);

INSERT INTO courses (title, description, price)
SELECT * FROM (
  SELECT 'Full Stack Web Development', 'Learn HTML, CSS, JavaScript, React, Node.js, and more.', 4999.00 UNION ALL
  SELECT 'Data Science & Machine Learning', 'Python, Pandas, NumPy, ML algorithms, and real projects.', 5999.00 UNION ALL
  SELECT 'Cybersecurity Essentials', 'Protect systems, networks, and learn ethical hacking.', 3999.00 UNION ALL
  SELECT 'Cloud Computing with AWS', 'Learn AWS services, deployment, and cloud architecture.', 6499.00
) AS seed(title, description, price)
WHERE NOT EXISTS (SELECT 1 FROM courses);
