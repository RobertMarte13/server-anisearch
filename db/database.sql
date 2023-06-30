CREATE DATABASE IF NOT EXISTS anisearch;

show databases;

CREATE TABLE auth (
    id INT() NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE commets (
    id INT() NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE createcard (
    id INT() NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) DEFAULT NULL,
    lastname VARCHAR(255) DEFAULT NULL,
    age INT() DEFAULT NULL,
    high INT() DEFAULT NULL,
    animename VARCHAR(255) DEFAULT NULL,
    estudio VARCHAR(255) DEFAULT NULL,
    creador VARCHAR(255) DEFAULT NULL,
    img VARCHAR(255) DEFAULT NULL, 
    PRIMARY KEY (id)
)

INSERT INTO auth (username, password) VALUES ('Robertson', 'robertmarte123')

