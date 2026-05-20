// Mock authentication system
const mockUsers = {
    'admin@company.com': {
        id: '1',
        name: 'John Administrator',
        email: 'admin@company.com',
        role: 'admin'
    },
    'hr@company.com': {
        id: '2',
        name: 'Sarah HR Manager',
        email: 'hr@company.com',
        role: 'hr',
        department: 'Human Resources'
    },
    'employee@company.com': {
        id: '3',
        name: 'Mike Employee',
        email: 'employee@company.com',
        role: 'employee',
        employeeId: 'EMP001',
        department: 'Engineering'
    }
};

// Check if user is already logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        const userData = JSON.parse(user);
        redirectToDashboard(userData.role);
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    if (!email || !password || !role) {
        alert('Please fill in all fields');
        return;
    }
    
    // Mock authentication
    const user = mockUsers[email];
    if (user && user.role === role && password === 'password') {
        localStorage.setItem('currentUser', JSON.stringify(user));
        redirectToDashboard(role);
    } else {
        alert('Invalid credentials');
    }
}

// Redirect to appropriate dashboard
function redirectToDashboard(role) {
    switch (role) {
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'hr':
            window.location.href = 'hr-dashboard.html';
            break;
        case 'employee':
            window.location.href = 'employee-dashboard.html';
            break;
        default:
            window.location.href = 'login.html';
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Protect dashboard pages
function protectPage() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(user);
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if user has access to current page
    if (currentPage === 'admin-dashboard.html' && userData.role !== 'admin') {
        window.location.href = 'login.html';
    } else if (currentPage === 'hr-dashboard.html' && userData.role !== 'hr') {
        window.location.href = 'login.html';
    } else if (currentPage === 'employee-dashboard.html' && userData.role !== 'employee') {
        window.location.href = 'login.html';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'login.html' || currentPage === '' || currentPage === 'index.html') {
        checkAuth();
        
        // Add login form event listener
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    } else {
        protectPage();
    }
});

// Add some interactivity to dashboard buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for various buttons
    const buttons = document.querySelectorAll('button:not(.btn-logout)');
    buttons.forEach(button => {
        if (!button.onclick && !button.type) {
            button.addEventListener('click', function() {
                alert('This feature would be implemented in a real application!');
            });
        }
    });
});