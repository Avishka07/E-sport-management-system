from neo4j import GraphDatabase

__driver = None

def get_connection():
    global __driver
    if(__driver == None):
        __driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "ArenaSync"))
        return __driver
    else:
        return __driver
