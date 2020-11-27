document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  //document.querySelector('#compose-form').addEventListener("Submit", alert('event is trigerred'));
  document.querySelector('#compose-form').onsubmit = function() {
    post_email;
    load_mailbox('inbox');
  };

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

function post_email() {

  // Obtaining the values of each of the three major fields within the compose email form
  let recipient_list = document.querySelector('#compose-recipients').value;
  let email_body = document.querySelector('#compose-subject').value;
  let email_subject = document.querySelector('#compose-body').value;

  // Printing out these constants in our console log to ensure that we are getting the correct output as expected
  console.log(`To: ${recipient_list}, Body: ${email_body}, Subject: ${email_subject}`);

  fetch('emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: `${recipient_list}`, 
      subject: `${email_body}`,
      body: `${email_subject}` 
    })
  })
  .then(response => response.json())
  .then(result => {
      console.log(result);
  });

  // This prevents the form from actually being submitted 
  return false;
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}