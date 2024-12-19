document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const newProjectButton = document.getElementById('new-project');
    const formDialog = document.getElementById('formDialog');
    const closeProjectDialogButton = document.getElementById('closeProjectDialog');
    const projectForm = document.getElementById('projectForm');
    const projectShelf = document.getElementById('projectShelf');
    const introMessage = document.getElementById('introMessage'); // Empty state message element

    const memberDialog = document.getElementById('memberDialog');
    const closeMemberDialogButton = document.getElementById('closeMemberDialog');
    const addMemberButton = document.getElementById('addMember');
    const teamForm = document.getElementById('teamForm');
    const emojiPicker = document.getElementById('emojiPicker');
    const emojiInput = document.getElementById('memberEmoji');
    const memberNameSelect = document.getElementById('memberName');
    const customNameInput = document.getElementById('customName');

    const projects = [];
    let currentProject = null;
    let editingMemberIndex = -1;

    // Open project dialog
    newProjectButton.addEventListener('click', () => {
        formDialog.showModal();
    });

    // Close project dialog
    closeProjectDialogButton.addEventListener('click', () => {
        formDialog.close();
    });

    // Save a new project
    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const projectName = document.getElementById('projectName').value.trim();

        if (projectName) {
            currentProject = { name: projectName, team: [] };
            projects.push(currentProject);
            displayProjects();
            formDialog.close();
            projectForm.reset(); // Reset the form for the next input
        }
    });

    // Open member dialog for adding/editing
    function openMemberDialogForProject(project, index = -1) {
        currentProject = project;
        editingMemberIndex = index;

        // Pre-fill fields if editing a member
        if (index >= 0) {
            const member = project.team[index];
            document.getElementById('memberName').value = member.name;
            document.getElementById('memberRole').value = member.role;
            emojiInput.value = member.emoji;
            highlightSelectedEmoji(member.emoji);
        } else {
            teamForm.reset();
            emojiInput.value = '';
            highlightSelectedEmoji('');
        }

        memberDialog.showModal();
    }

    // Close member dialog
    closeMemberDialogButton.addEventListener('click', () => {
        memberDialog.close();
    });

    // Add or edit a team member
    addMemberButton.addEventListener('click', () => {
        let memberName = memberNameSelect.value;
        if (memberName === 'Custom') {
            memberName = customNameInput.value.trim(); // Use the custom name if selected
        }
        const memberRole = document.getElementById('memberRole').value.trim();
        const memberEmoji = emojiInput.value.trim();

        if (memberName && memberRole && currentProject) {
            if (editingMemberIndex >= 0) {
                // Edit an existing member
                currentProject.team[editingMemberIndex] = { name: memberName, role: memberRole, emoji: memberEmoji };
                editingMemberIndex = -1; // Reset editing state
            } else {
                // Add a new member
                currentProject.team.push({ name: memberName, role: memberRole, emoji: memberEmoji });
            }

            displayProjects(); // Refresh the UI
            memberDialog.close();
        }
    });

    // Display all projects
    function displayProjects() {
        introMessage.style.display = projects.length === 0 ? 'block' : 'none'; // Toggle intro message
        projectShelf.innerHTML = '';

        projects.forEach((project, projectIndex) => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.name;
            projectCard.appendChild(projectTitle);

            const addMemberButton = document.createElement('button');
            addMemberButton.textContent = 'Add Team Member';
            addMemberButton.classList.add('add');
            addMemberButton.addEventListener('click', () => openMemberDialogForProject(project));
            projectCard.appendChild(addMemberButton);

            const deleteProjectButton = document.createElement('button');
            deleteProjectButton.textContent = 'Delete Project';
            deleteProjectButton.classList.add('close', 'delete-project-btn');
            deleteProjectButton.addEventListener('click', () => {
                projects.splice(projectIndex, 1);
                displayProjects();
            });
            projectCard.appendChild(deleteProjectButton);

            const teamContainer = document.createElement('div');
            teamContainer.classList.add('team-container');

            project.team.forEach((member, memberIndex) => {
                const memberDiv = document.createElement('div');
                memberDiv.classList.add('team-member');
                memberDiv.innerHTML = `
                    <span>${member.emoji}</span>
                    <strong>${member.name}</strong>
                    <p>${member.role}</p>
                `;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit-btn');
                editButton.addEventListener('click', () => openMemberDialogForProject(project, memberIndex));
                memberDiv.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('close');
                deleteButton.addEventListener('click', () => {
                    project.team.splice(memberIndex, 1);
                    displayProjects();
                });
                memberDiv.appendChild(deleteButton);

                teamContainer.appendChild(memberDiv);
            });

            projectCard.appendChild(teamContainer);
            projectShelf.appendChild(projectCard);
        });
    }

    // Emoji picker functionality
    emojiPicker.addEventListener('click', (event) => {
        const selectedEmoji = event.target.textContent;
        if (selectedEmoji) {
            emojiInput.value = selectedEmoji;
            highlightSelectedEmoji(selectedEmoji);
        }
    });

    function highlightSelectedEmoji(selectedEmoji) {
        const emojiSpans = emojiPicker.querySelectorAll('span');
        emojiSpans.forEach(span => span.classList.remove('selected'));
        const selectedSpan = Array.from(emojiSpans).find(span => span.textContent === selectedEmoji);
        if (selectedSpan) selectedSpan.classList.add('selected');
    }

    // Toggle custom name input visibility
    memberNameSelect.addEventListener('change', () => {
        customNameInput.style.display = memberNameSelect.value === 'Custom' ? 'block' : 'none';
    });
});
