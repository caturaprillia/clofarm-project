from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection
import datetime

mentorship_regist_bp = Blueprint('mentorship_regist', __name__)

# List all mentorship registrations
@mentorship_regist_bp.route('/mentorship_regist', methods=['GET'])
@jwt_required()
def list_mentorship_regist():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_mentorship_registration')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get detail mentorship registration by id
@mentorship_regist_bp.route('/mentorship_regist/<int:id>', methods=['GET'])
@jwt_required()
def get_mentorship_regist(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_mentorship_registration WHERE id_mentorship_registration = %s', (id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    if not data:
        return jsonify({'msg': 'Not found'}), 404
    return jsonify(data), 200

# Create mentorship registration
@mentorship_regist_bp.route('/mentorship_regist', methods=['POST'])
@jwt_required()
def create_mentorship_regist():
    id_user = get_jwt_identity()
    id_mentorship = request.form.get('id_mentorship')
    name = request.form.get('name')
    email = request.form.get('email')
    phone_number = request.form.get('phone_number')
    address = request.form.get('address')
    occupation = request.form.get('occupation')
    registered_at = datetime.datetime.now()
    if not all([id_mentorship, name, email, phone_number, address, occupation]):
        return jsonify({'msg': 'Missing required fields'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_mentorship_registration (id_user, id_mentorship, name, email, phone_number, address, occupation, registered_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
        (id_user, id_mentorship, name, email, phone_number, address, occupation, registered_at)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Mentorship registration created'}), 201

# Update mentorship registration
@mentorship_regist_bp.route('/mentorship_regist/<int:id>', methods=['PUT'])
@jwt_required()
def update_mentorship_regist(id):
    name = request.form.get('name')
    email = request.form.get('email')
    phone_number = request.form.get('phone_number')
    address = request.form.get('address')
    occupation = request.form.get('occupation')
    conn = get_db_connection()
    cursor = conn.cursor()
    fields = []
    values = []
    if name:
        fields.append('name = %s')
        values.append(name)
    if email:
        fields.append('email = %s')
        values.append(email)
    if phone_number:
        fields.append('phone_number = %s')
        values.append(phone_number)
    if address:
        fields.append('address = %s')
        values.append(address)
    if occupation:
        fields.append('occupation = %s')
        values.append(occupation)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_mentorship_registration SET {', '.join(fields)} WHERE id_mentorship_registration = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Mentorship registration updated'}), 200

# Delete mentorship registration
@mentorship_regist_bp.route('/mentorship_regist/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_mentorship_regist(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_mentorship_registration WHERE id_mentorship_registration = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Mentorship registration deleted'}), 200
