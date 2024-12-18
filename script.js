const newProjectButton = document.getElementById('new-project');
        const formDialog = document.getElementById('formDialog');
        const closeDialogButton = document.getElementById('closeDialog');
        const addMemberButton = document.getElementById('addMember');
        const teamForm = document.getElementById('teamForm');
        const projectShelf = document.getElementById('projectShelf');

<<<<<<< HEAD
const memberDialog = document.getElementById('memberDialog');
const closeMemberDialogButton = document.getElementById('closeMemberDialog');
const addMemberButton = document.getElementById('addMember');
const emojiPicker = document.getElementById('emojiPicker');
const emojiInput = document.getElementById('memberEmoji');

const memberNameSelect = document.getElementById('memberName');
const customNameInput = document.getElementById('customName');

// Store projects and state
const projects = [];
let currentProject = null;
let editingMemberIndex = -1;

// Open dialog for creating a new project
newProjectButton.addEventListener('click', () => {
    formDialog.showModal();
});

// Close project dialog
closeProjectDialogButton.addEventListener('click', () => {
    formDialog.close();
});

// Handle project form submission
projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;

    if (projectName) {
        currentProject = { name: projectName, team: [] };
        projects.push(currentProject);
        displayProjects();
        formDialog.close();
    }
});

// Open member dialog to add or edit a member
function openMemberDialogForProject(project, index = -1) {
    currentProject = project;  // Set current project to add/edit member
    editingMemberIndex = index;  // Store the member's index if editing

    if (index >= 0) {
        // If editing, pre-fill the form with member details
        const member = project.team[index];
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberRole').value = member.role;
        emojiInput.value = member.emoji;
        highlightSelectedEmoji(member.emoji);
    } else {
        // Clear the form for adding a new member
        document.getElementById('memberName').value = '';
        document.getElementById('memberRole').value = '';
        emojiInput.value = '';
    }

    memberDialog.showModal();
}

// Close member dialog
closeMemberDialogButton.addEventListener('click', () => {
    memberDialog.close();
});

// Add or update a team member for the current project
addMemberButton.addEventListener('click', () => {
    let memberName = memberNameSelect.value;
    if (memberName === 'Custom') {
        memberName = customNameInput.value;  // Get the custom name if selected
    }

    const memberRole = document.getElementById('memberRole').value;
    const memberEmoji = emojiInput.value;

    if (memberName && memberRole && currentProject) {
        if (editingMemberIndex >= 0) {
            // Update the existing member
            currentProject.team[editingMemberIndex] = { name: memberName, role: memberRole, emoji: memberEmoji };
            editingMemberIndex = -1; // Reset editing mode
        } else {
            // Add a new member
            currentProject.team.push({ name: memberName, role: memberRole, emoji: memberEmoji });
        }

        // Reset the member form
        document.getElementById('memberName').value = '';
        document.getElementById('memberRole').value = '';
        displayProjects();  // Update the displayed project with the new member
    }

    memberDialog.close();
});

// Display all projects and their respective team members
function displayProjects() {
    projectShelf.innerHTML = '';  // Clear existing projects

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.name;
        projectCard.appendChild(projectTitle);

        const addTeamMemberButton = document.createElement('button');
        addTeamMemberButton.textContent = 'Add Team Member';
        addTeamMemberButton.classList.add('add');
        addTeamMemberButton.addEventListener('click', () => openMemberDialogForProject(project));
        projectCard.appendChild(addTeamMemberButton);

        const teamTreeContainer = document.createElement('div');
        teamTreeContainer.classList.add('tree');
        const branchContainer = document.createElement('div');
        branchContainer.classList.add('branch');

        project.team.forEach((member, memberIndex) => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('team-member');
            memberDiv.innerHTML = `
                <span>${member.emoji}</span>
                <strong>${member.name}</strong>
                <p>Voice: ${member.role}</p>
            `;

            // Edit and Delete buttons
            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => openMemberDialogForProject(project, memberIndex));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('close');
            deleteButton.addEventListener('click', () => {
                project.team.splice(memberIndex, 1);
                displayProjects();  // Re-render projects after deletion
            });

            memberDiv.appendChild(editButton);
            memberDiv.appendChild(deleteButton);
            branchContainer.appendChild(memberDiv);
        });

        // Append the team members' branch to the tree
        if (project.team.length > 0) {
            teamTreeContainer.appendChild(branchContainer);
        }

        projectCard.appendChild(teamTreeContainer);
        projectShelf.appendChild(projectCard);
    });
}

