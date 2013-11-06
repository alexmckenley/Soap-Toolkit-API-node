var soap = require('soap');
var fs = require('fs');

var url = 'https://ics2wstest.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.93.wsdl';
//var args = {name: 'value'};
soap.createClient(url, function(err, client) {
    //console.log(client);

    client.setSecurity(new soap.WSSecurity('mckenley1', 'doi/zyq5OvM+riRcaYhnJnpyQt7FD7WlF1QBQT0SMrhwN9rUKAeG7owGCb01PCyOGxNUIqvDrNiQItgl8nyBIfeNyo0JmH1F4DMlbKiIIc85EXEt2NlDkLvK0Do+hf2Bh97dTGFpL7FvVgUubuBjoyxhh8xh4PBvgomsFZuk+3t4C5nfPzplJLAkBWG2UfjSFAzcKZXeevl3pnR02NuDOpZbIXy8h/5dTI0D+KpM+WiYbJuUoiiKWPfmJmNq7ugCN12ruhTrkZp/YgeOU39AuOrdMCmzNS1TFDJZ60vf6W5ZPL5QN8WjFjUEbXDklOcwja7ylL1pVh8XS45CTqtOAg=='));
   // console.log(client);
    client.runTransaction('<requestMessage xmlns="urn:schemas-cybersource-com:transaction-data-1.93">' +
  + '<merchantid>mckenley1</merchantid>'
 + '<merchantReferenceCode>ABC123</merchantReferenceCode>' 
 + '<ccAuthService run="true">'

 + '</ccAuthService>'
+ '</requestMessage>'  //fs.readFileSync('auth.xml', 'utf8')
        // "ccAuthReversalService": {"run": true},
        // ccAuthReversalService_authRequestID: 3837494210290178147615,
        // merchantID: "mckenley1",
        // merchantReferenceCode: "SOAPTEST",
        // purchaseTotals_currency: "USD",
        // purchaseTotals_grandTotalAmount: 123.12

      , function(err, result) {
      console.log(result.body);
    });

});