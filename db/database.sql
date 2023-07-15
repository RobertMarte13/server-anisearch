CREATE DATABASE IF NOT EXISTS anisearch;

show databases;

CREATE TABLE auth (
    id INT(255) NOT NULL AUTO_INCREMENT,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(255) NOT NULL,
    auth_id VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE users (
    users_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    img VARCHAR(255) DEFAULT NULL, 
    bio VARCHAR(255) DEFAULT NULL,
    fechaNacimiento VARCHAR(255) DEFAULT NULL,
    user_id VARCHAR(255) DEFAULT NULL,
    front_page VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE comments (
    comments_id INT NOT NULL AUTO_INCREMENT,
    comment VARCHAR(255) DEFAULT NULL,
    likes INT DEFAULT 0,
    comment_id VARCHAR(255) DEFAULT NULL,
    commentIdSubComment VARCHAR(255) DEFAULT NULL,
    fechaCreacion VARCHAR(255) DEFAULT NULL,
    delete_id VARCHAR(255) DEFAULT NULL,
    comments_ids INT NOT NULL 
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    PRIMARY KEY (id)
)

CREATE TABLE subcomts (
    id INT(255) NOT NULL AUTO_INCREMENT,
    comments VARCHAR(255) DEFAULT NULL,
    likes INT DEFAULT 0,
    sub_comment_id VARCHAR(255) DEFAULT NULL,
    auth_comment_id VARCHAR(255) DEFAULT NULL,
    commentIdSubComment2 VARCHAR(255) DEFAULT NULL,
    fechaCreacion VARCHAR(255) DEFAULT NULL,
    sub_delete_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
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

-- Esta es para saber que usuario a dado like.
CREATE TABLE comments_likes (
    comments_likes_id INT(255) NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) DEFAULT NULL,
    delete_id VARCHAR(255) DEFAULT NULL,
    update_likes VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (comments_likes_id)
);

CREATE TABLE comment_likes (
    users_id INT NOT NULL,
    comments_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(users_id),
    FOREIGN KEY (comments_id) REFERENCES comments(comments_id),
    PRIMARY KEY (users_id, comments_id)
)

CREATE TABLE follow (
    id_follow INT NOT NULL AUTO_INCREMENT,
    users_id VARCHAR(255) DEFAULT NULL,
    user_id VARCHAR(255) DEFAULT NULL,
    delete_id VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id_follow)
)

INSERT INTO auth (username, password) VALUES ('Robertson', 'robertmarte123')

/*
* Esto es para saber cuantos likes an dado en cada comntario.

SELECT delete_id, COUNT(*) AS like_count
    -> FROM comments_likes
    -> GROUP BY delete_id
*/