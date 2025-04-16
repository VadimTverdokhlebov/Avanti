// Script to initialize MongoDB with Avanti user and database
db.auth('root', 'rootpassword');

// Get database name from environment variable passed by Docker Compose
const dbName = _getEnv('MONGO_INITDB_DATABASE');
db = db.getSiblingDB(dbName);

// Create user with hardcoded values that match .env
db.createUser({
  user: 'avanti',
  pwd: 'avanti',
  roles: [
    {
      role: 'readWrite',
      db: dbName
    }
  ]
});

// Create initial collections if needed
db.createCollection('users');
db.createCollection('words');
db.createCollection('wordPacks'); 