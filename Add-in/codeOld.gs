function sendLatestEmailBodyToServer(e) {
    Logger.log('test2a')
    var body = getLatestEmailBody(e);
    Logger.log('test2b')
    if (!body) {
        Logger.log('No email body to send.');
        return;
    }    
    // Send the body to the server
    sendEmailBodyToServer(body);

    // Show the response in a dialog
    var htmlOutput = HtmlService.createHtmlOutputFromFile('Dialog')
      .setWidth(400)
      .setHeight(300);
    SpreadsheetApp.getActiveSpreadsheet().show(htmlOutput);
    htmlOutput.evaluate(); // this will run the setResponse function in the Dialog.html file
}

function getLatestEmailBody(e) {
    if (!e || !e.gmail || !e.gmail.accessToken || !e.gmail.messageId) {
        Logger.log('Invalid event object');
        return null;
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(30000);  // wait 30 seconds before timing out

    var accessToken = e.gmail.accessToken;
    GmailApp.setCurrentMessageAccessToken(accessToken);

    var messageId = e.gmail.messageId;
    var message = GmailApp.getMessageById(messageId);

    var body = message.getPlainBody();
    Logger.log(body);
    Logger.log('test');

    lock.releaseLock();

    return body;
}

function sendEmailBodyToServer(data) {
  const site = "https://s139913.devopps.be/9090"; // https://s144272.devops-ap.be/api/site

  Logger.log(data)
  Logger.log(JSON.stringify({ "body": data}))
  var options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({ "body": data}),
  };

  try {
    var response = UrlFetchApp.fetch(site, options);
    var responseData = JSON.parse(response.getContentText());
    Logger.log(responseData)

    } catch (error) {
        Logger.log('Error:', error);
    }
}

function checkServerStatus() {
  try {
    var response = UrlFetchApp.fetch(site);
    if (response.getResponseCode() == 200) {
      Logger.log('The server is online.');
    } else {
      Logger.log('The server is offline.');
    }
  } catch (error) {
    Logger.log('The server is offline.');
  }
}