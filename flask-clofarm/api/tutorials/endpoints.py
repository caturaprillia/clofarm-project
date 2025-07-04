from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db import get_db_connection

tutorials_bp = Blueprint('tutorials', __name__)

# List all tutorials
@tutorials_bp.route('/tutorials', methods=['GET'])
@jwt_required()
def list_tutorials():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_tutorials')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get detail tutorial by id
@tutorials_bp.route('/tutorials/<int:id>', methods=['GET'])
@jwt_required()
def get_tutorial(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_tutorials WHERE id_tutorials = %s', (id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    if not data:
        return jsonify({'msg': 'Not found'}), 404
    return jsonify(data), 200

# Create tutorial
@tutorials_bp.route('/tutorials', methods=['POST'])
@jwt_required()
def create_tutorial():
    title = request.form.get('title')
    description = request.form.get('description')
    thumbnail_url = request.form.get('thumbnail_url')
    tutorial_url = request.form.get('tutorial_url')
    if not all([title, description, tutorial_url]):
        return jsonify({'msg': 'Missing required fields'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_tutorials (title, description, thumbnail_url, tutorial_url) VALUES (%s, %s, %s, %s)',
        (title, description, thumbnail_url, tutorial_url)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Tutorial created'}), 201

# Update tutorial
@tutorials_bp.route('/tutorials/<int:id>', methods=['PUT'])
@jwt_required()
def update_tutorial(id):
    title = request.form.get('title')
    description = request.form.get('description')
    thumbnail_url = request.form.get('thumbnail_url')
    tutorial_url = request.form.get('tutorial_url')
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
    if thumbnail_url:
        fields.append('thumbnail_url = %s')
        values.append(thumbnail_url)
    if tutorial_url:
        fields.append('tutorial_url = %s')
        values.append(tutorial_url)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_tutorials SET {', '.join(fields)} WHERE id_tutorials = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Tutorial updated'}), 200

# Delete tutorial
@tutorials_bp.route('/tutorials/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_tutorial(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_tutorials WHERE id_tutorials = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Tutorial deleted'}), 200
