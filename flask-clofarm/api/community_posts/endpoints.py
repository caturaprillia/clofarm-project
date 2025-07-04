from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

community_posts_bp = Blueprint('community_posts', __name__)

# List all community posts
@community_posts_bp.route('/community_posts', methods=['GET'])
@jwt_required()
def list_community_posts():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_community_posts')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get detail community post by id
@community_posts_bp.route('/community_posts/<int:id>', methods=['GET'])
@jwt_required()
def get_community_post(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_community_posts WHERE id_community_posts = %s', (id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    if not data:
        return jsonify({'msg': 'Not found'}), 404
    return jsonify(data), 200

# Create community post
@community_posts_bp.route('/community_posts', methods=['POST'])
@jwt_required()
def create_community_post():
    id_user = get_jwt_identity()
    content = request.form.get('content')
    images_url = request.form.get('images_url')
    if not content:
        return jsonify({'msg': 'Content is required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_community_posts (id_user, content, images_url, likes_count, comments_count) VALUES (%s, %s, %s, %s, %s)',
        (id_user, content, images_url, 0, 0)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Community post created'}), 201

# Update community post
@community_posts_bp.route('/community_posts/<int:id>', methods=['PUT'])
@jwt_required()
def update_community_post(id):
    content = request.form.get('content')
    images_url = request.form.get('images_url')
    conn = get_db_connection()
    cursor = conn.cursor()
    fields = []
    values = []
    if content:
        fields.append('content = %s')
        values.append(content)
    if images_url:
        fields.append('images_url = %s')
        values.append(images_url)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_community_posts SET {', '.join(fields)} WHERE id_community_posts = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Community post updated'}), 200

# Delete community post
@community_posts_bp.route('/community_posts/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_community_post(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_community_posts WHERE id_community_posts = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Community post deleted'}), 200
