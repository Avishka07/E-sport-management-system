from neo4j import GraphDatabase

__driver = None

def get_connection():
    global __driver
    if(__driver == None):
        __driver = GraphDatabase.driver("bolt://127.0.0.1", auth=("neo4j", "00000000"))
        return __driver
    else:
        return __driver
