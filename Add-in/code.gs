function processEmailAndSendToServer(e) {
    Logger.log('test2a')

    // Check event object
    if (!e || !e.gmail || !e.gmail.accessToken || !e.gmail.messageId) {
        Logger.log('Invalid event object');
        return;
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

    Logger.log('test2b')
    if (!body) {
        Logger.log('No email body to send.');
        return;
    }    

    // Send the body to the server
    const site = "https://s139913.devopps.be/9090"; // https://s144272.devops-ap.be/api/site

    Logger.log(body)
    Logger.log(JSON.stringify({ "body": body}))
    var options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        payload: JSON.stringify({ "body": body}),
    };

    try {
        var response = UrlFetchApp.fetch(site, options);
        var responseData = JSON.parse(response.getContentText());
        PropertiesService.getScriptProperties().setProperty('responseData', JSON.stringify(responseData));
        Logger.log(responseData)
        var bodyViewer1 = CardService.newTextParagraph().setText(responseData[0]);
        var bodyViewer2 = CardService.newTextParagraph().setText(responseData[1]);

        var header = CardService.newCardHeader().setTitle("Email Body");

        var section = CardService.newCardSection();
        section.addWidget(bodyViewer1);
        section.addWidget(bodyViewer2);

        return CardService.newCardBuilder().setHeader(header).addSection(section).build();

    } 
    catch (error) {
        Logger.log('Error:', error);

        // Create a card that displays the error message
        var errorViewer = CardService.newTextParagraph().setText("Error: " + error);
        var header = CardService.newCardHeader().setTitle("Error");

        var section = CardService.newCardSection();
        section.addWidget(errorViewer);
        var button = CardService.newTextButton()
            .setText("Resend")
            .setOnClickAction(CardService.newAction()
                .setFunctionName("processEmailAndSendToServer")); // replace with the name of your function

        section.addWidget(button);

        return CardService.newCardBuilder().setHeader(header).addSection(section).build();    }
}

function getResponseData() {
    var responseData = PropertiesService.getScriptProperties().getProperty('responseData');
    return JSON.parse(responseData);
}