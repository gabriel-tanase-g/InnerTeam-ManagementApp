const newProjectButton = document.getElementById('new-project');
        const formDialog = document.getElementById('formDialog');
        const closeDialogButton = document.getElementById('closeDialog');
        const addMemberButton = document.getElementById('addMember');
        const teamForm = document.getElementById('teamForm');
        const projectShelf = document.getElementById('projectShelf');

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