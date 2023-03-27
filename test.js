var orders = ['6413846955'];
var count = 0;
for (var i = 0; i < orders.length; i++) {
  var order_id = orders[i];
  var orderInstance = Order.getOrderInstance(order_id);
  var processDoc = Process.getProcessDocument(orderInstance.processId);
  var projectKey = processDoc.projectKey;
  var processId = orderInstance.processId;
  var input = new DataStructure("interfaces.eai.consume.EAIAsynchronousJMSResponse.projectProvisioningEvent");
  var clientCorrelationId;
  var successful;
  var keyValue = '123456'

  input.clientId = 'eoc'
  input.clientCorrelationId = processId;
  input.databaseHostName = 'maueaidb';
  input.databaseName = 'tstt_prod';

  input.projectKey.keyValue = projectKey;

  input.provisioningRequestKey.keyValue = keyValue;

  input.provisioningCommand = 'complete';
  input.newProjectState = 'COMPLETED';
  input.successful = 'true';

  _common.setAuxiliaryAttribute(order_id, "eaiProjectKey", projectKey, true);
  _common.updateAttributeValueInBasket(order_id, "CFS_ONT", "eaiProjectKey", projectKey, null);
  _common.updateBasketItemState(order_id, "CFS_ONT", "CHA");

  Process.sendMessageToProcess(processId, null, "interfaces.eai.consume.EAIAsynchronousJMSResponse.AsynchronousResponseJMSEAIPortType/getAsynchronousResponse", input);
  count++
}
count;
