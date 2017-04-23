CREATE DATABASE tables_db;

USE tables_db;
CREATE TABLE tables(
name VARCHAR(100) NOT NULL,
number VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
uid INTEGER(10) PRIMARY KEY NOT NULL
);

INSERT INTO tables(name, number, email, uid)
VALUES
("Misha", "510-555-555", "mishkasaur@me.com", 23242);
