const site = "https://s144272.devops-ap.be/api"; 
//"http://localhost:9090/" // https://s139913.devopps.be/9090 https://s144272.devops-ap.be/api/site

let initialAppState = document.getElementById("app-body").innerHTML;
const xValues = [];
const yValues = [];

let myChart = new Chart('myChart', {
  type: 'line',
  data: {
    labels: xValues,
      datasets: [{
          data: yValues,
          backgroundColor:  "rgba(0,0,255,1.0)",
          fill: false,

      }]
  },
  options: {
      legend: { display: false },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  max: 1 // since probabilities range from 0 to 1
              }
          }]
      }
  }
});

// This function is called when Office.js is fully loaded.
Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("app-body").style.display = "flex";
    run();
  }
});

// This function gets the body of the email in text format
export async function run() {
  let data = initializeData();
  const sendSwitch = document.getElementById("sendSwitch");

  sendSwitch.addEventListener("change", function() {
    if (this.checked) {
      sendEmailBodyToServer(data).then(new_data => {
        updateData(data, new_data);
        display(data);
      }).catch(error => {
        console.error('Error:', error);
      });        
    }
  });

  Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, function() {
    updateDataOnItemChange(data);
  });
}

function initializeData() {
  return {
    "item_id": "",
    "sender": "",
    "sender_email": "",
    "datetime_received": 0,
    "subject": "",
    "body":"",
    "label":"",
    "certainty":0 
  }
}

function updateData(data, new_data) {
  data.label = new_data.label;
  data.certainty = new_data.certainty
}

function updateDataOnItemChange(data) {
  let mail = Office.context.mailbox
  let item = mail.item;
  data.item_id = item.itemId
  data.sender = item.sender.displayName;
  data.sender_email = item.sender.emailAddress;
  data.datetime_received = item.dateTimeCreated.getTime();
  data.subject = mail.item.subject

  item.body.getAsync("text", function(result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      data.content = result.value ;
      const sendSwitch = document.getElementById("sendSwitch");
      if (sendSwitch.checked) {
        sendEmailBodyToServer(data).then(new_data => {
          updateData(data, new_data);
          display(data);
        }).catch(error => {
          console.error('Error:', error);
        });
      }
    }
  }); 
}

export async function downloadEmailBody(body) {
  let blob = new Blob([body], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "emailBody.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 

export async function display(data) {
  const item_class = document.getElementById("item-class")
  const item_proba = document.getElementById("item-proba")

  item_class.innerHTML = "<b>Class:</b> <br/>" + data.label;
  item_proba.innerHTML = "<b>Probability:</b> <br/>" + data.certainty;
}

export async function checkServerStatus() {
  try {
    const response = await fetch(site, { method: 'GET' });
    if (response.ok) {

      // Remove the check server button
      const checkServerButton = document.getElementById("check-server");
      if (checkServerButton) {
        checkServerButton.remove();
      }
      document.getElementById("app-body").innerHTML = initialAppState;

      console.log('The server is offline.');
    }
  } catch (error) {
    console.log('The server is offline.');
  }
}

export async function sendEmailBodyToServer(data) {
    document.getElementById("loading-screen").style.display = "block";
    console.log(data.body);
    try {
        const response = await fetch(site, {
            method: 'POST',
            headers: {
                'Source':"Outlook",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body: data.body }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();
        // Update the chart data
        console.log(responseData);
        xValues.push(xValues.length + 1); // add a new x-value
        yValues.push(responseData.certainty.toFixed(10)); // add a new y-value
        myChart.update();

        // Remove the check server button if it exists
        const checkServerButton = document.getElementById("check-server");
        if (checkServerButton) {
            checkServerButton.remove();
        }

        return responseData;
    } catch (error) {
      document.getElementById("app-body").innerHTML = "The server is currently offline. Please try again later.";

      // Create the check server button
      const checkServerButton = document.createElement("button");
      checkServerButton.id = "check-server";
      checkServerButton.innerText = "Check Server Status";
      document.getElementById("app-body").appendChild(checkServerButton);

      // Add an event listener to the button
      checkServerButton.addEventListener("click", () => checkServerStatus());

      console.error('Error:', error);
    } finally {
      document.getElementById("loading-screen").style.display = "none";
    }
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