const Sequelize=require("sequelize");
const User=require("./user");
const Post=require("./post");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize=new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.sequelize = sequelize;

db.User=User;
db.Post=Post;

User.init(sequelize);
Post.init(sequelize);

User.assocaite(db);
Post.assocaite(db);

module.exports = db;
