from flask import Blueprint, send_from_directory
import app

static_routes = Blueprint('static', __name__)

@static_routes.route('/images/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)
