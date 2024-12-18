const newProjectButton = document.getElementById('new-project');
const formDialog = document.getElementById('formDialog');
const closeProjectDialogButton = document.getElementById('closeProjectDialog');
const projectForm = document.getElementById('projectForm');
const projectShelf = document.getElementById('projectShelf');
const introMessage = document.getElementById('introMessage');  // Empty state message element

const memberDialog = document.getElementById('memberDialog');
const closeMemberDialogButton = document.getElementById('closeMemberDialog');
const addMemberButton = document.getElementById('addMember');
const teamForm = document.getElementById('teamForm');
const emojiPicker = document.getElementById('emojiPicker');
const emojiInput = document.getElementById('memberEmoji');

const projects = [];
let currentProject = null;
let editingMemberIndex = -1;

// Open dialog for a new project
newProjectButton.addEventListener('click', () => {
    formDialog.showModal();
});

// Close project dialog
closeProjectDialogButton.addEventListener('click', () => {
    formDialog.close();
});

// Save the project
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

// Open dialog to add or edit a team member for the specific project
function openMemberDialogForProject(project, index = -1) {
    currentProject = project; // Set current project to add/edit member
    editingMemberIndex = index; // Store the member's index if editing

    // If editing, pre-fill the form with member details
    if (index >= 0) {
        const member = project.team[index];
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberRole').value = member.role;
        emojiInput.value = member.emoji;
        highlightSelectedEmoji(member.emoji);
    }

    memberDialog.showModal();
}

// Close member dialog
closeMemberDialogButton.addEventListener('click', () => {
    memberDialog.close();
});

// Add a team member to the current project
addMemberButton.addEventListener('click', () => {
    const memberName = document.getElementById('memberName').value;
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

        document.getElementById('memberName').value = '';
        document.getElementById('memberRole').value = '';
        displayProjects();  // Update the displayed project with new member
    }

    memberDialog.close();
});

function displayProjects() {
    // Show or hide the introMessage based on the number of projects
    if (projects.length === 0) {
        introMessage.style.display = 'block'; // Show intro message if no projects
    } else {
        introMessage.style.display = 'none';  // Hide intro message if there are projects
    }

    projectShelf.innerHTML = '';

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

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.textContent = 'Delete Project';
        deleteProjectButton.classList.add('close', 'delete-project-btn'); 
        deleteProjectButton.addEventListener('click', () => {
            // Remove project from the array
            projects.splice(index, 1);
            displayProjects();  // Update the UI after deletion
        });
        projectCard.appendChild(deleteProjectButton);  // Add the delete button to the project card

        const teamTreeContainer = document.createElement('div');
        teamTreeContainer.classList.add('tree');

        // Generate tree nodes for team members
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

            // Edit and Delete buttons for members
            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => openMemberDialogForProject(project, memberIndex));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('close');
            deleteButton.addEventListener('click', () => {
                project.team.splice(memberIndex, 1);
                displayProjects(); // Re-render after deletion
            });

            memberDiv.appendChild(editButton);
            memberDiv.appendChild(deleteButton);
            branchContainer.appendChild(memberDiv);
        });

        // Add the branch container to the tree
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
        emojiInput.value = selectedEmoji;  // Set the emoji input to the selected emoji
        highlightSelectedEmoji(selectedEmoji);  // Highlight the selected emoji
    }
});

function highlightSelectedEmoji(selectedEmoji) {
    // Deselect any previously selected emoji
    const emojiSpans = emojiPicker.querySelectorAll('span');
    emojiSpans.forEach(span => {
        span.classList.remove('selected');
    });
    
    // Highlight the newly selected emoji
    const selectedSpan = Array.from(emojiSpans).find(span => span.textContent === selectedEmoji);
    if (selectedSpan) {
        selectedSpan.classList.add('selected');
    }
}

const memberNameSelect = document.getElementById('memberName');
const customNameInput = document.getElementById('customName');

// Toggle the visibility of the custom name input
memberNameSelect.addEventListener('change', () => {
    if (memberNameSelect.value === 'Custom') {
        customNameInput.style.display = 'block';  // Show input
    } else {
        customNameInput.style.display = 'none';   // Hide input
    }
});

addMemberButton.addEventListener('click', () => {
    let memberName = memberNameSelect.value;
    if (memberName === 'Custom') {
        memberName = customNameInput.value;  // Get the custom name
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

        document.getElementById('memberName').value = '';
        document.getElementById('memberRole').value = '';
        displayProjects();  // Update the displayed project with new member
    }

    memberDialog.close();
});
