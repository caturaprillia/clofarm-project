from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from db import get_db_connection

agrotourism_bp = Blueprint('agrotourism', __name__)

# List all agrotourism
@agrotourism_bp.route('/agrotourism', methods=['GET'])
@jwt_required()
def list_agrotourism():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_agrowisata')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get detail agrotourism by id
@agrotourism_bp.route('/agrotourism/<int:id>', methods=['GET'])
@jwt_required()
def get_agrotourism(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_agrowisata WHERE id_agrowisata = %s', (id,))
    data = cursor.fetchone()
    cursor.close()
    conn.close()
    if not data:
        return jsonify({'msg': 'Not found'}), 404
    return jsonify(data), 200

# Create agrotourism
@agrotourism_bp.route('/agrotourism', methods=['POST'])
@jwt_required()
def create_agrotourism():
    name = request.form.get('name')
    description = request.form.get('description')
    city = request.form.get('city')
    province = request.form.get('province')
    ticket_price = request.form.get('ticket_price')
    image_url = request.form.get('image_url')
    maps_url = request.form.get('maps_url')
    if not all([name, description, city, province, ticket_price]):
        return jsonify({'msg': 'Missing required fields'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_agrowisata (name, description, city, province, ticket_price, image_url, maps_url) VALUES (%s, %s, %s, %s, %s, %s, %s)',
        (name, description, city, province, ticket_price, image_url, maps_url)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Agrotourism created'}), 201

# Update agrotourism
@agrotourism_bp.route('/agrotourism/<int:id>', methods=['PUT'])
@jwt_required()
def update_agrotourism(id):
    name = request.form.get('name')
    description = request.form.get('description')
    city = request.form.get('city')
    province = request.form.get('province')
    ticket_price = request.form.get('ticket_price')
    image_url = request.form.get('image_url')
    maps_url = request.form.get('maps_url')
    conn = get_db_connection()
    cursor = conn.cursor()
    fields = []
    values = []
    if name:
        fields.append('name = %s')
        values.append(name)
    if description:
        fields.append('description = %s')
        values.append(description)
    if city:
        fields.append('city = %s')
        values.append(city)
    if province:
        fields.append('province = %s')
        values.append(province)
    if ticket_price:
        fields.append('ticket_price = %s')
        values.append(ticket_price)
    if image_url:
        fields.append('image_url = %s')
        values.append(image_url)
    if maps_url:
        fields.append('maps_url = %s')
        values.append(maps_url)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_agrowisata SET {', '.join(fields)} WHERE id_agrowisata = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Agrotourism updated'}), 200

# Delete agrotourism
@agrotourism_bp.route('/agrotourism/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_agrotourism(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_agrowisata WHERE id_agrowisata = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Agrotourism deleted'}), 200
