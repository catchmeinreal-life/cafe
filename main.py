
from flask import request  # Ensure request is imported from Flask

email = request.form.get('email')  # Use 'form' for Flask POST data
password = request.form.get('password') 