// Emoji picker logic
emojiPicker.addEventListener('click', (event) => {
    const selectedEmoji = event.target.textContent;
    if (selectedEmoji) {
        emojiInput.value = selectedEmoji;  // Set emoji input to selected emoji
        highlightSelectedEmoji(selectedEmoji);  // Highlight selected emoji
    }
});

// Highlight the selected emoji in the picker
function highlightSelectedEmoji(selectedEmoji) {
    const emojiSpans = emojiPicker.querySelectorAll('span');
    emojiSpans.forEach(span => {
        span.classList.remove('selected');
    });

    const selectedSpan = Array.from(emojiSpans).find(span => span.textContent === selectedEmoji);
    if (selectedSpan) {
        selectedSpan.classList.add('selected');
    }
}

// Toggle the visibility of the custom name input
memberNameSelect.addEventListener('change', () => {
    if (memberNameSelect.value === 'Custom') {
        customNameInput.style.display = 'block';  // Show input for custom name
    } else {
        customNameInput.style.display = 'none';  // Hide input for custom name
    }
});
=======
        const projects = [];

        let currentProject = null;

        // Open dialog for a new project
        newProjectButton.addEventListener('click', () => {
            currentProject = { name: '', team: [] };
            teamForm.reset();
            formDialog.showModal();
        });

        // Close dialog
        closeDialogButton.addEventListener('click', () => {
            formDialog.close();
        });

        // Add a team member to the current project
        addMemberButton.addEventListener('click', () => {
            const memberName = document.getElementById('memberName').value;
            const memberRole = document.getElementById('memberRole').value;
            const memberAvailability = document.getElementById('memberAvailability').checked;

            if (memberName && memberRole) {
                currentProject.team.push({
                    name: memberName,
                    role: memberRole,
                    available: memberAvailability
                });

                document.getElementById('memberName').value = '';
                document.getElementById('memberRole').value = '';
                document.getElementById('memberAvailability').checked = false;
            }
        });

        // Save the project
        teamForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const projectName = document.getElementById('projectName').value;

            if (projectName) {
                currentProject.name = projectName;
                projects.push(currentProject);
                displayProjects();
                formDialog.close();
            }
        });

        // Display all projects and their team members
        function displayProjects() {
            projectShelf.innerHTML = '';

            projects.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const projectTitle = document.createElement('h3');
                projectTitle.textContent = project.name;
                projectCard.appendChild(projectTitle);

                const teamContainer = document.createElement('div');
                project.team.forEach(member => {
                    const memberDiv = document.createElement('div');
                    memberDiv.classList.add('team-member');

                    memberDiv.innerHTML = `
                        <strong>${member.name}</strong>
                        <p>Role: ${member.role}</p>
                        <p>Available: ${member.available ? 'Yes' : 'No'}</p>
                    `;

                    teamContainer.appendChild(memberDiv);
                });

                projectCard.appendChild(teamContainer);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete Project';
                deleteButton.classList.add('close');
                deleteButton.addEventListener('click', () => {
                    projects.splice(index, 1);
                    displayProjects();
                });

                projectCard.appendChild(deleteButton);
                projectShelf.appendChild(projectCard);
            });
        }
>>>>>>> parent of 4f8819c (Update a lot)
