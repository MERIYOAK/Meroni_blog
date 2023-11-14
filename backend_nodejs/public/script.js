// JavaScript event listeners for your buttons (as you've previously implemented)
const addPostButton = document.getElementById("addPost");
addPostButton.addEventListener("click", function () {
    const postType = document.getElementById("postType").value;
    if (postType) {
        window.location.href = `http://localhost:3000/addPost?type=${postType}`;
    }
});

const allPostButton = document.getElementById("allPost");
allPostButton.addEventListener("click", function () {
    const postType = document.getElementById("typeOfPost").value;
    if (postType) {
        window.location.href = `http://localhost:3000/allPost?type=${postType}`;
    }
});