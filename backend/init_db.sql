-- init_db.sql

-- Create Admin table
CREATE TABLE Admin (
    AdminID SERIAL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Organization VARCHAR(255)
);

-- Create User table
CREATE TABLE User (
    UserID SERIAL PRIMARY KEY,
    NickName VARCHAR(255),
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Country VARCHAR(255),
    Role VARCHAR(255)
);