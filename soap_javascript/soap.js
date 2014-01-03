var soap = require('./node-soap/lib/soap.js');
var fs = require('fs');

//Update your merchant information here
var sendToProduction = false;
var merchantID = "MERCHANTID";
var soapSecurityKey = "SECURITYKEY";


var url = 'https://ics2ws' + (sendToProduction ? '' : 'test') + '.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.93.wsdl';


var transactionCallback = function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log(result.body || result);
};

//Create soap client
soap.createClient(url, function (err, client) {
  var i;
  //set security
  client.setSecurity(new soap.WSSecurity(merchantID, soapSecurityKey));

  //run transaction
  for (i = 1; i > 0; i -= 1) {
    client.runTransaction(
      //Enter API Fields here
      {
        merchantID: merchantID,
        merchantReferenceCode: "TEST",
        billTo: {
          firstName: "First",
          lastName: "Last",
          street1: "901 Metro Center Blvd",
          city: "Foster City",
          state: "CA",
          postalCode: "94404",
          country: "US",
          email: "null@cybersource.com"
        },
        item: {
          $id: 0,
          unitPrice: "5.00",
          quantity: "5",
          commodityCode: "123"
        },
        purchaseTotals: {
          currency: "USD",
          //grandTotalAmount: 7.00
        },
        card: {
          accountNumber: "4111111111111111",
          expirationMonth: "12",
          expirationYear: "2018",
          cardType: "001"
        },
        ccAuthService: {
          $run: true
        }
      },
      transactionCallback
    );
  }
});