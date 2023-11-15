document.addEventListener('DOMContentLoaded', function () {
    fetchUserData();
});

function fetchUserData() {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                displayUserData(data);
            } else {
                console.error('Error fetching data:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', 'http://localhost:5000/api/users', true); // Replace with your actual API endpoint
    xhr.send();
}

function displayUserData(users) {
    const table = document.getElementById('userTable');
    const tbody = document.createElement('tbody');

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <a href="#" class="button edit-btn" onclick="openEditModal('editModal', ${user.id})">Edit</a>
                <a href="#" class="button delete-btn" onclick="openModal('deleteModal')">Delete</a>
            </td>
        `;

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
}

function openEditModal(modalId, userId) {
    // Fetch user information from the server based on the userId
    // and populate the form fields in the edit modal
    document.getElementById('editUsername').value = 'user'; // Replace with actual data
    document.getElementById('editEmail').value = 'user@example.com'; // Replace with actual data
    document.getElementById('editRole').value = 'User'; // Replace with actual data

    openModal(modalId);
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modals if the user clicks outside the modal
window.onclick = function(event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
};

function saveChanges() {
    // Add logic to save changes to the server
    closeModal('editModal');
}

function deleteUser() {
    // Add logic to delete user from the server
    closeModal('deleteModal');
}

