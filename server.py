from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import json

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# This is a mock of the posts in a JSON file.
posts = []

# Route to create a new post
@app.route('/createPost', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = {
        "postId": len(posts) + 1,
        "username": data['username'],
        "content": data['content']
    }
    posts.append(new_post)
    return jsonify(new_post), 201

# Route to get all posts
@app.route('/getPosts', methods=['GET'])
def get_posts():
    return jsonify(posts), 200

# Route to save feed to JSON
@app.route('/saveFeed', methods=['GET'])
def save_feed():
    with open('feed.json', 'w') as file:
        json.dump(posts, file, indent=4)
    return jsonify({"message": "Feed saved successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
