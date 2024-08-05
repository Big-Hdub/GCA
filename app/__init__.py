from .api.lesson_routes import lessons_routes
from .api.account_routes import account_routes
from .api.course_routes import courses_routes
from .api.grade_routes import grade_routes
from flask import Flask, request, redirect
from flask_wtf.csrf import generate_csrf
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.dash_routes import dash_routes
from flask_login import LoginManager
from flask_migrate import Migrate
from .seeds import seed_commands
from .models import db, User
from flask_cors import CORS
from .config import Config
import os

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(lessons_routes, url_prefix='/api/lessons')
app.register_blueprint(courses_routes, url_prefix='/api/courses')
app.register_blueprint(account_routes, url_prefix='/api/account')
app.register_blueprint(grade_routes, url_prefix='/api/grades')
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(dash_routes, url_prefix='/api/dash')
db.init_app(app)
Migrate(app, db)
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'l1-math.png':
        return app.send_from_directory('public' 'l1-math.png')
    if path == 'mathlessons.png':
        return app.send_from_directory('public' 'mathlessons.png')
    if path == 'reading.png':
        return app.send_from_directory('public' 'reading.png')
    if path == 'bible.png':
        return app.send_from_directory('public' 'bible.png')
    if path == 'english.png':
        return app.send_from_directory('public' 'english.png')
    if path == 'geography.png':
        return app.send_from_directory('public', 'geography.png')
    if path == 'history.png':
        return app.send_from_directory('public' 'history.png')
    if path == 'math.png':
        return app.send_from_directory('public', 'math.png')
    if path == 'logo.png':
        return app.send_from_directory('public' 'logo.png')
    if path == 'fields.jpg':
        return app.send_from_directory('public' 'fields.jpg')
    if path == 'GCFarmers.png':
        return app.send_from_directory('public', 'GCFarmers.png')
    if path == 'cross.jpg':
        return app.send_from_directory('public' 'cross.jpg')
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
