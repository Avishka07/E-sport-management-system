# neo4j_helper.py

from neo4j import GraphDatabase

class Neo4jHelper:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def query(self, query, parameters=None, database="arenasync"):
        with self.driver.session(database=database) as session:
            result = session.run(query, parameters)
            return [record for record in result]
