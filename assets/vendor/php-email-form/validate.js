/**
 * PHP Email Form Validation - v3.6
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll(".php-email-form");

//   forms.forEach(function (e) {
//     e.addEventListener("submit", function (event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute("action");
//       let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

//       if (!action) {
//         displayError(thisForm, "The form action property is not set!");
//         return;
//       }
//       thisForm.querySelector(".loading").classList.add("d-block");
//       thisForm.querySelector(".error-message").classList.remove("d-block");
//       thisForm.querySelector(".sent-message").classList.remove("d-block");

//       let formData = new FormData(thisForm);

//       if (recaptcha) {
//         if (typeof grecaptcha !== "undefined") {
//           grecaptcha.ready(function () {
//             try {
//               grecaptcha.execute(recaptcha, { action: "php_email_form_submit" }).then((token) => {
//                 formData.set("recaptcha-response", token);
//                 php_email_form_submit(thisForm, action, formData);
//               });
//             } catch (error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, "The reCaptcha javascript API url is not loaded!");
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: "POST",
//       body: formData,
//       headers: { "X-Requested-With": "XMLHttpRequest" },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.text();
//         } else {
//           throw new Error(`${response.status} ${response.statusText} ${response.url}`);
//         }
//       })
//       .then((data) => {
//         thisForm.querySelector(".loading").classList.remove("d-block");
//         if (data.trim() == "OK") {
//           thisForm.querySelector(".sent-message").classList.add("d-block");
//           thisForm.reset();
//         } else {
//           throw new Error(data ? data : "Form submission failed and no error message returned from: " + action);
//         }
//       })
//       .catch((error) => {
//         displayError(thisForm, error);
//       });
//   }

//   function displayError(thisForm, error) {
//     thisForm.querySelector(".loading").classList.remove("d-block");
//     thisForm.querySelector(".error-message").innerHTML = error;
//     thisForm.querySelector(".error-message").classList.add("d-block");
//   }
// })();

// Your previous form submission handling code

// Update the error handling to handle the specific response format
const handleErrorResponse = async (response) => {
  try {
    const responseData = await response.json();
    if (responseData.ok && responseData.next) {
      // Show the success message if the response indicates a successful submission
      const successMessage = document.querySelector(".sent-message");
      successMessage.style.display = "block";
      form.reset(); // Optionally, you can reset the form after successful submission
    } else {
      // Show an error message if the response is not as expected
      throw new Error("Something went wrong with the form submission.");
    }
  } catch (error) {
    console.error(error);
    const errorMessageElement = document.querySelector(".error-message");
    errorMessageElement.textContent = "Error: " + error.message;
  } finally {
    // Re-enable the submit button and hide the loading message
    submitButton.disabled = false;
    loadingMessage.style.display = "none";
  }
};

// Modify the submit event listener to handle the error response
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // ... (rest of your previous code)

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    // Check if the submission was successful (status 200-299)
    if (response.ok) {
      // Call the new error handling function for the specific response format
      await handleErrorResponse(response);
    } else {
      // Call the previous error handling function for non-OK responses
      await handleNonOKResponse(response);
    }
  } catch (error) {
    // Display the error message in case of an error
    console.error(error);
    const errorMessageElement = document.querySelector(".error-message");
    errorMessageElement.textContent = "Error: " + error.message;
  } finally {
    // Re-enable the submit button and hide the loading message
    submitButton.disabled = false;
    loadingMessage.style.display = "none";
  }
});
