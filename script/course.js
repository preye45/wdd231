const courses = [
    { name: "CSE 110", type: "CSE", completed: true },
    { name: "WDD 130", type: "WDD", completed: false },
    { name: "CSE 111", type: "CSE", completed: true },
    { name: "CSE 210", type: "CSE", completed: false },
    { name: "WDD 131", type: "WDD", completed: true },
    { name: "WDD 231", type: "WDD", completed: false }
];

function filterCourses(type) {
    let courseContainer = document.getElementById("courses");
    courseContainer.innerHTML = "";

    let filteredCourses = type === "all" ? courses : courses.filter(course => course.type === type);

    filteredCourses.forEach(course => {
        let courseDiv = document.createElement("div");
        courseDiv.textContent = course.name;
        courseDiv.classList.add(course.completed ? "completed" : "not-completed");
        courseContainer.appendChild(courseDiv);
    });
}

// Load all courses initially
filterCourses("all");
