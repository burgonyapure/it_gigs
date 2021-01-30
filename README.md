# it_gigs
A basic App using Node.js, express, sequelize, ejs, mysql.

The main focus of the app is to be able to create a user, (register) add a gig, log in, use passport authentication, be able to display data from database.

# Requirements
Requires one databese, with (currently) two tables.

The gigs table
```
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int          | NO   | PRI | NULL    | auto_increment |
| title         | varchar(200) | NO   |     | NULL    |                |
| technologies  | varchar(200) | NO   |     | NULL    |                |
| budget        | varchar(20)  | NO   |     | NULL    |                |
| description   | text         | NO   |     | NULL    |                |
| contact_email | varchar(30)  | NO   |     | NULL    |                |
| available     | tinyint(1)   | NO   |     | 1       |                |
| createdAt     | date         | NO   |     | NULL    |                |
| updatedAt     | date         | NO   |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
```

The users table
```
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int          | NO   | PRI | NULL    | auto_increment |
| name      | varchar(50)  | NO   |     | NULL    |                |
| email     | varchar(50)  | NO   |     | NULL    |                |
| password  | varchar(400) | NO   |     | NULL    |                |
| createdAt | date         | NO   |     | NULL    |                |
| updatedAt | date         | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```

## Contributing
Please note, this project is not finished, might not run 'out of the box'.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
