# blogapp-api

need at least the latest release of Node.js v14 <br />
clone project locally <br />
npm install <br />
npm init <br />
npm i @adonisjs/lucid <br />
node ace configure @adonisjs/lucid <br />
add to env.ts:   export default Env.rules({
                PG_HOST: Env.schema.string({ format: 'host' }),
                PG_PORT: Env.schema.number(),
                PG_USER: Env.schema.string(),
                PG_PASSWORD: Env.schema.string.optional(),
                PG_DB_NAME: Env.schema.string(),
                }) <br />
install required tools for postgreSQL database <br />
create new database locally <br />
create .env file in project <br />
add additional infos of database to .env file <br />
run migrations: node ace migration:run <br />
run seeders: node ace db:seed <br />
start project: node ace serve --watch<br />


There is a link of documentation created in POSTMAN: https://documenter.getpostman.com/view/20254829/2s8YzRz3H2


