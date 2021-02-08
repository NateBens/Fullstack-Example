import React, { useState, useEffect } from 'react';

async function fetchContacts() {
    const response =  await fetch('https://localhost:5001/api/contacts', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return await response.json();
}
  
function useFetchContacts() {
    const [isFetching, setFetching] = useState(false);
    const [contacts, setContacts] = useState([]);

    useEffect(function fetch() {
        (async function() {
        setFetching(true);
        setContacts(await fetchContacts());
        setFetching(false);
        })();
    }, []);
    //console.log(contacts);

    return [contacts,isFetching];
}

async function fetchGroups() {
    const response =  await fetch('https://localhost:5001/api/groups', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return await response.json();
}

function useFetchGroups() {
    const [isFetching, setFetching] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(function fetch() {
        (async function() {
        setFetching(true);
        setGroups(await fetchGroups());
        setFetching(false);
        })();
    }, []);
    //console.log(contacts);

    return [groups,isFetching];
}

  export { useFetchContacts, useFetchGroups };