const apiUrl = "http://3.138.156.10:3000"; // Replace with your actual EC2 IP and port

// Fetch and display the list of professors
async function loadProfessorList() {
    try {
        const response = await fetch(`${apiUrl}/professors`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const professors = await response.json();
        const professorSelect = document.getElementById("professorSelect");

        // Populate dropdown with professor names
        professors.forEach(prof => {
            const option = document.createElement("option");
            option.value = prof._id;
            option.textContent = prof.name;
            professorSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading professor list:", error);
    }
}

// Fetch and display selected professor's data based on selected ID
async function loadProfessorData() {
    const professorId = document.getElementById("professorSelect").value;
    if (!professorId) return;

    try {
        const response = await fetch(`${apiUrl}/professor/${professorId}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        const professorContainer = document.getElementById("professor-data");

        // Display professor details and ratings
        professorContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Department:</strong> ${data.department}</p>
            <h3>Reviews:</h3>
            <ul>
                ${data.reviews.map(review => `
                    <li>
                        <strong>Rating:</strong> ${review.rating} <br>
                        <strong>Comment:</strong> ${review.comment}
                    </li>
                `).join('')}
            </ul>
        `;
    } catch (error) {
        console.error("Error fetching professor data:", error);
        document.getElementById("professor-data").innerHTML = `<p>Failed to load professor data.</p>`;
    }
}

// Load the professor list on page load
loadProfessorList();
