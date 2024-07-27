from flask import Blueprint, request, jsonify
from ..utils.db import db
from ..models import Event, EventRegistration, Team
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
from ..decoraters import admin_required, user_required
from datetime import datetime

event_blueprint = Blueprint('event', __name__)

@event_blueprint.route('/create', methods=['POST'])
@admin_required
def create_event():
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        data = request.get_json()
        
        # Get admin ID from JWT token
        admin_id = get_jwt_identity()

        try:
            event = Event(
                gamename = data['gamename'],
                country=data['country'],
                organizer=data['organizer'],
                location=data['location'],
                starting_date=data['startingDate'],
                end_date=data['endDate'],
                starting_time=data['startingTime'],
                end_time=data['endTime'],
                registration_closing=data['registrationClosing'],
                adminid=admin_id
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

        # Get admin ID from JWT token
        user_id = get_jwt_identity()
        # user_id = data.get('user_id', None)
        team_name = data.get('team_name', None)
        
        # Proceed with event registration if all validations pass
        new_registration = EventRegistration(
            EventID=event_id,
            UserID=user_id,
            RegistrationDate=datetime.utcnow()
        )

        if team_name is not None:
            team = Team.query.get(teamname = team_name)
            if team:
                return jsonify({'message': 'Team name is not unique'}), 404
            new_registration.teamid = team.teamid

        db.session.add(new_registration)
        db.session.commit()

        return jsonify({'message': 'Registered successfully', 'registration_id': new_registration.RegistrationID}), 201
