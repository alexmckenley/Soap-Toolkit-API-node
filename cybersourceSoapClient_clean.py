#Sample CyberSource SOAP Toolkit integration - flat file version.
#Michael Taylor, July 2013.
#Tested with Python 2.7.5.
#Requires the 'suds' module, available via pip or https://fedorahosted.org/suds/

import suds
#import logging # optional, used for debugging purposes.
from suds.wsse import *

#Configure the logging level as needed;' suds.client' will trap request/reply XML.
#This should be disabled in production. Uncomment to enable.
#logging.basicConfig(level=logging.INFO)
#logging.getLogger('suds.client').setLevel(logging.DEBUG)

#Replace with newer WSDL as needed - change to production WSDL when ready to go live.
wsdl_url = 'https://ics2wstest.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.66.wsdl' 

#Request-level info that will remain (mostly) static.
trxn_key = 'soap_key'
merchant_id = 'mid'
client_app = 'SOAP Toolkit API'
py_version = '2.7.5' #Optional.

#Pull the WSDL and use it to create client object.
client = suds.client.Client(wsdl_url)

#Sets up WSSE appropriately.
security = Security()
token = UsernameToken(merchant_id, trxn_key)
security.tokens.append(token)
client.set_options(wsse=security)

#Advisable to change per request for reconciliation.
merchantReferenceCode = '123456'

#Create billTo object using SUDS' factory.create module.
billTo = client.factory.create('ns0:BillTo')
billTo.firstName = 'Michael'
billTo.lastName = 'Taylor'
billTo.street1 = '901 Metro Center Blvd.'
billTo.street2 = '6th Floor'
billTo.city = 'Foster City'
billTo.state = 'CA'
billTo.country = 'USA'
billTo.postalCode = '94404'
billTo.email = 'null@cybersource.com'

#Do it again, but for purchase totals.
purchaseTotals = client.factory.create('ns0:PurchaseTotals')
purchaseTotals.currency = 'USD'
purchaseTotals.grandTotalAmount = '1.00'

#Etc, etc, as required for business needs.
card = client.factory.create('ns0:Card')
card.accountNumber = '4111111111111111'
card.expirationMonth = '12'
card.expirationYear = '2020'

#Decide which service to run and create an object for it.
transaction_service = client.factory.create('ns0:ccAuthService')
transaction_service._run = 'true'

#Add it all together, making sure to change value of
#'transaction_service' if running something else.
request_params = dict(
	merchantID = merchant_id,
	merchantReferenceCode = merchantReferenceCode,
	clientLibrary = 'Python',
	clientLibraryVersion = py_version,
	clientApplication = client_app,
	billTo = billTo,
	purchaseTotals = purchaseTotals, 
	card = card,
	ccAuthService = transaction_service)

def send_request(**params):
	print "Requesting authorization...\n"
	try:
		response = client.service.runTransaction(**params)
		#You can dump the unfiltered reply to STDOUT.
		#print response

		#You can also print individual fields as part of the response object.
		print """Authorization Reply: \n
		RID: %s
		Merchant Reference Number: %s
		Reason Code: %s
		Decision: %s
		Currency: %s
		Auth Code: %s
		Authorized Datetime: %s
		Merchant ID: %s""" % (response.requestID, response.merchantReferenceCode, 
											response.reasonCode, response.decision, response.purchaseTotals.currency, 
											response.ccAuthReply.authorizationCode, response.ccAuthReply.authorizedDateTime,
											merchant_id) #etc
	except suds.WebFault:
		print "Something's gone horribly wrong."
		
#Fire it up.
send_request(**request_params)