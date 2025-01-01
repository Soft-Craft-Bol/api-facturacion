const soap = require('soap');
const config = require('../config/siat.config');

class SiatService {
  constructor() {
    this.wsdlUrl = 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl';
    this.soapOptions = {
      forceSoap12Headers: false,
      wsdl_headers: {
        connection: 'keep-alive',
        apikey: config.tokenApi // Replace with your valid token
      }
    };
  }

  async getCuis() {
    try {
      const client = await soap.createClientAsync(this.wsdlUrl, this.soapOptions);
      
      // Set the API key in the headers for the request
      client.addHttpHeader('apikey', config.tokenApi);

      const params = {
        SolicitudCuis: {
          codigoAmbiente: 2, // 2 for testing environment
          codigoModalidad: 2, // 2 for Computarizada en Línea
          codigoPuntoVenta: 0,
          codigoSistema: config.codigoSistema, // Replace with your system code
          codigoSucursal: 0,
          nit: config.nit // Replace with your NIT
        }
      };

      const result = await client.cuisAsync(params);
      return result[0]; // SOAP response is always in an array
      
    } catch (error) {
      console.error('Error getting CUIS:', error);
      throw new Error('Failed to get CUIS');
    }
  }
}

module.exports = new SiatService();