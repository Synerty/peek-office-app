===============================
Peek Platform - Desktop Service
===============================

The Peek Desktop service contains the Angular Web and Electron (TODO) build environments.

The frontend uses typescript + bootstrap3 + angular2

Development
-----------

Web Frontend
````````````

The frontend is compiled/built from the backend python software when it starts. The python
backend then serves up the the webpack bundles. This is accessible via http://<ip>:8002

When you are developing with the frontend for Web, you can start development mode with:

::

        cd <project dir>/peek_office_app
        npm start


This will start a NODE development server. It will watch the project files, rebuild the
project and live reload the browser when you make changes.
It's accessed via http://<ip>:4002

There is a proxy.conf.json file that is configured to pass through certain resources to
the backend server. This allows the NODE development server to hand handle all the assets
and the backend to still handle the file uploads, vortex, etc.
