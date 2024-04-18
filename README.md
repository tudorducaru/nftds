# NFTDS

NFT project tracker.

## Installation instructions

### Database setup

Create a new database:

```sql
CREATE DATABASE nftds;
```

Create a new user: 

```sql
CREATE USER 'nftds_admin' IDENTIFIED BY '<password>';
```

Grant privileges on the database to the new user:

```sql
GRANT ALL PRIVILEGES ON nftds.* TO 'nftds_admin' WITH GRANT OPTION;

FLUSH PRIVILEGES;

SHOW GRANTS FOR 'nftds_admin';
```

Create the structure of the database using the `dump.sql` file (in Google Drive). The dump only contains the database schema, without any data.

```bash
mysql -u nftds_admin -p nftds < dump.sql
```

To generate a new admin user, go into the `server/admin_generator.js` file and modify the `password` variable to the desired password. Then run the script, which will output an ID and the hashed password. 

To insert the admin record in the database, execute the following SQL command: 

```sql
INSERT INTO admins VALUES ('<id>', '<username>', '<hashed_pass>');
```

### Add environment variables

Create a `.env` file inside the `server/` folder and add the following variables:

- `DB_HOST = localhost`
- `DB_NAME = nftds`, or the db name you chose
- `DB_USER = nftds_admin`, or the user you created
- `DB_PASSWORD = ` whatever password you specified for the user
- `ACCESS_TOKEN_SECRET`, `CSRF_TOKEN_SECRET` some server secrets
- `DISCORD_BOT_TOKEN`: token for the Discord API, get it from the Discord developer portal

### Run the project

Install the dependencies:

```bash
# server/ folder
npm install

# client/ folder
npm install
```

Start up the server and the client:

```bash
# server/ folder
npm run dev

# client/ folder
npm run dev
```

## Running with Docker

First, build the front-end client using the following command in the `client/` folder:

```bash
npm run build
```

Then, build the Docker image:

```bash
docker build -t nftds .
```

**IMPORTANT:** when running with Docker, change the `DB_HOST` environment variable to `host.docker.internal`.

Run the image with the environment variables from the `server/` folder:

```bash
docker run --name nftds --env-file ./server/.env -d --rm -p 3000:5000 nftds
```



