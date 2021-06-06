import React, { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import ErrorMessage from "./ErrorMessage";
import Cards from "./Cards";

// TODos  Routes to Edit Card, Add Card

function Study() {
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

  const deckId = useParams();

  console.log(deckId);

  /* useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((res) => {
        setDeck(
          res.data.results.map((cardItem, index) => {
            return {
              id: cardItem.id,
              question: cardItem.front,
              answer: cardItem.back,
            };
          })
        );
        console.log(res.data);
      })
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }*/
  const sampleDeck = [
    {
      id: 3,
      name: "Sample Deck",
      description: "This is a sample Deck. ",
    },
  ];
  const sampleCards = [
    {
      id: 1,
      front: "Question 1",
      back: "Answer 1",
      deckId: 3,
    },
    {
      id: 2,
      front: "Question 2",
      back: "Answer 2",
      deckId: "3",
    },
    {
      id: 3,
      front: "Question 3",
      back: "Answer 3",
      deckId: "3",
    },
  ];
  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>Sample Deck</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h1>Study</h1>
      </div>

      <div>
        <p>This is where the Card component is called</p>
        <Cards sampleCards={sampleCards} sampleDeck={sampleDeck} />
      </div>
    </section>
  );
}

export default Study;
