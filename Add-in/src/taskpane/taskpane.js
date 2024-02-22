Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
    run()
  }
});




async function run() {
  const item = Office.context.mailbox.item;

  item.body.getAsync("text", function(result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      const body = result.value ;

      downloadEmailBody(body);
      sendEmailBodyToServer(body);
      display();
    }
  });
}



async function downloadEmailBody(body) {
  var blob = new Blob([body], { type: "text/plain" });
  var link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "emailBody.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function display() {
  const item = Office.context.mailbox.item ;
  const subject=item.subject
  const test="Discover what's happening across your organization."

  const response = await fetch('https://s144272.devops-ap.be/api/site');
  console.log(data);

  for (let data of response) {
 
    if (data.subject==test) {
    document.getElementById("item-body").innerHTML = "<b>Body:</b> <br/>" + data.body;
    }
  }
  
}

async function sendEmailBodyToServer(body) {


  fetch('/save-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ emailBody: body })
  });
}