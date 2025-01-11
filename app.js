$(document).ready(function() {
    // Function to add a new task
    $('#add-task').click(function() {
        var taskText = $('#new-task').val();
        if (taskText.trim() !== '') {
            $.ajax({
                url: 'addTask.php', // Ensure this path is correct
                method: 'POST',
                data: { task: taskText },
                dataType: 'json',
                success: function(response) {
                    if (response.id) {
                        var taskId = response.id;
                        var taskHtml = `<li data-id="${taskId}">
                                            ${taskText}
                                            <button class="delete-task">Delete</button>
                                            <button class="complete-task">Complete</button>
                                        </li>`;
                        $('#task-list').append(taskHtml);
                        $('#new-task').val('');
                    } else {
                        alert('Error adding task: ' + response.error);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error adding task:', error);
                }
            });
        }
    });

    // Function to delete a task
    $(document).on('click', '.delete-task', function() {
        var taskId = $(this).parent().data('id');
        var taskItem = $(this).parent();
        $.ajax({
            url: 'deleteTask.php', // Ensure this path is correct
            method: 'POST',
            data: { id: taskId },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    taskItem.remove();
                } else {
                    alert('Error deleting task: ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error deleting task:', error);
            }
        });
    });

    // Function to mark a task as completed
    $(document).on('click', '.complete-task', function() {
        var taskId = $(this).parent().data('id');
        var taskItem = $(this).parent();
        $.ajax({
            url: 'completeTask.php', // Ensure this path is correct
            method: 'POST',
            data: { id: taskId },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    taskItem.addClass('completed');
                } else {
                    alert('Error completing task: ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error completing task:', error);
            }
        });
    });

    // Function to load tasks from the database
    function loadTasks() {
        $.ajax({
            url: 'fetchTasks.php', // Ensure this path is correct
            method: 'GET',
            dataType: 'json',
            success: function(tasks) {
                tasks.forEach(function(task) {
                    var taskHtml = `<li data-id="${task.id}" class="${task.completed === 'YES' ? 'completed' : ''}">
                                        ${task.task}
                                        <button class="delete-task">Delete</button>
                                        <button class="complete-task">Complete</button>
                                    </li>`;
                    $('#task-list').append(taskHtml);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error loading tasks:', error);
            }
        });
    }

    // Load tasks when the page loads
    loadTasks();
});
