from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import get_db_connection

agrotourism_reviews_bp = Blueprint('agrotourism_reviews', __name__)

# List all reviews
@agrotourism_reviews_bp.route('/agrotourism_reviews', methods=['GET'])
@jwt_required()
def list_reviews():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_agrowisata_reviews')
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Get reviews for a specific agrotourism
@agrotourism_reviews_bp.route('/agrotourism_reviews/agrotourism/<int:agrotourism_id>', methods=['GET'])
@jwt_required()
def get_reviews_by_agrotourism(agrotourism_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM tb_agrowisata_reviews WHERE id_agrowisata = %s', (agrotourism_id,))
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data), 200

# Create review
@agrotourism_reviews_bp.route('/agrotourism_reviews', methods=['POST'])
@jwt_required()
def create_review():
    id_user = get_jwt_identity()
    id_agrowisata = request.form.get('id_agrowisata')
    rating = request.form.get('rating')
    review_text = request.form.get('review_text')
    url_images = request.form.get('url_images')
    if not all([id_agrowisata, rating, review_text]):
        return jsonify({'msg': 'id_agrowisata, rating, and review_text are required'}), 400
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO tb_agrowisata_reviews (id_agrowisata, id_user, rating, review_text, url_images) VALUES (%s, %s, %s, %s, %s)',
        (id_agrowisata, id_user, rating, review_text, url_images)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Review created'}), 201

# Update review
@agrotourism_reviews_bp.route('/agrotourism_reviews/<int:id>', methods=['PUT'])
@jwt_required()
def update_review(id):
    rating = request.form.get('rating')
    review_text = request.form.get('review_text')
    url_images = request.form.get('url_images')
    conn = get_db_connection()
    cursor = conn.cursor()
    fields = []
    values = []
    if rating:
        fields.append('rating = %s')
        values.append(rating)
    if review_text:
        fields.append('review_text = %s')
        values.append(review_text)
    if url_images:
        fields.append('url_images = %s')
        values.append(url_images)
    if not fields:
        cursor.close()
        conn.close()
        return jsonify({'msg': 'No data to update'}), 400
    values.append(id)
    query = f"UPDATE tb_agrowisata_reviews SET {', '.join(fields)} WHERE id_agrowisata_reviews = %s"
    cursor.execute(query, tuple(values))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Review updated'}), 200

# Delete review
@agrotourism_reviews_bp.route('/agrotourism_reviews/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tb_agrowisata_reviews WHERE id_agrowisata_reviews = %s', (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'msg': 'Review deleted'}), 200
