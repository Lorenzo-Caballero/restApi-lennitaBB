CREATE DATABASE IF NOT EXISTS faunotattoodb;

CREATE TABLE users (
    id INT (11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(47) DEFAULT NULL,
    email VARCHAR (47) DEFAULT NULL,
    coins INT (20) DEFAULT NULL,
    PRIMARY KEY (id)
);


DESCRIBE USERS;

INSERT INTO users VALUES
(1,"paloma","palolo@gmail.com",1000),
(2,"fauno","lorenzocaballerofernandez@gmail.com",1000),
(3,"tati","tati@gmail.com",2000),
(4,"goku","goku@gmail.com",100);
