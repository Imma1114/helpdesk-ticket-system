let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function saveTickets() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}

function renderTickets() {
    let ticketList = document.getElementById("ticketList");
    let openCount = 0;
    let resolvedCount = 0;
    ticketList.innerHTML = "";

    tickets.forEach((ticket, index) => {
        if (ticket.status === "Open") openCount++;
        else resolvedCount++;

        let div = document.createElement("div");
        div.classList.add("ticket", ticket.priority.toLowerCase());

        div.innerHTML = `
            <h3>${ticket.name}</h3>
            <p>${ticket.issue}</p>
            <p><strong>Priority:</strong> ${ticket.priority}</p>
            <p class="status"><strong>Status:</strong> ${ticket.status}</p>

            <div class="actions">
                <button onclick="toggleStatus(${index})">Resolve</button>
                <button onclick="deleteTicket(${index})">Delete</button>
            </div>
        `;

        ticketList.appendChild(div);
    });

    document.getElementById("openCount").innerText = openCount;
    document.getElementById("resolvedCount").innerText = resolvedCount;
}

function addTicket() {
    let name = document.getElementById("name").value;
    let issue = document.getElementById("issue").value;
    let priority = document.getElementById("priority").value;

    if (!name || !issue) {
        alert("Fill in all fields");
        return;
    }

    tickets.push({
        name,
        issue,
        priority,
        status: "Open"
    });

    saveTickets();
    renderTickets();

    document.getElementById("name").value = "";
    document.getElementById("issue").value = "";
}

function toggleStatus(index) {
    tickets[index].status = "Resolved";
    saveTickets();
    renderTickets();
}

function deleteTicket(index) {
    tickets.splice(index, 1);
    saveTickets();
    renderTickets();
}

renderTickets();
