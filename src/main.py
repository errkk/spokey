from os import path, environ
from uuid import uuid4

import pusher
from flask import Flask, render_template, redirect, url_for, request

UPLOAD_FOLDER = path.abspath(path.join(path.dirname(__file__), 'static', 'media'))
IMG_FOLDER = path.abspath(path.join(path.dirname(__file__), 'img'))
ALLOWED_EXTENSIONS = set(['jpg', ])

app = Flask(__name__)

pusher_config = dict(
  app_id=environ.get('APP_ID'),
  key=environ.get('KEY'),
  secret=environ.get('SECRET'),
)
p = pusher.Pusher(**pusher_config)

@app.route("/")
def index():
    return render_template('index.html', pusher_config=pusher_config)

@app.route("/upload", methods=["GET", "POST"])
def upload():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = uuid4().hex
            file.save(path.join(UPLOAD_FOLDER, filename))
            p['process'].trigger('new_image',
                {'src': '/static/media/{0}'.format(filename)})

            return redirect(url_for('upload'))
    return render_template('upload.html')

@app.route("/latest")
def latest():
    new_image()
    return render_template('upload.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
