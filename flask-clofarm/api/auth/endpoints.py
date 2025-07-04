from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from db import get_db_connection

# Blueprint
auth_bp = Blueprint('auth', __name__)

# Register
@auth_bp.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    phone_number = request.form.get('phone_number')
    password = request.form.get('password')
    photo_url = request.form.get('photo_url')
    name = request.form.get('name')

    if not all([username, phone_number, password, name]):
        return jsonify({'msg': 'Missing required fields'}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    # Cek username unik
    cursor.execute('SELECT * FROM tb_users WHERE username = %s', (username,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'msg': 'Username already exists'}), 409

    hashed_pw = generate_password_hash(password)
    cursor.execute(
        'INSERT INTO tb_users (username, phone_number, password, photo_url, name) VALUES (%s, %s, %s, %s, %s)',
        (username, phone_number, hashed_pw, photo_url, name)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'User registered successfully'}), 201

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    # Ambil data dari form-data
    username = request.form.get('username')
    password = request.form.get('password')
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_users WHERE username = %s', (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'msg': 'Invalid username or password'}), 401
    access_token = create_access_token(identity=str(user['id_user']), expires_delta=datetime.timedelta(days=1))
    return jsonify({'access_token': access_token}), 200

# Get Profile
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_users WHERE id_user = %s', (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    user_data = user.copy()
    user_data.pop('password')
    return jsonify(user_data), 200

# Update Profile
@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    phone_number = request.form.get('phone_number')
    photo_url = request.form.get('photo_url')
    name = request.form.get('name')

    conn = get_db_connection()
    cursor = conn.cursor()
    # Build dynamic update query
    fields = []
    values = []
    if phone_number:
        fields.append('phone_number = %s')
        values.append(phone_number)
    if photo_url:
        fields.append('photo_url = %s')
        values.append(photo_url)
    if name:
        fields.append('name = %s')
        values.append(name)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(user_id)
    query = f"UPDATE tb_users SET {', '.join(fields)} WHERE id_user = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Profile updated successfully'}), 200
