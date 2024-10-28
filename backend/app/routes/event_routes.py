import json
from flask import Blueprint, request, jsonify, send_from_directory
from ..utils.db import db
from ..models.sql_models import Event, EventRegistration, Team, Player
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
from ..decoraters import admin_required, user_required
from datetime import datetime
from werkzeug.utils import secure_filename
import os
from flask import current_app
from sqlalchemy import or_

event_blueprint = Blueprint('event', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@event_blueprint.route('/image/<int:event_id>', methods=['GET'])
def serve_image_by_event_id(event_id):

    # Query the event table for the img_path based on event_id
    event = Event.query.filter_by(eventid=event_id).one()

    # Get the img_path from the event (assumes img_path stores only the filename)
    img_path = event.image_path
    print(img_path)
    print(current_app.config['UPLOAD_FOLDER'])

    if img_path:
        # Serve the image from the UPLOAD_FOLDER
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], img_path)
    else:
        return jsonify({"error": "Image path not found for this event"}), 404


@event_blueprint.route('/create', methods=['POST'])
@admin_required
def create_event():
        if not request.is_json and 'file' not in request.files:
            return jsonify({"msg": "Missing JSON or Image in request"}), 400

        data = request.form  # This will get the other data when using multipart/form-data
        file = request.files['file']

        # if not request.is_json:
        #     return jsonify({"msg": "Missing JSON in request"}), 400

        # data = request.get_json()
        
        # Get admin ID from JWT token
        admin_id = get_jwt_identity()

        try:
            # Save the file if provided
            if file:
                filename = secure_filename(file.filename)
                image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
                file.save(image_path)
            else:
                image_path = None  # Handle no file case

            
            # Parse the game names from the JSON string
            game_names_str = data.get('game_names')
            game_names = json.loads(game_names_str) if game_names_str else []  # Convert JSON string to a Python list
            
            event = Event(
                gamename=data['gamename'],
                country=data['country'],
                organizer=data['organizer'],
                location=data['location'],
                starting_date=data['startingDate'],
                end_date=data['endDate'],
                starting_time=data['startingTime'],
                end_time=data['endTime'],
                registration_closing=data['registrationClosing'],
                image_path=filename,  # Save the file path in the database
                adminid=admin_id,
                game_names = game_names
            )

            db.session.add(event)
            db.session.commit()
            return jsonify({"message": "Event created successfully", "eventId": event.eventid}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        

        
@event_blueprint.route('/register_event', methods=['POST'])
@user_required
def register_event():
        data = request.get_json()
        event_id = data.get('event_id')
        country = data.get('country')
        phone_number = data.get('phone_number')
        date_of_birth = data.get('date_of_birth')
        gender = data.get('gender')

        # Get admin ID from JWT token
        user_id = get_jwt_identity()
        # user_id = data.get('user_id', None)
        team_name = data.get('team_name', None)
        
        # Proceed with event registration if all validations pass
        new_registration = EventRegistration(
            EventID=event_id,
            UserID=user_id,
            RegisteredDate=datetime.utcnow(),
            Country=country,
            PhoneNumber=phone_number,
            DateOfBirth=date_of_birth,
            Gender=gender
        )

        if team_name is not None:
            team = Team.query.get(teamname = team_name)
            if team:
                return jsonify({'message': 'Team name is not unique'}), 404
            new_registration.teamid = team.teamid

        db.session.add(new_registration)
        db.session.commit()

        return jsonify({'message': 'Registered successfully', 'registration_id': new_registration.RegistrationID}), 201

@event_blueprint.route('/events', methods=['GET'])
def get_events():
    try:
        # Fetch all events from the database
        events = Event.query.all()

        # Serialize events to JSON format
        event_list = []
        for event in events:
            event_data = {
                'eventid': event.eventid,
                'gamename': event.gamename,
                'country': event.country,
                'organizer': event.organizer,
                'location': event.location,
                'starting_date': event.starting_date.strftime('%Y-%m-%d'),
                'end_date': event.end_date.strftime('%Y-%m-%d'),
                'starting_time': event.starting_time.strftime('%H:%M:%S'),
                'end_time': event.end_time.strftime('%H:%M:%S'),
                'registration_closing': event.registration_closing.strftime('%Y-%m-%d'),
                'adminid': event.adminid,
                'img_path': event.image_path,
                'game_names': event.game_names
            }
            event_list.append(event_data)

        return jsonify({'events': event_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@event_blueprint.route('/delete/<int:event_id>', methods=['DELETE'])
@admin_required
def delete_event(event_id):
    try:
        # Get the event by ID
        event = Event.query.get(event_id)
        
        if not event:
            return jsonify({"message": "Event not found"}), 404
        
        # Delete all registrations associated with this event
        EventRegistration.query.filter_by(EventID=event_id).delete()
        
        # Delete the event from the database
        db.session.delete(event)
        db.session.commit()

        return jsonify({"message": "Event deleted successfully"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@event_blueprint.route('/update/<int:event_id>', methods=['PUT'])
# @admin_required
def update_event(event_id):
    # if not request.is_json and 'file' not in request.files:
    #     return jsonify({"msg": "Missing JSON or Image in request"}), 400

    data = request.form  # This will get the other data when using multipart/form-data
    file = request.files.get('file')  # Use .get() to avoid KeyError

    # Get admin ID from JWT token
    # admin_id = get_jwt_identity()

    try:
        # Get the event by ID
        event = Event.query.get(event_id)

        if not event:
            return jsonify({"message": "Event not found"}), 404

        # Save the new file if provided
        if file:
            # Delete the old image if it exists
            if event.image_path:
                try:
                    image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], event.image_path)
                    os.remove(image_path)  # Remove the old image
                except Exception as e:
                    return jsonify({"error": f"Failed to delete old image: {str(e)}"}), 500

            # Save the new image
            filename = secure_filename(file.filename)
            image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(image_path)
            event.image_path = filename  # Update event image path
        else:
            image_path = event.image_path  # Retain the existing image if no new image is provided

        # Parse the game names from the JSON string
        game_names_str = data.get('game_names')
        game_names = json.loads(game_names_str) if game_names_str else event.game_names  # Retain existing game names if not updated

        # Update the event details with the provided data
        event.gamename = data.get('gamename', event.gamename)
        event.country = data.get('country', event.country)
        event.organizer = data.get('organizer', event.organizer)
        event.location = data.get('location', event.location)
        event.starting_date = datetime.strptime(data.get('startingDate', event.starting_date.strftime('%Y-%m-%d')), '%Y-%m-%d')
        event.end_date = datetime.strptime(data.get('endDate', event.end_date.strftime('%Y-%m-%d')), '%Y-%m-%d')
        event.starting_time = datetime.strptime(data.get('startingTime', event.starting_time.strftime('%H:%M:%S')), '%H:%M:%S').time()
        event.end_time = datetime.strptime(data.get('endTime', event.end_time.strftime('%H:%M:%S')), '%H:%M:%S').time()
        event.registration_closing = datetime.strptime(data.get('registrationClosing', event.registration_closing.strftime('%Y-%m-%d')), '%Y-%m-%d')
        event.game_names = game_names

        db.session.commit()

        return jsonify({"message": "Event updated successfully"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@event_blueprint.route('/registrations/<int:event_id>', methods=['GET'])
def get_registration_count(event_id):
    try:
        # Query the database to count the number of registrations for the given event
        registration_count = db.session.query(EventRegistration).filter_by(EventID=event_id).count()

        # Return the count as JSON response
        return jsonify({
            'event_id': event_id,
            'registration_count': registration_count
        }), 200

    except Exception as e:
        # Handle any errors and return a response
        return jsonify({
            'error': str(e)
        }), 500
    
@event_blueprint.route('/eventsbygames', methods=['POST'])
def get_events_by_game_names():
    # Get the JSON data from the request body
    data = request.get_json()

    if not data or 'game_names' not in data:
        return jsonify({'message': 'Missing game names in request body'}), 400

    # Extract the game names from the JSON body
    game_names = data['game_names']

    if not isinstance(game_names, list) or not game_names:
        return jsonify({'message': 'game_names must be a non-empty list'}), 400

    try:
        # Create filters to check if any game name in the provided list is contained in the event's game_names column
        filters = [Event.game_names.op('@>')(f'["{game_name}"]') for game_name in game_names]

        # Query the database with combined filters
        events = Event.query.filter(or_(*filters)).all()

        if not events:
            return jsonify({'message': 'No events found for the provided game names'}), 404

        # Prepare the response
        events_data = [
            {
                'eventid': event.eventid,
                'gamename': event.gamename,
                'country': event.country,
                'organizer': event.organizer,
                'location': event.location,
                'starting_date': event.starting_date.strftime('%Y-%m-%d'),
                'end_date': event.end_date.strftime('%Y-%m-%d'),
                'starting_time': event.starting_time.strftime('%H:%M:%S'),
                'end_time': event.end_time.strftime('%H:%M:%S'),
                'registration_closing': event.registration_closing.strftime('%Y-%m-%d'),
                'adminid': event.adminid,
                'img_path': event.image_path
            }
            for event in events
        ]

        return jsonify({'events': events_data}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

@event_blueprint.route('/event_registrations/<int:event_id>', methods=['GET'])
def get_event_registrations(event_id):
    try:
        # Query the EventRegistration table to get all users registered for the event
        registrations = db.session.query(EventRegistration).filter_by(EventID=event_id).all()

        # If no registrations found for the event
        if not registrations:
            return jsonify({'error': 'No registrations found for the event'}), 404

        # Collect registration details
        registration_details = []
        for reg in registrations:
            # Query the Player table to get the nickname based on user_id
            player = db.session.query(Player).filter_by(userid=reg.UserID).first()

            # If player exists, append the data
            if player:
                registration_details.append({
                    'user_id': reg.UserID,
                    'nickname': player.nickname,
                    'date_of_birth': reg.DateOfBirth,
                    'gender': reg.Gender,
                    'phone_number': reg.PhoneNumber
                })

        # Return the list of registration details as JSON response
        return jsonify({
            'event_id': event_id,
            'registrations': registration_details
        }), 200

    except Exception as e:
        # Handle any errors and return a response
        return jsonify({
            'error': str(e)
        }), 500
