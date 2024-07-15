document.addEventListener('DOMContentLoaded', function() {
    const categories = ['personal', 'work', 'shopping', 'coding', 'health', 'education', 'fitness', 'festival'];

    function updateTaskCounts() {
        let totalTasks = 0;

        categories.forEach(category => {
            const tasks = JSON.parse(localStorage.getItem(category)) || [];
            document.getElementById(`${category}-count`).textContent = `${tasks.length} Tasks`;
            totalTasks += tasks.length;
        });

        document.getElementById('total-tasks').textContent = `Today you have ${totalTasks} Tasks`;
    }

    // Function to initialize task counts on page load
    updateTaskCounts();

    // Function to periodically check for changes in localStorage and update task counts
    function checkLocalStorageChanges() {
        setInterval(function() {
            updateTaskCounts();
        }, 1000); // Adjust interval as needed (e.g., every second)
    }

    // Start checking for changes in localStorage
    checkLocalStorageChanges();

    window.openCategory = function(category) {
        localStorage.setItem('currentCategory', category);
        window.location.href = 'category.html';
    };

    window.updateTaskCounts = updateTaskCounts;
});
