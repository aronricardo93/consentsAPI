import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: "API Consents - Open Insurance Brazil",
        description: "API that deals with the creation, consultation and revocation of consents for Open Insurance Brasil Fase 2",
        version: "2.0.0"
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {},
  }
  const outputFile = './src/swagger_output.json'
  const endpointsFiles = ['./src/routes/consentRouter.ts', './src/routes/userRouter.ts']
  
  swaggerAutogen(outputFile, endpointsFiles, doc)
  