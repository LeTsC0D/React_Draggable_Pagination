import "./styles.css";
import * as React from "react";
// import makeStyles from "@material-ui/core/styles/makeStyles";
// import Paper from "@material-ui/core/Paper";
// import { DropResult } from "react-beautiful-dnd";
// import DraggableList from "./components/DraggableList";
// import pick from "@cahil/utils/accessors/pick";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios"
import {
  Link 
} from "react-router-dom";



export default function App() {
  const [characters, updateCharacters] = useState([]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  useEffect(() => {
    const url =
      "http://rest.coinapi.io/v1/exchanges?apikey=A9491BCB-12EB-4C86-9F9E-CA0340831646";

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // const json = await response.json();
        // setCategories(json);
        updateCharacters(response.data);
        // console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <Link to="/allcoins" >
                All Coins
      </Link>
        <h1>All Dragable Exchange Names</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul 
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ exchange_id, website, name }, index) => {
                  return (
                    <Draggable key={index} draggableId={exchange_id} index={index}>
                      {(provided) =>  (
                        <li 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            style={{ backgroundColor: "lightgreen" }}
                            className="characters-thumb"
                          >
                            <p>{name}</p>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>



    </div>
  );
}
