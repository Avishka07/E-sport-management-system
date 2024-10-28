from .. import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB

class Admin(db.Model):
    __tablename__ = 'adminuser'

    adminid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

class Player(db.Model):
    __tablename__ = 'player'

    userid = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255))
    teamid = db.Column(db.Integer, db.ForeignKey('team.teamid'),nullable=True)

class Team(db.Model):
    __tablename__ = 'team'

    teamid = db.Column(db.Integer, primary_key=True)
    teamname = db.Column(db.String(255))
    tag = db.Column(db.String(255), unique=True, nullable=False)
    leaderid = db.Column(db.Integer, db.ForeignKey('player.userid'), nullable=False)

class Event(db.Model):
    __tablename__ = 'events'

    eventid = db.Column(db.Integer, primary_key=True)
    gamename = db.Column(db.String(255), nullable=False)
    game_names = db.Column(JSONB)
    country = db.Column(db.String(100), nullable=False)
    organizer = db.Column(db.String(100), nullable=False)
    adminid = db.Column(db.Integer, db.ForeignKey('adminuser.adminid'), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    starting_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    starting_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    registration_closing = db.Column(db.DateTime, nullable=False)
    image_path = db.Column(db.String(255))

class EventRegistration(db.Model):
    __tablename__ = 'event_registration'

    RegistrationID = db.Column(db.Integer, primary_key=True)
    EventID = db.Column(db.Integer, db.ForeignKey('events.eventid'), nullable=False)
    UserID = db.Column(db.Integer, db.ForeignKey('player.userid'), nullable=True)
    TeamID = db.Column(db.Integer, db.ForeignKey('team.teamid'), nullable=True)
    RegisteredDate = db.Column(db.DateTime, default=datetime.utcnow)

    Country = db.Column(db.String(100), nullable=True)
    PhoneNumber = db.Column(db.String(20), nullable=True)
    DateOfBirth = db.Column(db.Date, nullable=True)
    Gender = db.Column(db.String(10), nullable=True)
