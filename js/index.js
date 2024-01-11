// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to form and elements for search input, user list, and repos list
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get and trim the search term from the input
        const searchTerm = searchInput.value.trim();

        // Check if the search term is not empty
        if (searchTerm !== '') {
            // Call the function to search for users based on the input
            searchUsers(searchTerm);
        }
    });

    // Function to search for GitHub users
    function searchUsers(username) {
        // Construct the URL for searching GitHub users
        const userUrl = `https://api.github.com/search/users?q=${username}`;

        // Create headers with the custom 'Accept' header
        const headers = new Headers({
            'Accept': 'application/vnd.github.v3+json'
        });

        // Fetch data from the GitHub API with the custom header
        fetch(userUrl, {
            method: 'GET',
            headers: headers, // Include the custom header in the request
        })
            .then(response => response.json())
            .then(data => displayUsers(data.items))
            .catch(error => console.error('Error searching users:', error));
    }

    // Function to display GitHub users
    function displayUsers(users) {
        // Clear previous results in user and repos lists
        userList.innerHTML = '';
        reposList.innerHTML = '';

        // Display user information
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.login;

            // Add click event listener to search for repos when a user is clicked
            listItem.addEventListener('click', () => searchRepos(user.login));

            // Append user to the user list
            userList.appendChild(listItem);
        });
    }

    // Function to search for GitHub repos of a user
    function searchRepos(username) {
        // Construct the URL for fetching GitHub repos of a user
        const repoUrl = `https://api.github.com/users/${username}/repos`;

        // Create headers with the custom 'Accept' header
        const headers = new Headers({
            'Accept': 'application/vnd.github.v3+json'
        });

        // Fetch data from the GitHub API with the custom header
        fetch(repoUrl, {
            method: 'GET',
            headers: headers, // Include the custom header in the request
        })
            .then(response => response.json())
            .then(data => displayRepos(data))
            .catch(error => console.error('Error fetching user repos:', error));
    }

    // Function to display GitHub repos
    function displayRepos(repos) {
        // Clear previous results in the repos list
        reposList.innerHTML = '';

        // Display repo information
        repos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.textContent = repo.name;

            // Append repo to the repos list
            reposList.appendChild(listItem);
        });
    }
});
