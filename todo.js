import React, { useState, useEffect } from 'react'
import './style.css'
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodoList")

        if(lists)
        {
            return JSON.parse(lists);
        }
        else{
            return [];
        }
}
const Todo = () => {
    const [inputdata, setInputdata] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [Edititem, setEdititem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    //add the items function
    const addItem = () =>{
        if(!inputdata){
            alert("plze fill the data")
        } else if(inputdata && toggleButton){
            setItems(
                items.map((currElem)=>{ 
                    if(currElem.id == Edititem)
                    return  {...currElem, name : inputdata}
                    return currElem;
                })
            )
        
        setInputdata([]);
        setEdititem(null);
        setToggleButton(false);
     }
        else{
            const mynewInputData = {
                id : new Date().getTime().toString(),
                name : inputdata
            }
            setItems([...items,mynewInputData]);
            setInputdata("");
        }
    };
    // Edit the item
    const editItem = (index) => {
        const item_todo_edited = items.find((currElem) =>{
            return currElem.id == index;
        });
        setInputdata(item_todo_edited.name);
        setEdititem(index);
        setToggleButton(true);
    }
    const deleteItem = (index) =>{
       const updatedItem = items.filter((currElem)=>{
            return currElem.id!==index;
        });
        setItems(updatedItem);
    };
    const removeall = ()=>{
        setItems([]);
    }
    //adding local storage
    useEffect(()=>{
       localStorage.setItem("mytodoList",JSON.stringify(items));
    } ,[items])
  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
            <img src="./images/todo.svg" alt="todologo"/>
            <figcaption>Add your list here</figcaption>
            </figure>
            <div className = "addItems">
                <input type="text"
                placeholder="✍️ Add Item"
                className='form-control'
                value ={inputdata}
                onChange={(e)=>setInputdata(e.target.value)}/>
                {toggleButton ?  <i className="fa fa-edit add-btn" onClick={addItem}></i> :
                 <i className="fa fa-plus add-btn" onClick={addItem}></i>}
               
            </div>
            {/* show our items */}
            <div className='showItems'>
                {
                    items.map((currElem)=>{
                        return(
                            <div className='eachItem' key={currElem.id}>
                            <h3>{currElem.name}</h3>
                            <div className='todo-btn'>
                            <i className="fa fa-edit add-btn" onClick={()=>editItem(currElem.id)} ></i>
                            <i className="fa fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
                            </div>
                        </div>

                        )

                    })
                }
               

            </div>
            <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove All"
            onClick={removeall}>
                <span>Check list</span>
                </button>
                </div>
           </div>

        </div>
    
      
    </>
  );
};

export default Todo;
 