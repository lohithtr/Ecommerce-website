document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const un = document.getElementById('username');
    const pass = document.getElementById('password');
    const cpass = document.getElementById('Cpassword');
    const num = document.getElementById('num');
    const mail = document.getElementById('mail');
    const dob = document.getElementById('dob');
    const gender = document.getElementsByName('gender');

    const unError = document.getElementById('usernameError');
    const passError = document.getElementById('passwordError');
    const cpassError = document.getElementById('CpasswordError');
    const mailError = document.getElementById('mailError');
    const genError = document.getElementById('genError');
    const dobError=document.getElementById('dobError');

    // Dynamically create numError span if not present
    let numError = document.getElementById('numError');
    if (!numError) {
        numError = document.createElement('span');
        numError.id = 'numError';
        num.parentNode.appendChild(numError);
    }

    // Function to style errors
    const showError = (element, message) => {
        element.textContent = message;
        element.style.color = 'red';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        unError.textContent = "";
        passError.textContent = "";
        cpassError.textContent = "";
        mailError.textContent = "";
        numError.textContent = "";
        genError.textContent = "";
        dobError.textContent = "";

        let isvalid = true;

        // Username validation
        const usernamevalue = un.value.trim();
        if (!usernamevalue) {
            showError(unError, "Username cannot be empty");
            un.classList.add('input-error');
            isvalid = false;
        } else if (usernamevalue.length < 3) {
            showError(unError, "Username must be at least 3 characters");
            un.classList.add('input-error');
            isvalid = false;
        } else if (usernamevalue.length > 15) {
            showError(unError, "Username cannot be more than 15 characters");
            un.classList.add('input-error');
            isvalid = false;
        } else if (!/^[a-zA-Z0-9]+$/.test(usernamevalue)) {
            showError(unError, "Username can only contain letters and numbers");
            un.classList.add('input-error');
            isvalid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(usernamevalue)) {
            showError(unError, "Username must include uppercase, lowercase, and a number");
            un.classList.add('input-error');
            isvalid = false;
        }

        // Password validation
        const passvalue = pass.value;
        if (passvalue.length < 6) {
            showError(passError, "Password must be at least 6 characters");
            pass.classList.add('input-error');
            isvalid = false;
        }

        // Confirm password validation
        if (cpass.value !== passvalue) {
            showError(cpassError, "Passwords do not match");
            cpass.classList.add('input-error');
            isvalid = false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(mail.value)) {
            showError(mailError, "Please enter a valid email address");
            mail.classList.add('input-error');
            isvalid = false;
        }

        // Date Validation
        if (!dob.value) {
            dobError.textContent = "Date of birth is required";
            dob.classList.add('input-error');
            isvalid = false;
          } else {
            dob.classList.remove('input-error');
            dobError.textContent = "";
          }

        // Phone number validation
        const phoneValue = num.value.trim();
        if (phoneValue.length < 10 || isNaN(phoneValue)) {
            showError(numError, "Enter a valid phone number");
            num.classList.add('input-error');
            isvalid = false;
        }

        // Gender validation
        let genderSelected = false;
        for (const radio of gender) {
            if (radio.checked) {
                genderSelected = true;
                break;
            }
        }
        if (!genderSelected) {
            showError(genError, "Please select your gender");
            isvalid = false;
        }

        if (isvalid) {
            const userData = {
              username: un.value.trim(),
              password: pass.value,  // Consider hashing in real applications
              email: mail.value.trim(),
              dob: dob.value,
              phone: num.value.trim(),
              gender: [...gender].find(radio => radio.checked)?.value
            };
          
            localStorage.setItem('signupData', JSON.stringify(userData));
          
            alert("Form submitted successfully and data saved to localStorage!");
          
            form.reset(); // Clear the form after submission

            // Redirect to the login page
            window.location.href = "login.html";
          }


    });
    
});
