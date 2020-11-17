const { join } = require('path')

module.exports = {
    type: 'sqlite',
    database: './src/database/database.sqlite',
    synchronize: true,
    logging: true,
    entities: [join(__dirname, 'dist', '**', '**', 'entities', '*.entity.js')]
}
