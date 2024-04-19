// src/MyApp.jsx
//import React from "react";
//import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';


function MyApp() {

  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function deleteCharacter(person) {
    deleteUser(characters[person])
      .then((res) => res.status == 204 ? removeOneCharacter(person) : undefined)
      .catch((error) => {
        console.log(error);
      })
  }

  function deleteUser(person) {
    const promise = fetch(`Http://localhost:8000/users/${person.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

    /*
  function updateList(person) { 
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
  }*/

/*    
  function updateList(person) { 
    postUser(person)
      .then((res) => res.status == 201 ? setCharacters([...characters, person]) : undefined)
      .catch((error) => {
        console.log(error);
      })
  }
  */

  function updateList(person) { 
    postUser(person)
      .then((res) => res.status == 201 ? res.json() : undefined)
      .then((json) =>{ if (json) setCharacters([...characters, json]);})
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }


  useEffect(() => {
    fetchUsers()
	      .then((res) => res.json())
	      .then((json) => setCharacters(json["users_list"]))
	      .catch((error) => { console.log(error); });
  }, [] );


    /*
  useEffect(() => {
    fetchUsers()
	      .then((res) => res.status == 201 ?
              res.json() : undefined
          ).then((json) => setCharacters(json["users_list"]))
	      .catch((error) => { console.log(error); });
  }, [] );
  */

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });


    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={deleteCharacter}
        //removeCharacter={removeOneCharacter}
      />

<Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
