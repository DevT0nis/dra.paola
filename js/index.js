function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    tel: document.getElementById("tel").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

const serviceID = "service_9mq4zmg";
const templateID = "template_mkptz6p";

emailjs.send(serviceID, templateID, params)
  .then((res) => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    console.log(res);
    alert("sua mensagem foi enviada com sucesso!");
  })
  .catch((err) => console.log(err));
}