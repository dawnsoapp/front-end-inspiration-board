import React, { useState, useEffect } from 'react';
import './App.css';

import CardList from './components/CardList';
import Board from './components/Board';
import NewCardForm from './components/NewCardForm';
import BoardSelectRadio from './components/BoardSelectRadio';

import boardData from './data/boards.json';
// use ${process.env.REACT_APP_BACKEND_URL} to make API calls


const App = () => {
  const [boards, setBoards] = useState(boardData);
  const [targetBoardId, setTargetBoardId] = useState(1);

  const handleSelectBoard = (boardId) => {
    console.log('Changing target board ID to', boardId);
    setTargetBoardId(boardId);
  };

  const findIndexOfTargetBoard = () => {
    for (let i = 0; i < boards.length; i++) {
      if (boards[i].id === targetBoardId) {
        return i
      }
    }
  }
  
  const displayCards = (boardId) => {
    // let boardIndex = findIndexOfTargetBoard();
    let boardIndex = 0;
    return (
      <CardList cards={boards[boardIndex].cards} onClick={handleLike}/>
    )
  };

  // const displayCards = (boardId) => {
  //   for (let board of boards) {
  //     if (board.id === boardId) {
  //       console.log(board);
  //       return <CardList cards={board.cards} onClick={handleLike}/>
  //     }
  //   }
  // };
  // old version
  // const handleLikeOld = id => {
  //   setCards((prevCards) => {
  //     return prevCards.map((card) => {
  //       if (id === card.id) {
  //         return { ...card, likesCount: card.likesCount + 1 };
  //       } else {
  //         return card;
  //       };
  //     })
  //   })
  // }

  const handleLike = (cardId, boardId) => {
    let newBoards = [...boards];

    let targetIndex;
    for (let i = 0; i < newBoards.length; i++) {
      if (newBoards[i].id === boardId) {
        targetIndex = i;
      }
    }

    newBoards[targetIndex].cards = newBoards[targetIndex].cards.map((card) => {
      if (cardId === card.id) {
        return {...card, likesCount: card.likesCount + 1};
      } else {return card;};
    });

    setBoards(newBoards);
  }

  const handleSubmitCard = (newCard) => {}
  //   const nextId = Math.max(...cards.map(card => card.id)) + 1;
  //   const newCardObject = {
  //     id: nextId,
  //     message: newCard.message,
  //     board: newCard.board,
  //     likesCount: 0,
  //   };
  //   setCards((prevData) => [newCardObject, ...prevData])
  // }

  return (
    <div className="App">
      <header>
        <h1>MMNJ INSPO BOARD</h1>
      </header>
      <main>
        <BoardSelectRadio boards={boards} onBoardSelect={handleSelectBoard}/>
        {/* <Board board_id={targetBoardId}/> */}
        {displayCards(targetBoardId)}
        <NewCardForm addCard={handleSubmitCard} />
      </main>
    </div>
  );
}

export default App;
