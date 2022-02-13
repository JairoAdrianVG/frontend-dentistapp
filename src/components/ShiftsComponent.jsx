import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { Table } from 'reactstrap';
import axios from 'axios';

const url = "http://localhost:8080/shifts";




const Example = () => {
    const [data, setData] = useState([]);
    const [modalInsert, setModalInsert] = useState(false); 
    const [modalDelete, setModalDelete] = useState(false); 

    const [selectShift, setSelectShift] = useState({
        idShifts: '',
        codeShifts:'',
        codePatient:'',
        namePatient:'',
        shiftsDate:''
    });

    const openModalAdd=()=>{
        setSelectShift(null)
        setModalInsert(true);
    }

    const handleChange=e=>{
        const {name, value}= e.target;
        setSelectShift((prevState)=>({
            ...prevState,
            [name]: value
        }));
    };

    const chooseShift = (turn, occasion) =>{ 
        setSelectShift(turn);
    (occasion === 'Edit')?setModalInsert(true):setModalDelete(true);
    };

    const edit=async()=>{
        await axios.post(url, selectShift).then(res =>{
            var newData=data;
            newData.map(shifts=>{
                if(shifts.idItem===selectShift.idItem){
                    shifts.name=selectShift.name;
                    shifts.codeShifts=selectShift.codeShifts;
                    shifts.codePatient=selectShift.codePatient;
                    shifts.namePatient=selectShift.namePatient;
                    shifts.shiftsDate=selectShift.shiftsDate;
                }
            })
            setData(newData);
            setModalInsert(false);
        })
    };

    const petitionPost=async()=>{
        await axios.post(url, selectShift).then( res =>{
            setData(data.concat(res.data))
            console.log(data);
        });
        setModalInsert(false)
    }

    const deleteShift=async()=>{
        await axios.delete(url+"/"+selectShift.idShifts).then(res=>{
            setData(data.filter(shifts=>shifts.idShifts!==selectShift.idShifts));
            setModalDelete(false);
        })
    }

    useEffect(()=>{
        axios.get(url).then(res =>{
            setData(res.data)});
            console.log(data);
        }, []);
    

  return (
      <div>
    <button className='btn btn-success btn-block' onClick={()=>openModalAdd()} >Add Shifts</button>
    <br />
    <br />
            
        <div className='grid'> 
             {data.map(shift=>(

                    <Card>
                        <Card.Header><h6>Shifts number: {shift.codeShifts} </h6></Card.Header>
                        <Card.Body>

                        <Card.Title>{shift.namePatient}</Card.Title>
                        <Card.Text>
                        Number Patient: {shift.codePatient} <br></br> Date: {shift.shiftsDate}
                        </Card.Text>
                        <Button  variant="info"  onClick={()=>chooseShift(shift, 'Edit')}><FontAwesomeIcon icon={faEdit}/></Button> {"   "}
                        <Button  variant="danger" onClick={()=>chooseShift(shift, 'Delete')}><FontAwesomeIcon icon={faTrashAlt}/></Button>

                        </Card.Body>
                    </Card>
                

                )
            )}
        </div>

    <Modal isOpen={modalInsert}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>setModalInsert(false)}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label >Shifts Code</label>
                    <input className="form-control" type="text" name="codeShifts" id="codeShifts" placeholder='Shifts Code' value={selectShift && selectShift.codeShifts} onChange={handleChange}/>
                    <br />
                    <label >Code Patient</label>
                    <input className="form-control" type="text" name="codePatient" id="codePatient" placeholder='Code Patient' value={selectShift && selectShift.codePatient} onChange={handleChange}/>
                    <br />
                    <label >Name</label>
                    <input className="form-control" type="text" name="namePatient" id="namePatient" placeholder='Name Patient' value={selectShift && selectShift.namePatient} onChange={handleChange} />
                    <br />
                    <label >Date</label>
                    <input className="form-control" type="datetime" name="shiftsDate" id="shiftsDate" placeholder='YYYY-MM-DD hh:mm:ss' value={selectShift && selectShift.shiftsDate} onChange={handleChange}/>
                    </div>   
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={()=>petitionPost()}> 
                    Save </ button>
  
                    <button className="btn btn-danger"onClick={()=>setModalInsert(false)}>Cancel</button>
                </ModalFooter>
                </Modal>

                <Modal isOpen={modalDelete}>
            <ModalBody>
               Estás seguro que deseas eliminar el turno de {selectShift && selectShift.namePatient} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>deleteShift()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>setModalDelete(false)}>No</button>
            </ModalFooter>
          </Modal>

    </div>
  );
};

export default Example;