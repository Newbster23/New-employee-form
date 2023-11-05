const DocName = Object.freeze({
  PHOTO: "photo",
  CV: "cv",
  AADHAAR_CARD: "aadhaar_card",
  PAN_CARD: "pan_card",
  EXPERIENCE_LETTER: "experience_letter",
  RELIEVING_LETTER: "relieving_letter",
  SALARY_SLIP: "salary_slip",
  APPOINTMENT_LETTER: "appointment_letter",
  INCREMENT_LETTER: "increment_letter",
  GRADUATION_CERTIFICATE: "graduation_certificate",
  POST_GRADUATION_CERTIFICATE: "post_graduation_certificate",
  DIPLOMA_CERTIFICATE: "diploma_certificate",
  BIRTH_CERTIFICATE: "birth_certificate",
  LEAVING_CERTIFICATE: "leaving_certificate",
  PASSPORT: "passport",
  RATION_CARD: "ration_card",
  LEASE_AGREEMENT: "lease_agreement",
  BANK_PASSBOOK: "bank_passbook",
  CANCELLED_CHEQUE: "cancelled_cheque",
});

// Validate to disable future dates
const today = new Date().toISOString().split('T')[0];
const dateInputs = document.querySelectorAll('input[type="date"]');

dateInputs.forEach(input => {
  input.setAttribute('max', today);
});

// JavaScript to add education fields
document.getElementById("addEducation").addEventListener("click", function () {
  const existingEducationFields = document.querySelector("#eduContainer");
  const newEducationFields = existingEducationFields.cloneNode(true);

  // Clear input values
  newEducationFields.querySelectorAll("input").forEach((input) => {
    input.value = "";
    input.classList.remove("error-input");
  });

  // Add a "remove" button
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.style.backgroundColor = "red";
  removeButton.className = "removeEdu";
  removeButton.style.color = "white";
  removeButton.style.border = "none";
  removeButton.style.paddingTop = "10px";
  removeButton.style.paddingRight = "20px";
  removeButton.style.paddingBottom = "10px";
  removeButton.style.paddingLeft = "20px";
  removeButton.textContent = "Remove";
  newEducationFields.appendChild(removeButton);
  document.getElementById("eduContainer").appendChild(newEducationFields);
});

// Handle removing education fields
document.getElementById("eduContainer").addEventListener("click", function (e) {
  if (e.target.classList.contains("removeEdu")) {
    e.target.parentNode.remove();
  }
});

// JavaScript to add experience fields
document.getElementById("addExperience").addEventListener("click", function () {
  const existingExperienceFields = document.querySelector("#expContainer");
  const newExperienceFields = existingExperienceFields.cloneNode(true);

  // Clear input values
  newExperienceFields.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  // Add a "remove" button
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.style.backgroundColor = "red";
  removeButton.className = "removeExp";
  removeButton.style.color = "white";
  removeButton.style.border = "none";
  removeButton.style.paddingTop = "10px";
  removeButton.style.paddingRight = "20px";
  removeButton.style.paddingBottom = "10px";
  removeButton.style.paddingLeft = "20px";
  removeButton.textContent = "Remove";
  newExperienceFields.appendChild(removeButton);
  document.getElementById("expContainer").appendChild(newExperienceFields);
});

// Handle removing experience fields
document.getElementById("expContainer").addEventListener("click", function (e) {
  if (e.target.classList.contains("removeExp")) {
    e.target.parentNode.remove();
  }
});

