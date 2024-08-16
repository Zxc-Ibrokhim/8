const apiUrl = 'https://dummyjson.com/users';
const userIdInput = document.getElementById('userIdInput');
const ageLimitInput = document.getElementById('ageLimitInput');
const userCards = document.getElementById('userCards');

// Fetch user data from the API
async function fetchUserData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.users;
}

// Create user card HTML
function createUserCard(user) {
    return `
        <div class="card">
            <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
            <div class="card-content">
                <h3 class="card-title">${user.firstName} ${user.lastName}</h3>
                <p class="card-age">Age: ${user.age}</p>
            </div>
            <div>User ID: ${user.id}</div>
        </div>
    `;
}

// Render user cards based on filters
function renderUserCards(users) {
    const userId = parseInt(userIdInput.value);
    const ageLimit = parseInt(ageLimitInput.value);
    let filteredUsers = users;

    if (!isNaN(userId)) {
        filteredUsers = filteredUsers.filter(user => user.id === userId);
    }

    if (!isNaN(ageLimit)) {
        filteredUsers = filteredUsers.filter(user => user.age <= ageLimit);
    }

    userCards.innerHTML = filteredUsers.map(createUserCard).join('');
}

// Initialize
async function init() {
    const users = await fetchUserData();
    renderUserCards(users);

    userIdInput.addEventListener('input', () => renderUserCards(users));
    ageLimitInput.addEventListener('input', () => renderUserCards(users));
}

init();