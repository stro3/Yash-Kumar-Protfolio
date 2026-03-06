const { Sequelize } = require('sequelize');
const path = require('path');

const createSequelizeInstance = () => {
  if (process.env.DATABASE_URL) {
    console.log('Using PostgreSQL database');
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      define: {
        timestamps: true,
        underscored: false,
      }
    });
  }

  console.log('Using SQLite database');
  return new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    }
  });
};

const sequelize = createSequelizeInstance();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    const dbType = process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite';
    console.log(`✅ ${dbType} database connected successfully`);

    await sequelize.sync({ force: false });
    console.log('✅ Database models synchronized');

    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  connectDB
};