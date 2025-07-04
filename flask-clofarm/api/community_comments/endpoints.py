from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

community_comments_bp = Blueprint('community_comments', __name__)

# List all comments
@community_comments_bp.route('/community_comments', methods=['GET'])
@jwt_required()
def list_community_comments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_community_comments')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get comments for a specific post
@community_comments_bp.route('/community_comments/post/<int:post_id>', methods=['GET'])
@jwt_required()
def get_comments_by_post(post_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_community_comments WHERE id_community_posts = %s', (post_id,))
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Create comment
@community_comments_bp.route('/community_comments', methods=['POST'])
@jwt_required()
def create_community_comment():
    id_user = get_jwt_identity()
    id_community_posts = request.form.get('id_community_posts')
    comment = request.form.get('comment')
    if not all([id_community_posts, comment]):
        return jsonify({'msg': 'id_community_posts and comment are required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_community_comments (id_user, id_community_posts, comment) VALUES (%s, %s, %s)',
        (id_user, id_community_posts, comment)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Comment created'}), 201

# Update comment
@community_comments_bp.route('/community_comments/<int:id>', methods=['PUT'])
@jwt_required()
def update_community_comment(id):
    comment = request.form.get('comment')
    if not comment:
        return jsonify({'msg': 'comment is required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE tb_community_comments SET comment = %s WHERE id_community_comments = %s',
        (comment, id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Comment updated'}), 200

# Delete comment
@community_comments_bp.route('/community_comments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_community_comment(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_community_comments WHERE id_community_comments = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Comment deleted'}), 200