// JavaScript to validate required input fields and required documents
document.addEventListener("DOMContentLoaded", function () {
  const requiredInputsFields = document
    .getElementById("employeeForm")
    .querySelectorAll("input[required]");
  const requiredSelectFields = document
    .getElementById("employeeForm")
    .querySelectorAll("select[required]");
  document
    .getElementById("submitButton")
    .addEventListener("click", function (event) {
      requiredInputsFields.forEach((input) => {
        if (input.value === "") {
          input.classList.add("error-input");
          document.getElementById("InfoError").textContent =
            "Please fill all the mandatory fields and upload all the reqired documents.";
        } else {
          input.classList.remove("error-input");
        }
      });

      requiredSelectFields.forEach((select) => {
        if (select.options[select.selectedIndex].value === "") {
          select.classList.add("error-input");
          document.getElementById("InfoError").textContent =
            "Please fill all the mandatory fields and upload all the reqired documents.";
        } else {
          select.classList.remove("error-input");
        }
      });
    });

  // Add event listeners to remove highlight when typing in input fields
  requiredInputsFields.forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value !== "") {
        input.classList.remove("error-input");
      }
    });
  });

  // Add event listeners to remoce highlight when option is selected in dropdown
  requiredSelectFields.forEach((select) => {
    select.addEventListener("change", function () {
      if (select.options[select.selectedIndex].value !== "") {
        select.classList.remove("error-input");
      }
    });
  });
});

//  Validation for Pincode, Mobile Number, Email, Emergency contact number, Aadhaar number, Pan number
document.addEventListener("DOMContentLoaded", function (e) {
  const pincode = document.getElementById("pincode");
  const phoneNumber = document.getElementById("number");
  const email = document.getElementById("email");
  const emgContantNum = document.getElementById("emergency_contact_number");
  const aadhaarNo = document.getElementById("aadhaar_no");
  const panNo = document.getElementById("pan_no");
  const pinRegex = /^[1-9]\d{5}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const indianMobileNumberRegex = /^[6-9]\d{9}$/;
  const aadhaarNoRegex = /^[2-9][0-9]{11}$/;
  const panNoRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  // Validate pincode
  pincode.addEventListener("input", function () {
    const pinError = document.getElementById("pinError");
    if (pincode.value === "") {
      pinError.textContent = "";
      pinError.style.display = "none";
    } else if (!pinRegex.test(pincode.value)) {
      pinError.textContent = "Pincode is 6 digits and cannot start with 0";
      pinError.style.display = "block";
    } else {
      pinError.textContent = "";
      pinError.style.display = "none";
    }
  });

  // validate phone number
  phoneNumber.addEventListener("input", function () {
    const phoneNumError = document.getElementById("phoneNumError");
    if (phoneNumber.value === "") {
      phoneNumError.textContent = "";
      phoneNumError.style.display = "none";
    } else if (!indianMobileNumberRegex.test(phoneNumber.value)) {
      phoneNumError.textContent = "Enter a valid indian mobile number";
      phoneNumError.style.display = "block";
    } else {
      phoneNumError.textContent = "";
      phoneNumError.style.display = "none";
    }
  });

  // validate email
  email.addEventListener("input", function () {
    const emailError = document.getElementById("emailError");
    if (email.value === "") {
      emailError.textContent = "";
      emailError.style.display = "none";
    } else if (!emailRegex.test(email.value)) {
      emailError.textContent = "Enter a valid email";
      emailError.style.display = "block";
    } else {
      emailError.textContent = "";
      emailError.style.display = "none";
    }
  });

  // validate emergency contact number
  emgContantNum.addEventListener("input", function () {
    const emgContactNumError = document.getElementById("emgContactNumError");
    if (emgContantNum.value === "") {
      emgContactNumError.textContent = "";
      emgContactNumError.style.display = "none";
    } else if (!indianMobileNumberRegex.test(emgContantNum.value)) {
      emgContactNumError.textContent = "Enter a valid indian mobile number";
      emgContactNumError.style.display = "block";
    } else {
      emgContactNumError.textContent = "";
      emgContactNumError.style.display = "none";
    }
  });

  // validate aadhaar number
  aadhaarNo.addEventListener("input", function () {
    const adhaarNoError = document.getElementById("adhaarNoError");
    if (aadhaarNo.value === "") {
      adhaarNoError.textContent = "";
      adhaarNoError.style.display = "none";
    } else if (!aadhaarNoRegex.test(aadhaarNo.value)) {
      adhaarNoError.textContent = "Enter a valid aadhaar number";
      adhaarNoError.style.display = "block";
    } else {
      adhaarNoError.textContent = "";
      adhaarNoError.style.display = "none";
    }
  });

  // validate pan number
  panNo.addEventListener("input", function () {
    const panNoError = document.getElementById("panNoError");
    if (panNo.value === "") {
      panNoError.textContent = "";
      panNoError.style.display = "none";
    } else if (!panNoRegex.test(panNo.value)) {
      panNoError.textContent = "Enter a valid pan number";
      panNoError.style.display = "block";
    } else {
      panNoError.textContent = "";
      panNoError.style.display = "none";
    }
  });
});

