const elements = {
    passwordOutput: document.getElementById('passwordOutput'),
    copyBtn: document.getElementById('copyBtn'),
    generateBtn: document.getElementById('generateBtn'),
    lengthSlider: document.getElementById('lengthSlider'),
    lengthValue: document.getElementById('lengthValue'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
    strengthBar: document.getElementById('strengthBar'),
    strengthText: document.getElementById('strengthText'),
    notification: document.getElementById('notification')
};

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function init() {
    elements.generateBtn.addEventListener('click', generatePassword);
    elements.copyBtn.addEventListener('click', copyPassword);
    elements.lengthSlider.addEventListener('input', updateLengthDisplay);

    generatePassword();
}

function generatePassword() {
    let charset = '';

    if (elements.uppercase.checked) charset += charSets.uppercase;
    if (elements.lowercase.checked) charset += charSets.lowercase;
    if (elements.numbers.checked) charset += charSets.numbers;
    if (elements.symbols.checked) charset += charSets.symbols;

    if (charset === '') {
        elements.passwordOutput.value = 'Select at least one option';
        updateStrength(0);
        return;
    }

    const length = parseInt(elements.lengthSlider.value);
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    elements.passwordOutput.value = password;
    calculateStrength(password);
}

function calculateStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength += 1;

    updateStrength(strength);
}

function updateStrength(strength) {
    const maxStrength = 6;
    const percentage = (strength / maxStrength) * 100;

    elements.strengthBar.style.width = percentage + '%';

    if (strength <= 2) {
        elements.strengthBar.style.background = '#ef4444';
        elements.strengthText.textContent = 'Weak password';
        elements.strengthText.style.color = '#ef4444';
    } else if (strength <= 4) {
        elements.strengthBar.style.background = '#f59e0b';
        elements.strengthText.textContent = 'Medium password';
        elements.strengthText.style.color = '#f59e0b';
    } else {
        elements.strengthBar.style.background = '#10b981';
        elements.strengthText.textContent = 'Strong password';
        elements.strengthText.style.color = '#10b981';
    }
}

function updateLengthDisplay() {
    elements.lengthValue.textContent = elements.lengthSlider.value;
}

function copyPassword() {
    const password = elements.passwordOutput.value;

    if (!password || password === 'Select at least one option') return;

    navigator.clipboard.writeText(password).then(() => {
        showNotification();
    });
}

function showNotification() {
    elements.notification.classList.remove('hidden');

    setTimeout(() => {
        elements.notification.classList.add('hidden');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', init);
