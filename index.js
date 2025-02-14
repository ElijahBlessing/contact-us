document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const consent = document.getElementById("consent");
    const toast = document.querySelector(".toast");
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const errors = document.querySelectorAll(".error");

    function showError(input, errorClass) {
        input.nextElementSibling.classList.remove("hidden");
        input.nextElementSibling.classList.add(errorClass);
    }

    function hideError(input) {
        input.nextElementSibling.classList.add("hidden");
    }

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function isRadioChecked() {
        return [...radioButtons].some(radio => radio.checked);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;

        // Reset error messages
        errors.forEach(error => error.classList.add("hidden"));

        if (!firstName.value.trim()) {
            showError(firstName, "empty");
            valid = false;
        } else {
            hideError(firstName);
        }

        if (!lastName.value.trim()) {
            showError(lastName, "empty");
            valid = false;
        } else {
            hideError(lastName);
        }

        if (!email.value.trim()) {
            document.querySelector(".error.empty").classList.remove("hidden");
            valid = false;
        } else if (!validateEmail(email.value)) {
            document.querySelector(".error.valid").classList.remove("hidden");
            valid = false;
        }

        if (!isRadioChecked()) {
            document.querySelector(".form-group.radio .error").classList.remove("hidden");
            valid = false;
        }

        if (!message.value.trim()) {
            showError(message, "empty");
            valid = false;
        } else {
            hideError(message);
        }

        if (!consent.checked) {
            document.querySelector(".checkbox .error").classList.remove("hidden");
            valid = false;
        }

        if (valid) {
            // Show toast message
            toast.classList.remove("hidden");

            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.add("hidden");
            }, 3000);

            // Reset the form
            form.reset();
        }
    });
});