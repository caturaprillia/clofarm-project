from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.auth.endpoints import auth_bp
from api.agrotourism.endpoints import agrotourism_bp
from api.articles.endpoints import articles_bp
from api.tutorials.endpoints import tutorials_bp
from api.mentorship.endpoints import mentorship_bp
from api.mentorship_regist.endpoints import mentorship_regist_bp
from api.community_posts.endpoints import community_posts_bp
from api.community_likes.endpoints import community_likes_bp
from api.community_comments.endpoints import community_comments_bp
from api.agrotourism_reviews.endpoints import agrotourism_reviews_bp

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Ganti dengan secret key yang aman
CORS(app)  # mengizinkan semua origin
JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(agrotourism_bp, url_prefix='/')
app.register_blueprint(articles_bp, url_prefix='/')
app.register_blueprint(tutorials_bp, url_prefix='/')
app.register_blueprint(mentorship_bp, url_prefix='/')
app.register_blueprint(mentorship_regist_bp, url_prefix='/')
app.register_blueprint(community_posts_bp, url_prefix='/')
app.register_blueprint(community_likes_bp, url_prefix='/')
app.register_blueprint(community_comments_bp, url_prefix='/')
app.register_blueprint(agrotourism_reviews_bp, url_prefix='/')

@app.route('/')
def hello():
    return jsonify({'message': 'Hello from Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
