import React from "react";
import MaterialTable, { MTableEditField } from "material-table";
import api from "./utils/api";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import { editPerson, deletePerson, setPerson } from "./actions/index";

const Form = props => {
  return (
    <div>
      <Container>
        <MaterialTable
          options={{
            search: false,
            paging: false,
            toolbarButtonAlignment: "left",
            actionsColumnIndex: 4
          }}
          components={{
            EditField: props => <MTableEditField fullWidth {...props} />
          }}
          title="Agregar programa"
          columns={[
            {
              title: "Name",
              field: "name"
            },
            { title: "surnames", field: "surname" },
            { title: "Email", field: "Email" },
            {
              title: "Cuit",
              field: "cuit"
            }
          ]}
          data={props.person}
          editable={{
            onRowAdd: newData => {
              return api.post("/person", newData).then(result => {
                const person = {
                  id: result.data.response,
                  ...newData
                };
                props.setPerson(person);
              });
            },
            onRowUpdate: newData => {
              return api.put(`/person/${newData.id}`, newData).then(result => {
                const person = {
                  id: result.data.response,
                  ...newData
                };
                props.editPerson(person);
              });
            },
            onRowDelete: newData => {
              return api
                ._delete(`/person/${newData.id}`, newData)
                .then(result => {
                  const person = {
                    id: result.data.response,
                    ...newData
                  };
                  props.deletePerson(person);
                });
            }
          }}
          style={{
            marginBottom: 20
          }}
          localization={{
            header: {
              actions: "Acciones"
            },
            body: {
              emptyDataSourceMessage: "No hay ningúna persona  cargada"
            }
          }}
        ></MaterialTable>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('state', state)
  return { person: state.person };
};

const mapDispatchToProps = dispatch => {
  return {
    setPerson: person => dispatch(setPerson(person)),
    editPerson: person => dispatch(editPerson(person)),
    deletePerson: person => dispatch(deletePerson(person))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
