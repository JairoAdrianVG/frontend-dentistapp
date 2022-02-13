import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';

const url = "http://localhost:8080/patient"

class ListPatients extends Component {
state = {
            patients: [],
            modalInsertar: false,
            modalDelete: false,
            form:{
                id: '',
                codePatient: '',
                name: '',
                age: '',
                telephone: '',
                email: '',
                codeShifts:'',
                typeModal: '',
            }
        }


        modalInsertar=()=>{
            this.setState({modalInsertar: !this.state.modalInsertar})
        }

        selectPatient=(patient)=>{
            this.setState({
                typeModal: 'refresh',
                form:{
                    id: patient.id,
                    name: patient.name,
                    age: patient.age,
                    telephone: patient.telephone,
                    email: patient.email,
                }
            })
        }

        petitionGet=()=>{
            axios.get(url).then(response=>{
            this.setState({patients: response.data});
        })
        }


        petitionDelete=()=>{
            axios.delete(url+"/"+this.state.form.id).then(response=>{
                this.setState({modalDelete: false});
                this.petitionGet();
            })
          }

        petitionPost=async()=>{
            axios.post(url, this.state.form).then(response=>{
                this.modalInsertar();
                this.petitionGet();
            }).catch(error=>{
                console.log(error.message);
              })
        }

        handleChange= async e=>{
            e.persist();
            await this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]: e.target.value
                }
            })
            console.log(this.state.form);
        }

        componentDidMount() {
            this.petitionGet();
          }
    
    render() {
        const {form}=this.state;
        return (
            <div className='table-patient'>
                <h2 className='text-center'>Patients List</h2>
                <div>
                    <button className='btn btn-info btn-block' onClick={()=>{this.setState({form: null, typeModal: 'insert'}); this.modalInsertar()}}>Add Patient</button> {"   "}
                    <ReactHTMLTableToExcel id='buttonExportExcel' className='btn btn-success btn-block' table='table-patients' filename='tablepatients' buttonText='Excel' />{"   "}
                    <a href="../pdf" target='_blank' className='btn btn-danger'>Ir al PDF</a>
                <div className='row'>
                    <br/>
                    <table className='table table-hover' id='table-patients'>
                        <thead>
                            <tr>
                                <th>Patient Code</th>
                                <th>Patient Name</th>
                                <th>Patient Age</th>
                                <th>Patient Telephone</th>
                                <th>Patient Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.patients.map(
                                    patient =>
                                    <tr key = {patient.id}>
                                        <td>{patient.codePatient}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.telephone}</td>
                                        <td>{patient.email}</td>
                                        <td>
                                            <button className='btn btn-info btn-sm' onClick={() => {this.selectPatient(patient); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button> {"   "}
                                            <button className='btn btn-danger btn-sm' onClick={()=>{this.selectPatient(patient); this.setState({modalDelete: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button> {"   "}
                                        </td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
                    </div>
                </div>
                <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label >Code Patient</label>
                    <input className="form-control" type="text" name="codePatient" id="codePatient" onChange={this.handleChange} value={form? form.codePatient: this.state.patients.length+1} />
                    <br />
                    <label >Name</label>
                    <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form? form.name: ''}/>
                    <br />
                    <label >Age</label>
                    <input className="form-control" type="text" name="age" id="age" onChange={this.handleChange} value={form? form.age: ''}/>
                    <br />
                    <label >Telephone</label>
                    <input className="form-control" type="text" name="telephone" id="telephone" onChange={this.handleChange} value={form? form.telephone: ''}/>
                    <br/>
                    <label >Email</label>
                    <input className="form-control" type="mail" name="email" id="email" onChange={this.handleChange} value={form? form.email: ''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                    {this.state.typeModal=='insert'}
                    <button className="btn btn-success" onClick={()=>this.petitionPost()}>
                    Save
                  </button><button className="btn btn-primary" onClick={()=>this.petitionPost()}>
                    Change
                  </button>
  
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancel</button>
                </ModalFooter>
          </Modal>

          
          <Modal isOpen={this.state.modalDelete}>
            <ModalBody>
               Estás seguro que deseas eliminar este paciente {form && form.name}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.petitionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalDelete: false})}>No</button>
            </ModalFooter>
          </Modal>
            </div>
        );
    }
}

export default ListPatients;