const feedContainer = document.getElementById("feedContainer");
const darkModeToggle = document.getElementById("darkModeToggle");

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Fetch posts from server
async function fetchPosts() {
    const response = await fetch("http://127.0.0.1:5000/getPosts");
    const posts = await response.json();
    renderFeed(posts);
}

// Render posts in feed
function renderFeed(posts) {
    feedContainer.innerHTML = "";
    posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.innerHTML = `
            <div class="post-header">
                <img class="avatar" src="${generateAvatar(post.username)}" alt="Avatar">
                <div>
                    <span class="username">${post.username}</span>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-footer">
                <button onclick="addLike()">❤️ Like</button>
                <button onclick="addComment(${post.postId})">💬 Comment</button>
                <button onclick="sharePost(${post.postId})">🔗 Share</button>
            </div>
            <div class="comments" id="comments-${post.postId}"></div>
        `;
        feedContainer.appendChild(postCard);
    });
}

// Generate avatar URL
function generateAvatar(username) {
    const hash = username.charCodeAt(0) % 10;
    return `https://i.pravatar.cc/40?u=${hash}`;
}

// Add a like
function addLike() {
    alert("Post liked!");
}

// Add a comment
function addComment(postId) {
    const comment = prompt("Enter your comment:");
    if (comment) {
        const commentsDiv = document.getElementById(`comments-${postId}`);
        const commentElement = document.createElement("div");
        commentElement.textContent = comment;
        commentsDiv.appendChild(commentElement);
    }
}

// Share a post
function sharePost(postId) {
    const link = `${window.location.origin}/post/${postId}`;
    alert(`Share this link: ${link}`);
}

// Post form submission
document.getElementById("createPost").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const content = document.getElementById("content").value;

    if (!username || !content) {
        alert("Please fill in all fields!");
        return;
    }

    await fetch("http://127.0.0.1:5000/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, content }),
    });

    fetchPosts();
});

// Initial fetch of posts
fetchPosts();
