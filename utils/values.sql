INSERT INTO Users (Username, Password) VALUES ('bobbydilley', '1234plaintext');
INSERT INTO Users (Username, Password) VALUES ('janedilley', '1234plaintext');

INSERT INTO Tasks (Description, Username) VALUES ('Remember to take out the bins', 'bobbydilley');
INSERT INTO Tasks (Description, Username) VALUES ('Renew passport', 'bobbydilley');
INSERT INTO Tasks (Description, Username) VALUES ('Call driving instructor', 'bobbydilley');

INSERT INTO Tasks (Description, Username) VALUES ('Pick bobby up', 'janedilley');

INSERT INTO Tags (TagName, TaskID) VALUES ('passport', 2);

