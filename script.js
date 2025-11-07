// Replace with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1xSeU7_mLtH3iXv4lIJYakahV99CF4UUFc646nmxIxLgDEC4FxOqsT2DHSQjQagQaCA/exec';

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const jobRole = document.getElementById('jobRole').value.trim();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const data = new URLSearchParams();
    data.append('name', name);
    data.append('email', email);
    data.append('jobRole', jobRole);

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        body: data
    })
    .then(() => {
        const output = document.getElementById('output');
        output.innerHTML = `
            <h3 style="color: green;">Application Submitted!</h3>
            <p>Thank you, <strong>${name}</strong>!</p>
            <p>Your application for <strong>${jobRole}</strong> has been received.</p>
            <p>Check your email at <strong>${email}</strong> for confirmation and attached PDF.</p>
        `;
        output.classList.add('show');
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        const output = document.getElementById('output');
        output.innerHTML = `
            <h3 style="color: red;">Submission Failed</h3>
            <p>Please try again later.</p>
        `;
        output.classList.add('show');
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
});