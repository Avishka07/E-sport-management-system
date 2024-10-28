from flask import current_app
from ..models.neo_models import Player, Game
from neomodel.exceptions import DoesNotExist

def get_all_games():
    games = Game.nodes.all()
    return [{"gameId": g.gameId, "gameName": g.game, "genre":g.genre} for g in games]


    
def get_next_game_id():
        try:
            # Get the game with the highest gameId
            max_game = Game.nodes.order_by('-gameId').first()
            
            # If a game is found, return the next gameId
            if max_game:
                return max_game.gameId + 1
            else:
                return 1  # If no games exist, start with gameId 1
        except DoesNotExist:
            return 1  # If no games exist, return 1 as the starting gameId

def add_game(game_name, genre):
    game_id = get_next_game_id()

    # Create and save the game node
    game = Game(gameId=game_id, game=game_name, genre=genre)
    game.save()

    return {
        "gameId": game.gameId,
        "game": game.game,
        "genre": game.genre
    }



