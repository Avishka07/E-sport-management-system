from flask import current_app
from ..models.neo_models import Player, Game

def add_player(player_id):
    # Create and save the player node
    player = Player(playerId=player_id)
    player.save()

    return {
        "playerId": player.playerId
    }


        
    
def add_player_relationships(player_id, games):
    # Find the player node
    player = Player.nodes.get(playerId=player_id)

    relationships = []

    for game_id in games:
        # Find or create the Game node
        game = Game.nodes.get(gameId= game_id)
        
        # Create the PLAYS relationship
        player.plays.connect(game)

        relationships.append({
            "playerId": player.playerId,
            "gameId": game.gameId
        })

    return relationships



