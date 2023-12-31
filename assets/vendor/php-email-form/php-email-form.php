<?php
/**
 * Requires the "PHP Email Form" library
 * The "PHP Email Form" library is available only in the pro version of the template
 * The library should be uploaded to: vendor/php-email-form/php-email-form.php
 * For more info and help: https://bootstrapmade.com/php-email-form/
 */

// Include the PHP Email Form library
require_once('../assets/vendor/php-email-form/php-email-form.php');

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'fahriputra000@gmail.com';

// Create a new instance of the PHP_Email_Form class
$contact = new PHP_Email_Form;
$contact->ajax = true;

// Set the recipient email address and other details
$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
$contact->smtp = array(
  'host' => 'example.com',
  'username' => 'example',
  'password' => 'pass',
  'port' => '587'
);
*/

// Add message data to the email
$contact->add_message($_POST['name'], 'From');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

// Send the email and return the response
echo $contact->send();
?>
