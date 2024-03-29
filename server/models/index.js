const sequelize = require("../db/connect");
const { DataTypes } = require("sequelize");

const User = require("./User")(sequelize, DataTypes);
const Token = require("./Token")(sequelize, DataTypes);
const Restaurant = require("./Restaurant")(sequelize, DataTypes);
const Dish = require("./Dish")(sequelize, DataTypes);
const Category = require("./Category")(sequelize, DataTypes);
const RestaurantCategory = require("./Restaurantcategory")(
  sequelize,
  DataTypes
);

Category.hasMany(Dish, {
  foreignKey: "catId",
});

Dish.belongsTo(Category, {
  foreignKey: "catId",
});

User.hasOne(Token, {
  foreignKey: "userId",
});

Token.belongsTo(User, {
  foreignKey: "userId",
});

Restaurant.belongsToMany(Category, {
  through: "restaurantcategories",
  foreignKey: "catId",
  otherKey: "restId",
  as: "categories",
});
Category.belongsToMany(Restaurant, {
  through: "restaurantcategories",
  foreignKey: "restId",
  otherKey: "catId",
  as: "categories",
});

module.exports = {
  User,
  Restaurant,
  Dish,
  Category,
  RestaurantCategory,
  Token,
};
