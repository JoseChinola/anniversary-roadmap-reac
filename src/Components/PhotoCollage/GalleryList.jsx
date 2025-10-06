import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card } from "./Card/Card";
import "./styles.css";

const cardData = [
  { id: "1", title: "Nuestro primer día", category: "Recuerdo", backgroundColor: "#FFD1DC" },
  { id: "2", title: "Momentos juntos", category: "Amor", backgroundColor: "#C1E1C1" },
  { id: "3", title: "Viaje soñado", category: "Aventura", backgroundColor: "#B3E5FC" },
];

const List = ({ match, history }) => (
  <ul className="card-list">
    {cardData.map((card) => (
      <Card
        key={card.id}
        isSelected={match.params.id === card.id}
        history={history}
        {...card}
      />
    ))}
  </ul>
);

export const CardList = () => (
  <Router>
    <Route path={["/:id", "/"]} component={List} />
  </Router>
);
