const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');

const { properties, logger, argv } =  require('./utils/utils.js');

const port = argv.port || properties.get('port') || 8080;

const app = express();

app.set('view name','hbs');
hbs.registerPartials(`${__dirname}/../views/partials`);
app.use(express.static(`${__dirname}/../node_modules/bootstrap/dist`));

routes.configureRoutes(app);

app.listen(port, () => {
  console.log('Application is up in port',port);
  logger.debug('Application is up in port',port);
});

module.exports = app;
