from neomodel import StructuredNode, StringProperty, IntegerProperty, RelationshipTo

class Game(StructuredNode):
    gameId = IntegerProperty(unique_index=True, required=True)
    game = StringProperty(required=True)
    genre = StringProperty()

class Player(StructuredNode):
    playerId = IntegerProperty(unique_index=True, required=True)
    plays = RelationshipTo(Game, 'PLAYS')
