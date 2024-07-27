
def find_closest_ranked_players(driver, player_id, num_players):
    query = """
        MATCH (p1:Player {playerId: $playerId})-[r1:PLAYS]->(g:Game)<-[r2:PLAYS]-(p2:Player)
        WHERE p1 <> p2
        WITH p1, p2, g, r2,  abs(r1.ranking - r2.ranking) AS ranking_diff
        ORDER BY ranking_diff ASC
        LIMIT $numPlayers
        RETURN p2.playerId AS matchedPlayer, p2.firstName AS firstName, p2.lastName AS lastName, g.Game AS game, g.GameId AS gameId, r2.ranking AS ranking
    """
    
    team = {}
    closest_players = []
    with driver.session() as session:
        result = session.run(query, playerId=player_id, numPlayers=num_players)
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
            print(record)

    return closest_players