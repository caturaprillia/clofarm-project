from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db import get_db_connection

articles_bp = Blueprint('articles', __name__)

# List all articles
@articles_bp.route('/articles', methods=['GET'])
@jwt_required()
def list_articles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_articles')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get detail article by id
@articles_bp.route('/articles/<int:id>', methods=['GET'])
@jwt_required()
def get_article(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_articles WHERE id_articles = %s', (id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    if not data:
        return jsonify({'msg': 'Not found'}), 404
    return jsonify(data), 200

# Create article
@articles_bp.route('/articles', methods=['POST'])
@jwt_required()
def create_article():
    title = request.form.get('title')
    description = request.form.get('description')
    article_url = request.form.get('article_url')
    image_url = request.form.get('image_url')
    if not all([title, description, article_url]):
        return jsonify({'msg': 'Missing required fields'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_articles (title, description, article_url, image_url) VALUES (%s, %s, %s, %s)',
        (title, description, article_url, image_url)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Article created'}), 201

# Update article
@articles_bp.route('/articles/<int:id>', methods=['PUT'])
@jwt_required()
def update_article(id):
    title = request.form.get('title')
    description = request.form.get('description')
    article_url = request.form.get('article_url')
    image_url = request.form.get('image_url')
    conn = get_db_connection()
    cursor = conn.cursor()
    fields = []
    values = []
    if title:
        fields.append('title = %s')
        values.append(title)
    if description:
        fields.append('description = %s')
        values.append(description)
    if article_url:
        fields.append('article_url = %s')
        values.append(article_url)
    if image_url:
        fields.append('image_url = %s')
        values.append(image_url)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_articles SET {', '.join(fields)} WHERE id_articles = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Article updated'}), 200

# Delete article
@articles_bp.route('/articles/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_article(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_articles WHERE id_articles = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Article deleted'}), 200

