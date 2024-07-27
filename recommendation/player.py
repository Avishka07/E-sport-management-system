def add_player(driver, player_id, first_name, last_name):
    query = """
    CREATE (p:Player {playerId: $playerId, firstName: $firstName, lastName: $lastName})
    RETURN p
    """
    
    with driver.session() as session:
        result = session.run(query, playerId=player_id, firstName=first_name, lastName=last_name)
        for record in result:
             rec = record["p"]
             
             new_player = {
                "playerId": rec['playerId'],
                "firstName": rec['firstName'],
                "lastName": rec['lastName']
                }
             
             return new_player
        
    
def add_player_relationships(driver, player_id, games):
    query = """
    MATCH (p:Player {playerId: $playerId})
    UNWIND $games AS game
    MATCH (g:Game {gameId: game})
    MERGE (p)-[r:PLAYS]->(g)
    SET r.hoursPlayed = 0, 
        r.recommendation = 'low', 
        r.status = 'offline', 
        r.ranking = 1
    RETURN p, r, g
    """

    relationships = []
    
    with driver.session() as session:
        result = session.run(query, playerId=player_id, games=games)
        print(result)
        for record in result:
            player_node = record['p']
            relationship = record['r']
            game_node = record['g']
            print(player_node)
            relationships.append({
                "playerID": player_node['playerId']
            })
            break

        return relationships