import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

const url = "http://localhost:8080/storage"

const StorageComponent = () => {

const [data, setData] = useState([]);
const [modalInsert, setModalInsert] = useState(false); 
const [modalDelete, setModalDelete] = useState(false); 
const [modalAdd, setModalAdd] = useState(false); 

const [selectItem, setSelectItem] = useState({
    idItem: '',
    codeItem:'',
    name:'',
    typeItem: '',
    amount:''
});

const chooseItem = (product, occasion) =>{ 
    setSelectItem(product);
(occasion === 'Edit')?setModalInsert(true):setModalDelete(true);
};


const handleChange=e=>{
    const {name, value}= e.target;
    setSelectItem((prevState)=>({
        ...prevState,
        [name]: value
    }));
};

const edit=async()=>{
    await axios.post(url, selectItem).then(res =>{
        var newData=data;
        newData.map(products=>{
            if(products.idItem===selectItem.idItem){
                products.name=selectItem.name;
                products.codeItem=selectItem.codeItem;
                products.typeItem=selectItem.typeItem;
                products.amount=selectItem.amount;
            }
        })
        setData(newData);
        setModalInsert(false);
    })
};

const petitionPost=async()=>{
    await axios.post(url,selectItem).then( res =>{
        setData(data.concat(res.data))
    });
    setModalAdd(false)
}

const deleteItem=async()=>{
    await axios.delete(url+"/"+selectItem.idItem).then(res=>{
        setData(data.filter(products=>products.idItem!==selectItem.idItem));
        setModalDelete(false);
    })

}


const openModalAdd=()=>{
    setSelectItem(null);
    setModalAdd(true);
}


const add=()=>{
var valueAdd=selectItem;
valueAdd.idItem=data[data.lenght-1].idItem+1;
var newData= data;
data.push(valueAdd);
setData(newData);
setModalAdd(false);
}

    
useEffect(()=>{
    axios.get(url).then(res =>{
        setData(res.data)});
    }, []);


    

    return (
        <div>
              <h2 className='text-center'>Storage</h2>
              <button className='btn btn-success btn-block' onClick={()=>openModalAdd()}>Add new item</button>
              <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map(product =>
                                    <tr key = {product.idItem}>
                                        <td>{product.codeItem}</td>
                                        <td>{product.name}</td>
                                        <td>{product.typeItem}</td>
                                        <td>{product.amount}</td>
                                        <td>
                                            <button className='btn btn-info btn-sm' onClick={()=>chooseItem(product, 'Edit')} ><FontAwesomeIcon icon={faEdit}/></button> {"   "}
                                            <button className='btn btn-danger btn-sm' onClick={()=>chooseItem(product, 'Delete')}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>

                    <Modal isOpen={modalInsert}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>setModalInsert(false)}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label >Product Code</label>
                    <input className="form-control" type="text" name="codeItem" id="codeItem" value={selectItem && selectItem.codeItem} onChange={handleChange}/>
                    <br />
                    <label >Name</label>
                    <input className="form-control" type="text" name="name" id="name" value={selectItem && selectItem.name} onChange={handleChange}/>
                    <br />
                    <label >Type Product</label>
                    <input className="form-control" type="text" name="typeItem" id="typeItem" value={selectItem && selectItem.typeItem} onChange={handleChange}/>
                    <br />
                    <label >Amount</label>
                    <input className="form-control" type="text" name="amount" id="amount" value={selectItem && selectItem.amount} onChange={handleChange}/>
                    <br/>
                    </div>   
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={()=>edit()}> 
                    Save </ button>
  
                    <button className="btn btn-danger" onClick={()=>setModalInsert(false)}>Cancel</button>
                </ModalFooter>
                </Modal>

                <Modal isOpen={modalAdd}>
                <ModalHeader style={{display: 'block'}}>
                  <h3>Add new Item</h3>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label >Product Code</label>
                    <input className="form-control" type="text" name="codeItem" id="codeItem" onChange={handleChange}/>
                    <br />
                    <label >Name</label>
                    <input className="form-control" type="text" name="name" id="name" value={selectItem ? selectItem.name : ''} onChange={handleChange}/>
                    <br />
                    <label >Type Product</label>
                    <input className="form-control" type="text" name="typeItem" id="typeItem" value={selectItem? selectItem.typeItem : ''} onChange={handleChange}/>
                    <br />
                    <label >Amount</label>
                    <input className="form-control" type="text" name="amount" id="amount" value={selectItem? selectItem.amount : ''} onChange={handleChange}/>
                    <br/>
                    </div>   
                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-success" onClick={()=>petitionPost()}> 
                    Save </ button>
  
                    <button className="btn btn-danger" onClick={()=>setModalAdd(false)}>Cancel</button>
                </ModalFooter>
                </Modal>

                <Modal isOpen={modalDelete}>
            <ModalBody>
               Estás seguro que deseas eliminar {selectItem && selectItem.name} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>deleteItem()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>setModalDelete(false)}>No</button>
            </ModalFooter>
          </Modal>
        </div> );
};


export default StorageComponent;