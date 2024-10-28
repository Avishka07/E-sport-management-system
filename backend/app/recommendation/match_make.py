from flask import current_app
from neomodel import db

def find_closest_ranked_players(player_id, num_players):
    query = """
        MATCH (p1:Player {playerId: $playerId})-[r1:PLAYS]->(g:Game)<-[r2:PLAYS]-(p2:Player)
        WHERE p1 <> p2
        WITH p1, p2, g, r2, abs(r1.ranking - r2.ranking) AS ranking_diff
        ORDER BY ranking_diff ASC
        LIMIT $numPlayers
        RETURN p2.playerId AS matchedPlayer, p2.firstName AS firstName, p2.lastName AS lastName, g.game AS game, g.gameId AS gameId, r2.ranking AS ranking
    """

    # Use the neo4j_helper from the app context
    neo4j_helper = current_app.neo4j_helper

    closest_players = []
    
    # Run the query using neo4j_helper and pass parameters
    result = db.cypher_query(query, parameters={'playerId': player_id, 'numPlayers': num_players})
    
    # Process the result and build the closest players list
    for record in result:
        closest_players.append({
            "Player": player_id,
            "matchedPlayer": record["matchedPlayer"],
            "firstName": record["firstName"],
            "lastName": record["lastName"],
            "game": record["game"],
            "gameId": record["gameId"],
            "ranking": record["ranking"]
        })
    
    return closest_players
