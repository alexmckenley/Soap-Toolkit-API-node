var soap = require('../node-soap/lib/soap.js');
var fs = require('fs');

var sendToProduction = false;

var url = 'https://ics2ws' + (sendToProduction ? '' : 'test') + '.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.93.wsdl';
//var args = {name: 'value'};
soap.createClient(url, function(err, client) {
  //set security
  client.setSecurity(new soap.WSSecurity('mckenley1', 'doi/zyq5OvM+riRcaYhnJnpyQt7FD7WlF1QBQT0SMrhwN9rUKAeG7owGCb01PCyOGxNUIqvDrNiQItgl8nyBIfeNyo0JmH1F4DMlbKiIIc85EXEt2NlDkLvK0Do+hf2Bh97dTGFpL7FvVgUubuBjoyxhh8xh4PBvgomsFZuk+3t4C5nfPzplJLAkBWG2UfjSFAzcKZXeevl3pnR02NuDOpZbIXy8h/5dTI0D+KpM+WiYbJuUoiiKWPfmJmNq7ugCN12ruhTrkZp/YgeOU39AuOrdMCmzNS1TFDJZ60vf6W5ZPL5QN8WjFjUEbXDklOcwja7ylL1pVh8XS45CTqtOAg=='));
  
  //run transaction
  client.runTransaction( //fs.readFileSync('auth.xml', 'utf8') //to read from file
    {
      merchantID: "mckenley1",
      merchantReferenceCode: "NODEJS_FTW",
      purchaseTotals: {
        currency: "USD",
        grandTotalAmount: 4.00
      },
      ccAuthReversalService: {
        _run: true,
        authRequestID: "3837883164250176056166"
      }
    }, function(err, result) {
      if(err)
        console.log(err);
      
      console.log(result.body ? result.body : result);
    });

});