// Function to check if the file name matches any enum value (case-insensitive)
function checkDocFileName(fileInputId, fileInput, fileErr) {
  const fullPath = fileInput.value;
  const parts = fullPath.split("\\"); 
  const fileNameWithExtension = parts[parts.length - 1];
  const fileName = fileNameWithExtension.split(".")[0];
  if (
    Object.values(DocName).some(
      (enumValue) => enumValue.toLowerCase() === fileName.toLowerCase()
    )
  ) {
    fileErr.textContent = "";
  } else {
    const valueMapping = {
      "experience_letter": 'experience_letter" or "relieving_letter',
      "salary_slip": 'salary_slip" or "appointment_letter" or "increment_letter',
      "birth_certificate": 'birth_certificate" or "leaving_certificate" or "passport',
      "ration_card": 'ration_card" or "passport" or "lease_agreement',
      "bank_passbook": 'bank_passbook" or "cancelled_cheque',
    };
    let matchedValue = null;
    for (const key in DocName) {
      if (DocName[key] === fileInputId.toLowerCase()) {
        matchedValue = DocName[key];
        console.log(matchedValue);
        if(Object.keys(valueMapping).includes(matchedValue) ) {
          matchedValue = valueMapping[matchedValue];
        }
        break; 
      }
    }
    fileErr.textContent = `Please enter the file name as: " ${matchedValue} "`;
    fileErr.style.color = "red";
    this.value = "";
  }
}

// Function to check the file type of the documents.
function checkDocFileType(fileInputId, fileErrId) {
  const fileInput = document.getElementById(fileInputId);
  const fileErr = document.getElementById(fileErrId);
  const allowedFileTypes = [".pdf"];

  fileInput.addEventListener("change", function () {
    const selectedFileType = this.value
      .substring(this.value.lastIndexOf("."))
      .toLowerCase();
    if (allowedFileTypes.includes(selectedFileType)) {
      fileErr.textContent = "";
      checkDocFileName(fileInputId, fileInput, fileErr);
    } else {
      fileErr.textContent =
        "File type is not allowed. Please select a pdf file";
      fileErr.style.color = "red";
      this.value = ""; // Clear the input value to prevent uploading the disallowed file.
    }
  });

  fileInput.addEventListener("input", function () {
    if (this.value === "") {
      fileErr.textContent = "";
    }
  });
}

// Validation for uploaded file types
document.addEventListener("DOMContentLoaded", function () {
  const fieldErrorPairs = [
    { fieldId: "photo", errorId: "photoErr" },
    { fieldId: "cv", errorId: "cvErr" },
    { fieldId: "aadhaar_card", errorId: "aadhaarErr" },
    { fieldId: "pan_card", errorId: "panErr" },
    { fieldId: "experience_letter", errorId: "expErr" },
    { fieldId: "salary_slip", errorId: "salaryErr" },
    { fieldId: "graduation_certificate", errorId: "graduationErr" },
    { fieldId: "post_graduation_certificate", errorId: "postGradErr" },
    { fieldId: "diploma_certificate", errorId: "diplomaErr" },
    { fieldId: "birth_certificate", errorId: "ageErr" },
    { fieldId: "ration_card", errorId: "residenceErr" },
    { fieldId: "bank_passbook", errorId: "bankErr" },
  ];

  fieldErrorPairs.forEach((pair) => {
    checkDocFileType(pair.fieldId, pair.errorId);
  });
});
