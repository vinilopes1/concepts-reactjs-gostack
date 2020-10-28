import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function App() {
  
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response=>
     setRepositories(response.data)
      );
    },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository number: ${Date.now()}`,
      url: `http://github.com/vinilopes1/${Date.now()}`,
      techs: [
        'Dart'
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));  
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: 650
    },
  });

  const classes = useStyles();

  return(
    <TableContainer component={Paper} align="center">
      <Table className={classes.table} size="small" arial-label="simple-table">
      <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repositories.map(repo=>
            <TableRow key={repo.title}>
              <TableCell component="th" scope="row">
                {repo.title}
              </TableCell>
              <TableCell align="right">
                <TableRow>
                  <TableCell><button onClick={handleAddRepository}>Add</button></TableCell>
                  <TableCell><button onClick={()=> handleRemoveRepository(repo.id)}>Remove</button></TableCell>
                </TableRow>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // return (
  //   <div>
  //     {repositories.map(repo=>
  //       <ul data-testid="repository-list">
  //         <li key={repo.id}>
  //           {repo.title}
  //           <button onClick={handleRemoveRepository(repo.id)}>
  //             Remover
  //           </button>
  //         </li>
  //       </ul>
  //     )}
  //     <button onClick={handleAddRepository}>Adicionar</button>
  //   </div>
  // );
}

export default App;
