CREATE DATABASE IF NOT EXISTS anisearch;

show databases;

CREATE TABLE auth (
    id INT(255) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    auth_id VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE comments (
    id INT(255) NOT NULL AUTO_INCREMENT,
    comment VARCHAR(255) DEFAULT NULL,
    likes INT(255) NOT NULL,
    comment_id VARCHAR(255) DEFAULT NULL,
    commentIdSubComment VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE subcomts (
    id INT(255) NOT NULL AUTO_INCREMENT,
    comments VARCHAR(255) DEFAULT NULL,
    likes INT(255) NOT NULL,
    sub_comment_id VARCHAR(255) DEFAULT NULL,
    auth_comment_id VARCHAR(255) DEFAULT NULL,
    commentIdSubComment2 VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE createcard (
    id INT(255) NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) DEFAULT NULL,
    lastname VARCHAR(255) DEFAULT NULL,
    age INT(255) DEFAULT NULL,
    high INT(255) DEFAULT NULL,
    animename VARCHAR(255) DEFAULT NULL,
    estudio VARCHAR(255) DEFAULT NULL,
    creador VARCHAR(255) DEFAULT NULL,
    img VARCHAR(255) DEFAULT NULL, 
    PRIMARY KEY (id)
);

INSERT INTO auth (username, password) VALUES ('Robertson', 'robertmarte123')

