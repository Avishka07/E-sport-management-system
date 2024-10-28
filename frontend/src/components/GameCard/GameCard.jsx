import React from "react";

function GameCard(game) {
  return (
    <div className="transform transition-transform duration-300 ease-in-out py-5 hover:scale-110">
      <img
        src={game.game.img}
        alt={game.game.name}
        className="w-48 h-auto object-cover rounded-md cursor-pointer"
      />
    </div>
  );
}

export default GameCard;
