# CS3219-AY22-23

## Prerequisites to be installed
Please install the following applications/software before proceeding to use/evolve the project
skeleton.
* Nodejs (and the npm that comes with it)
* nodemon
* create-react-app
* Any IDE of your choice
* Any Git client
* MongoDB Community Server
* MongoShell
* MongoDB Compass (Optional)

## User Service
1. Copy `.env.example` file as `.env`.  
~~2. Create a Cloud DB URL using Mongo Atlas.~~  
~~3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.~~  
4. Install npm packages using `npm i`.
5. Run User Service using `npm run dev`.

## Matching Service
1. Install npm packages using `npm i`.
2. Run User Service using `npm run dev`.

## Frontend
1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

## Generating API Documentation
1. Follow the instructions [here](https://github.com/thedevsaddam/docgen) to install docgen
2. Export postman collection as Collection v2.1 to docs/peerdep-api directory
3. Run `docgen build -i peerdep-api.postman_collection.json -o api-doc.md -m` to generate documentation

