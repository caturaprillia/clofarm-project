from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db import get_db_connection

mentorship_bp = Blueprint('mentorship', __name__)

# List all mentorships
@mentorship_bp.route('/mentorship', methods=['GET'])
@jwt_required()
def list_mentorship():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_mentorship')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get detail mentorship by id
@mentorship_bp.route('/mentorship/<int:id>', methods=['GET'])
@jwt_required()
def get_mentorship(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_mentorship WHERE id_mentorship = %s', (id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    if not data:
        return jsonify({'msg': 'Not found'}), 404
    return jsonify(data), 200

# Create mentorship
@mentorship_bp.route('/mentorship', methods=['POST'])
@jwt_required()
def create_mentorship():
    title = request.form.get('title')
    description = request.form.get('description')
    mentorship_url = request.form.get('mentorship_url')
    image_url = request.form.get('image_url')
    if not all([title, description, mentorship_url]):
        return jsonify({'msg': 'Missing required fields'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_mentorship (title, description, mentorship_url, image_url) VALUES (%s, %s, %s, %s)',
        (title, description, mentorship_url, image_url)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Mentorship created'}), 201

# Update mentorship
@mentorship_bp.route('/mentorship/<int:id>', methods=['PUT'])
@jwt_required()
def update_mentorship(id):
    title = request.form.get('title')
    description = request.form.get('description')
    mentorship_url = request.form.get('mentorship_url')
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
    if mentorship_url:
        fields.append('mentorship_url = %s')
        values.append(mentorship_url)
    if image_url:
        fields.append('image_url = %s')
        values.append(image_url)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_mentorship SET {', '.join(fields)} WHERE id_mentorship = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Mentorship updated'}), 200

# Delete mentorship
@mentorship_bp.route('/mentorship/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_mentorship(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_mentorship WHERE id_mentorship = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Mentorship deleted'}), 200
