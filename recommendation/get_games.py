
def get_all_games(driver):
    query = """
    MATCH (g:Game)
    RETURN g.gameId AS gameId, g.game AS gameName
    """
    
    games = []
    with driver.session() as session:
        result = session.run(query)
        for record in result:
            games.append({
                "gameId": record["gameId"],
                "gameName": record["gameName"]
            })
    
    return games