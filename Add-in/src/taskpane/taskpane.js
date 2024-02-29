function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
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
  const item = Office.context.mailbox.item;

  item.body.getAsync("text", function(result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      // If the operation succeeded, get the body text
      const body = result.value ;
      // Call the display function to display the body text

      // downloadEmailBody(body);
      // sendEmailBodyToServer(body);
      display(body);
    }
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

export async function display(body) {
  const item_dot=document.getElementById("item-dot")
  const item_info=document.getElementById("item-info")
  const item_subject=document.getElementById("item-subject")
  const item_body=document.getElementById("item-body")

  // Get the current item (email)
  const item = Office.context.mailbox.item;
  // Get the subject of the email
  const subject = item.subject;


  // Create the HTML for the info
  let output_info = "<b>Subject length:</b> <br/>";
  output_info += `${subject.length}`+ "<br/>";
  
  item_dot.style.backgroundColor = "#" + intToRGB(hashCode(subject));


  // Create the HTML for the subject
  let output_subject = "<b>Subject:</b> <br/>";
  output_subject += subject + "<br/>";


  
  // Create the HTML for the body
  let output_body = "<b>Body:</b> <br/>";
  output_body += body + "<br/>";

  // Set the innerHTML of the item-info, item-subject and item-body elements
  // item_dot.innerHTML += output_dot;
  item_info.innerHTML += output_info;
  item_subject.innerHTML += output_subject;
  item_body.innerHTML += output_body;
}

// This function sends the body of the email to a server
export async function sendEmailBodyToServer(body) {
  // Send a POST request to the server
  const response = await fetch('https://s144272.devops-ap.be/api/site', {
    method: 'POST', // Specify the method
    headers: {
      'Content-Type': 'application/json', // Indicate that we're sending JSON
    },
    body: JSON.stringify({ body: body }), // Convert the body to a JSON string
  });

  // Check if the request was successful
  if (!response.ok) {
    // If the request was not successful, throw an error
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