import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import CardList from './components/CardList';
import Board from './components/Board';
import NewCardForm from './components/NewCardForm';
import NewBoardForm from './components/NewBoardForm';
import BoardSelectRadio from './components/BoardSelectRadio';

import boardData from './data/boards.json';
// use ${process.env.REACT_APP_BACKEND_URL} to make API calls

const boardsURL = `${process.env.REACT_APP_BACKEND_URL}`

const getAllBoards = () => {
  const convertBoardFromAPI = (boardData) => {
    return {
      id: boardData.board_id,
      title: boardData.title,
      owner: boardData.owner
    };
  };
  return axios.get(`${boardsURL}/boards`)
  .then((response) => {
    return (response.data.map(convertBoardFromAPI))
  })
  .catch((e) => console.log("error during getAllBoards!", e));
};

const getCardsForBoard = (boardId) => {
  const convertCardFromAPI = (cardData) => {
    return {
      id: cardData.card_id,
      message: cardData.message,
      likesCount: cardData.likes_count,
      board: cardData.board_id
    };
  };

  return axios.get(`${boardsURL}/boards/${boardId}/cards`)
    .then((response) => {
      return response.data.cards.map(convertCardFromAPI);})
    .catch((e) => console.log("error in Getting Cards for Board", e.message))
};

const App = () => {
  const defaultEmptyBoardList = [{
    title: '',
    owner:'',
    id: 0
    }];

  const [boards, setBoards] = useState(defaultEmptyBoardList);
  const [targetBoardId, setTargetBoardId] = useState(18);
  const [cards, setCards] = useState([])

  const fetchBoards = () => {
    getAllBoards()
      .then((boards) => setBoards(boards))
  }

  useEffect( () => {fetchBoards()}, [])

  const handleSelectBoard = (boardId) => {
    setTargetBoardId(boardId);
  };

  const currentBoard = () => {
    for (let board of boards) {
      if (board.id === targetBoardId) {
        return board;
      }}
    return boards[0]
  }

    const fetchCards = () => {
      getCardsForBoard(targetBoardId)
      .then((cards) => {setCards(cards);})

    };
    useEffect( () => {fetchCards()}, [targetBoardId]);


  // TO DO:
  // change handleLike to toggle T/F for users
  // instead of each click adding to Likes total 

  const handleLike = (cardId) => {
    // let newBoards = [...boards];

    // let targetIndex = findIndexOfTargetBoard()

    // newBoards[targetIndex].cards = newBoards[targetIndex].cards.map((card) => {
    //   if (cardId === card.id) {
    //     return { ...card, likesCount: card.likesCount + 1 };
    //   } else { return card; };
    // });

    // setBoards(newBoards);
  }

  const handleSubmitBoard = (newBoard) => { 
    const postBoardToAPI = (newBoard) => {
      let params = {
        title: newBoard.title,
        owner: newBoard.owner
      }
      return axios.post(`${boardsURL}/boards`, params)
      .then((response) => console.log('Board Posted!', response.data))
      .catch((e) => console.log(e));
    }
    postBoardToAPI(newBoard)
    .then(() => fetchBoards());
  };

  const handleDeleteBoard = (boardId) => {
    const deleteBoardFromAPI = (boardId) => {
      return axios.delete(`${boardsURL}/boards/${boardId}`)
      .then((response) => console.log('Board Deleted!', response.data))
      .catch((e) => console.log(e.message));
    }
    
    deleteBoardFromAPI(boardId)
    .then(() => fetchBoards());
  };

  const handleSubmitCard = (newCard) => {
    const postCardToAPI = (newCard) => {
      let params = {
        message: newCard.message,
        likes_count: 0,
        board_id: targetBoardId,
      }
      return axios.post(`${boardsURL}/boards/${targetBoardId}/cards`, params)
      .then((response) => console.log('Card Posted!', response.data))
      .catch((e) => console.log("error posting card!", e.message));
    };
    const nextId = Math.max(...cards.map(card => card.id)) + 1;
    const newCardObject = {
      id: nextId,
      message: newCard.message,
      board: targetBoardId,
      likesCount: 0,
    };
    postCardToAPI(newCardObject)
    .then(() => setCards((prevData) => [newCardObject, ...prevData]))
  };

  const handleDeleteCard = (cardId) => {
    const deleteCardFromAPI = (cardId) => {
      return axios.delete(`${boardsURL}/boards/${targetBoardId}/cards/${cardId}`)
      .then((response) => console.log('Card Deleted!', response.data))
      .catch((e) => console.log(e.message));
    };

    deleteCardFromAPI(cardId)
    .then(() => fetchCards());
  };

  return (
    <div className="App">
      <header>
        <h1>MNNJ INSPO BOARD</h1>
      </header>
      <main>
        <div>
          <NewBoardForm addBoard={handleSubmitBoard}/>
          <BoardSelectRadio 
            boards={boards} 
            onBoardSelect={handleSelectBoard}
            selectedBoardId={targetBoardId} />
        </div>
        <div>
          <Board 
            board_id={currentBoard().id} 
            title={currentBoard().title}
            owner={currentBoard().owner}
            deleteBoard={handleDeleteBoard}/>
          <CardList 
            cards={cards} 
            handleLike={handleLike} 
            deleteCard={handleDeleteCard}/>
          <NewCardForm addCard={handleSubmitCard} />
        </div>
      </main>
    </div>
  );
}

export default App;
