import React from "react";
import API from "../../../utils/api"

let MachineContext;
const { Provider, Consumer } = (MachineContext = React.createContext());

class MachineProvider extends React.PureComponent {

    state = {
        machines: [],
        meta : {
          totalDocs : 0
        },
        selectedMachine: null,
    };

    fetchMachines = async (page, rowsPerPage = 5, name = null, ip = null) => {
      API.machine().fetchPagination(page, rowsPerPage, name, ip)
        .then(res => {
          this.setState ({
            machines : res.data.machines,
            meta : res.data.meta
          })
        })
        .catch(err => console.log(err))
    }

    fetchById = async (id, onSuccess) => {
      API.machine().fetchById(id)
        .then(res =>{
            this.setState ({
              selectedMachine : res.data
            })
            onSuccess(this.state.selectedMachine)
        })
        .catch(err => console.log(err))
    }
    
    createMachine = (data, onSuccess)  => {
      API.machine().create(data)
        .then(res =>{
            this.setState ({
              selectedMachine : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateMachine = (id, data, onSuccess) => {
      API.machine().update(id, data)
        .then(res =>{
            this.setState ({
              selectedMachine : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    deleteMachine = (id, onSuccess) => {
      API.machine().delete(id)
        .then(res =>{

          onSuccess()
        })
    }
    
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              fetchMachines : this.fetchMachines,
              fetchById : this.fetchById,
              createMachine : this.createMachine,
              updateMachine : this.updateMachine,
              deleteMachine : this.deleteMachine
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { MachineProvider, Consumer, MachineContext };
