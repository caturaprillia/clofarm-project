import os
from dotenv import load_dotenv
import mysql.connector

# Load .env
load_dotenv()

def get_db_connection():
    connection = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME'),
        pool_name=os.getenv('DB_POOLNAME'),
        pool_size=int(os.getenv('POOL_SIZE', 5))
    )
    return connection 