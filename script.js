const form = document.getElementById('ebookForm');
const modal = document.getElementById('successModal');
const userNameSpan = document.getElementById('userName');
const userEmailSpan = document.getElementById('userEmail');
const anotherBtn = document.getElementById('anotherSubmit');
const submitBtn = document.getElementById('submitBtn');

// Replace with your real endpoint
const YOUR_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxf6upQuvIV8v12KOil2RUzIFrJ9WXh6WlGHNa1s_DOhEH_cw5qSA_EKZg4JkNo0tRgCQ/exec';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const jobRole = document.getElementById('jobRole').value.trim(); // NEW

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const data = new URLSearchParams();
    data.append('name', name);
    data.append('email', email);
    data.append('jobRole', jobRole); // NEW: sending job role

    fetch(YOUR_ENDPOINT, {
        method: 'POST',
        body: data
    })
    .then(() => {
        userNameSpan.textContent = name.split(' ')[0];
        userEmailSpan.textContent = email;
        modal.classList.add('show');
    })
    .catch(() => {
        alert('Submission failed. Please try again.');
    })
    .finally(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
});

// "Submit Another Form" button
anotherBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    form.reset();

});
