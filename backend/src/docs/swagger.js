import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import generateOpenAPIDocs from './index.js';

export function setupSwagger(app) {
    const openApiSpec = generateOpenAPIDocs();
    
    const swaggerOptions = {
        customCss: `
            .swagger-ui .topbar { display: none; }
            .swagger-ui .info { margin: 50px 0; }
            .swagger-ui .info .title { color: #2563eb; }
        `,
        customSiteTitle: "Tech Choices API Documentation",
        customfavIcon: "/favicon.ico"
    };

    app.use('/api/docs', swaggerUi.serve);
    app.get('/api/docs', swaggerUi.setup(openApiSpec, swaggerOptions));

    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(openApiSpec);
    });

}

export default setupSwagger;