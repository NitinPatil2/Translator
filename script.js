// Check if user is logged in
window.onload = function() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn && window.location.pathname.includes('converter.html')) {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('loggedIn'); // Clear login status
    window.location.href = 'index.html'; // Redirect to login page
}

// Login functionality
function login() {
    const username = document.getElementById('username').value; // Get username
    const password = document.getElementById('password').value; // Get password

    // Check for hardcoded credentials
    if (username === 'user' && password === 'password') {
        localStorage.setItem('loggedIn', 'true'); // Set login status
        window.location.href = 'converter.html'; // Redirect to converter page
    } else {
        alert('Invalid username or password!'); // Show error on failed login
    }
}

// Function to handle text translation (using an API)
async function translateText() {
    const inputText = document.getElementById('inputText').value.trim(); // Get the input text
    const language = document.getElementById('languageSelect').value; // Get selected language

    if (inputText === '') {
        alert('Please enter some text to translate.'); // Alert if input is empty
        return;
    }

    try {
        // Make an API call to a translation service
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=en|${language}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Assuming the translated text is in data.responseData.translatedText
        const translatedText = data.responseData.translatedText;

        // Display the translated text
        document.getElementById('translatedText').innerText = translatedText;

    } catch (error) {
        console.error('Error during translation:', error); // Log any errors
        document.getElementById('translatedText').innerText = 'Error occurred while translating text.'; // Show error message
    }
}
