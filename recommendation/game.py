

def getGame(driver):
    with driver.session() as session:
        result = session.run("MATCH (g:Game) return count(g)")
        return result.single()[0]
    
def get_next_game_id(session):
    query = """
    MATCH (g:Game)
    RETURN MAX(g.gameId) AS maxId
    """
    result = session.run(query)
    max_id = result.single().get("maxId")
    return (max_id or 0) + 1

def add_game(driver, game_name, genre):
    query = """
    CREATE (g:Game {gameId: $gameId, game: $gameName, genre: $genre})
    RETURN g
    """
    
    with driver.session() as session:
        game_id = get_next_game_id(session)
        result = session.run(query, gameId=game_id, gameName=game_name, genre=genre)
        game_node = result.single()['g']
        return {
            "gameId": game_node["gameId"],
            "game": game_node["game"],
            "genre": game_node["genre"]
        }