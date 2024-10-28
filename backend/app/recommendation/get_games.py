from flask import current_app

from ..models.neo_models import Player, Game

def get_all_games():
    # Fetch all Game nodes using neomodel's ORM
    games = Game.nodes.all()

    # Process the result to build the list of games
    game_list = []
    for game in games:
        game_list.append({
            "gameId": game.gameId,
            "gameName": game.game,
            "genre": game.genre
        })
    
    return game_list

