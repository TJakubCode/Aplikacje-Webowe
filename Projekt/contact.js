const form = document.forms[0];

const email = document.getElementById("email");
const topic = document.getElementById("topic");
const textArea = document.getElementById("text-area");

const errorEmail = document.getElementById("email-error");
const errorTopic = document.getElementById("topic-error");
const errorMessage = document.getElementById("error-text");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.style.display = "none";
  errorTopic.style.display = "none";
  errorEmail.style.display = "none";

  const emailAddress = email.value.trim();
  const chosenTopic = topic.value;
  const message = textArea.value.trim();

  let isCorrect = true;

  if (emailAddress == "") {
    isCorrect = false;
    errorEmail.textContent = "Wpisz adres e-mail!!!";
    errorEmail.style.display = "block";
  } else if (!emailRegex.test(emailAddress)) {
    isCorrect = false;
    errorEmail.textContent = "Wpisz prawidłowy adres e-mail!!!";
    errorEmail.style.display = "block";
  }

  if (chosenTopic == "") {
    isCorrect = false;
    errorTopic.style.display = "block";
  }

  if (message == "") {
    isCorrect = false;
    errorMessage.style.display = "block";
  }

  if (isCorrect) form.submit();
});
