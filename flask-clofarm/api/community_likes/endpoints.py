from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

community_likes_bp = Blueprint('community_likes', __name__)

# List all likes (opsional, bisa difilter per post)
@community_likes_bp.route('/community_likes', methods=['GET'])
@jwt_required()
def list_community_likes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_community_likes')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get likes for a specific post
@community_likes_bp.route('/community_likes/post/<int:post_id>', methods=['GET'])
@jwt_required()
def get_likes_by_post(post_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_community_likes WHERE id_community_posts = %s', (post_id,))
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Like a post (create like)
@community_likes_bp.route('/community_likes', methods=['POST'])
@jwt_required()
def create_community_like():
    id_user = get_jwt_identity()
    id_community_posts = request.form.get('id_community_posts')
    if not id_community_posts:
        return jsonify({'msg': 'id_community_posts is required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    # Cek apakah user sudah like post ini
    cursor.execute(
        'SELECT * FROM tb_community_likes WHERE id_user = %s AND id_community_posts = %s',
        (id_user, id_community_posts)
    )
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'msg': 'Already liked'}), 409
    cursor.execute(
        'INSERT INTO tb_community_likes (id_user, id_community_posts) VALUES (%s, %s)',
        (id_user, id_community_posts)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Like added'}), 201

# Unlike a post (delete like)
@community_likes_bp.route('/community_likes', methods=['DELETE'])
@jwt_required()
def delete_community_like():
    id_user = get_jwt_identity()
    id_community_posts = request.form.get('id_community_posts')
    if not id_community_posts:
        return jsonify({'msg': 'id_community_posts is required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'DELETE FROM tb_community_likes WHERE id_user = %s AND id_community_posts = %s',
        (id_user, id_community_posts)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Like removed'}), 200
