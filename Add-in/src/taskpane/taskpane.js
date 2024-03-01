

function stringToColorCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "#" + ("00000".substring(0, 6 - c.length) + c);
}



// This function is called when Office.js is fully loaded.
Office.onReady((info) => {
  // Check if the host is Outlook
  if (info.host === Office.HostType.Outlook) {
    // Display the app body
    document.getElementById("app-body").style.display = "flex";
    // Call the run function
    run()
  }
});

// This function gets the body of the email in text format
export async function run() {
  // Get the current item (email)
  let data={
    "item_id": "",
    "sender": "",
    "sender_email": "",
    "datetime_received": 0,
    // "sensitivity": "",
    "subject": "",
    "text_body":"",
    "class":"",
    "predicted_proba":0
  }
  


  Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, function() {

    // Inside an Office Add-in, Office.context.mailbox.item is the currently selected mail item.
    let mail = Office.context.mailbox
    let item = mail.item;
    data.item_id = item.itemId
    data.sender = item.sender.displayName;
    data.sender_email = item.sender.emailAddress;
    data.datetime_received = item.dateTimeCreated.getTime();
    data.subject = mail.item.subject
  
    
    item.body.getAsync("text", function(result) {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        data.text_body = result.value ;
        console.log(data.item_id);
        // Call the display function to display the body text
        // downloadEmailBody(body);
        sendEmailBodyToServer(data).then(new_data => {
          console.log(new_data[0]);
          data.class = new_data[0];
          data.predicted_proba = new_data[1]
          console.log(data);
          display(data);  // Move this inside the .then() block

        }).catch(error => {
          console.error('Error:', error);
        });        
      }
    }); 
  });
}



// This function creates a download link for the email body
export async function downloadEmailBody(body) {
  // Create a new Blob object from the body text
  let blob = new Blob([body], { type: "text/plain" });
  // Create a new <a> element
  let link = document.createElement("a");

  // Set the href of the link to the URL of the Blob
  link.href = URL.createObjectURL(blob);
  // Set the download attribute of the link to specify the filename
  link.download = "emailBody.txt";
  // Append the link to the body of the document
  document.body.appendChild(link);
  // Simulate a click on the link to start the download
  link.click();
  // Remove the link from the body of the document
  document.body.removeChild(link);
} 

export async function display(data) {
  const item_class=document.getElementById("item-class")
  const item_proba=document.getElementById("item-proba")
  // const item_subject=document.getElementById("item-subject")
  // const item_body=document.getElementById("item-body")

  
  // Create the HTML for the Probability
  console.log(data.predicted_proba);
  let output_proba = "<b>Probability:</b> <br/>";
  output_proba += data.predicted_proba + "<br/>";


  // Create the HTML for the class
  console.log(data.class);
  let output_class = "<b>Class:</b> <br/>";
  output_class += data.class + "<br/>";

  // // Create the HTML for the subject
  // let output_subject = "<b>Subject:</b> <br/>";
  // output_subject += data.subject + "<br/>";


  
  // // Create the HTML for the data
  // let output_body = "<b>Body:</b> <br/>";
  // output_body += data.text_body + "<br/>";

  // Set the innerHTML of the item-info, item-subject and item-body elements
  item_class.innerHTML = output_class;
  item_proba.innerHTML = output_proba
  // item_subject.innerHTML = output_subject;
  // item_body.innerHTML = output_body;
}


// This function sends the body of the email to a server
export async function sendEmailBodyToServer(data) {
  // Show the loading screen
  document.getElementById("loading-screen").style.display = "block";

  // Send a POST request to the server
  const response = await fetch('http://localhost:9090/', { // https://s144272.devops-ap.be/api/site
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body: data.text_body }),
  });

  // Hide the loading screen
  document.getElementById("loading-screen").style.display = "none";

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Return the response from the server
  return response.json();
}




  // const bodyData = {
  //   body: "Your body content here"
  // };
  
  // const response = await fetch('https://s144272.devops-ap.be/api/site', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(bodyData)
  // });
  
  // const data = await response.json(); // Extract data from the response



  // const response = await fetch('https://s144272.devops-ap.be/api/site');
  // const data = await response.json(); // Extract data from the response



  // for (let item of data) {

      
    
  //   if (item.body) { // Check if the item has a 'body' property

  //     if (subject == test) {
  //       output += item.body + "<br/>";
  //     }
  //   }
  // }