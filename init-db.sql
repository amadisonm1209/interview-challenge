-- CREATE TABLE
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    account_number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    credit_limit INTEGER NULL
);

ALTER TABLE accounts ADD CONSTRAINT verify_type
CHECK (type IN ('checking', 'savings', 'credit'));

-- LOAD DATAS
INSERT INTO accounts 
    (account_number, name, amount, type, credit_limit)
VALUES
    (1, 'Johns Checking', 1000, 'checking', null),
    (2, 'Janes Savings', 2000, 'savings', null),
    (3, 'Jills Credit', -3000, 'credit', -5000),
    (4, 'Bobs Checking', 40000, 'checking', null),
    (5, 'Bills Savings', 50000, 'savings', null),
    (6, 'Bills Credit', -60000, 'credit', -75000),
    (7, 'Nancy Checking', 70000, 'checking', null),
    (8, 'Nancy Savings', 80000, 'savings', null),
    (9, 'Nancy Credit', -90000, 'credit', -100000);

-- CREATE TABLE
DROP TABLE IF EXISTS withdrawals;
CREATE TABLE withdrawals (
    account_number INTEGER,
    amount INTEGER NOT NULL,
    transaction_date DATE NOT NULL
);
-- LOAD MOCK DATA
INSERT INTO withdrawals
    (account_number, amount, transaction_date)
VALUES
    (1, 100, now());