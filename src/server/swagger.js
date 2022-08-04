import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(`${__dirname}/api-docs.yaml`);
const route = express.Router();

const options = {
  customCss: `
    .swagger-ui 
      .topbar { background-color: #d31145; }
  `,
  customSiteTitle: 'Node Js Boilerplate'
};

route.use('/docs', swaggerUi.serve);
route.get('/docs', swaggerUi.setup(swaggerDocument, options));

export default route;
