import React from "react";
import API from "../../../utils/api"

let BuilderContext;
const { Provider, Consumer } = (BuilderContext = React.createContext());

class BuilderProvider extends React.PureComponent {

    state = {
        builders: [],
        meta : {
          totalDocs : 0
        },
        selectedBuilder: null,
    };

    fetchBuilders = async (page, rowsPerPage = 5, name = null, deployed = null) => {
      API.builder().fetchPagination(page, rowsPerPage, name, deployed)
        .then(res => {
          this.setState ({
            builders : res.data.builders,
            meta : res.data.meta
          })
        })
        .catch(err => console.log(err))
    }

    fetchById = async (id, onSuccess) => {
      API.builder().fetchById(id)
        .then(res =>{
            this.setState ({
              selectedBuilder : res.data
            })
            onSuccess(this.state.selectedBuilder)
        })
        .catch(err => console.log(err))
    }
    
    createBuilder = (data, onSuccess)  => {
      API.builder().create(data)
        .then(res =>{
            this.setState ({
              selectedBuilder : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    updateBuilder = (id, data, onSuccess) => {
      API.builder().update(id, data)
        .then(res =>{
            this.setState ({
              selectedBuilder : res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
    }
    
    deleteBuilder = (id, onSuccess) => {
      API.builder().delete(id)
        .then(res =>{

          onSuccess()
        })
    }
    
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              fetchBuilders : this.fetchBuilders,
              fetchById : this.fetchById,
              createBuilder : this.createBuilder,
              updateBuilder : this.updateBuilder,
              deleteBuilder : this.deleteBuilder
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { BuilderProvider, Consumer, BuilderContext };
