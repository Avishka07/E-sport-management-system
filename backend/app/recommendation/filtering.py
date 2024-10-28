from flask import current_app
from neomodel import db


def collaborative_filtering(neighbourhood_size, num_recos, player_id):
    
    query = """
            //Get pairs of players and their count of distinct games they have playes
            MATCH (p1:Player {playerId: $player_id}) - [:PLAYS] -> (g:Game) <- [:PLAYS] - (p2:Player)
            WHERE p1 <> p2
            WITH p1, p2, COUNT(g) as intersection_count

            //Get count of all the distinct games that the players are playing
            MATCH (p:Player) - [:PLAYS] -> (g:Game)
            WHERE p in [p1, p2]
            WITH p1, p2, intersection_count, COUNT(DISTINCT g) as union_count

            //Compute Jaccard index
            WITH p1, p2, intersection_count, union_count, (intersection_count*1.0/union_count) as jaccard_index

            //Get top k neighbours based on Jaccard index
            ORDER BY jaccard_index DESC, p2.playerId
            WITH p1, COLLECT(p2)[0..$neighbourhood_size] as neighbours
            WHERE size(neighbours) = $neighbourhood_size
            UNWIND neighbours as neighbour
            WITH p1, neighbour

            //Get top n recommendations from the selected neighbours
            MATCH (neighbour) - [:PLAYS] -> (g:Game)
            WHERE not (p1) - [:PLAYS] -> (g)
            WITH p1, g, COUNT(DISTINCT neighbour) as cnt
            ORDER BY p1.playerId, cnt DESC
            RETURN p1.playerId as player, COLLECT({gameId:g.gameId, game: g.game})[0..$num_recos] as recos
            """
    
    # neo4j_helper = current_app.neo4j_helper

    # Run the Cypher query using `neomodel`'s db.cypher_query
    result, meta = db.cypher_query(query, {
        'neighbourhood_size': neighbourhood_size,
        'num_recos': num_recos,
        'player_id': player_id
    })
    
    recos = {}
    
    # Extract the results and process them
    if result:
        row = result[0]
        recos['player_id'] = row[0]  # p1.playerId
        recos['recommendation'] = row[1]  # Recommendation list from the selected neighbours
    
    return recos