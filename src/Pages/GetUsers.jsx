import { useEffect, useState } from "react";


import {searchUsers, changeUser, deleteTask, addUser} from '../Services/Users.js';


const GetUsers = () => {

    const [newName, setnewName] = useState("");
    const [tableInfo, setTableInfo] = useState([]);
    const [isUpdate, setisUpdate] = useState(0);


    const loadTableData = async () => {
        let rsp = await searchUsers();
        if(rsp){
            setTableInfo(rsp);
        }else{
            window.alert('No se pudo cargar la informacion');
        }
    }

    const ChangeData= async ()=>{
        let newTask= {
            id: isUpdate,
            name: newName,
        }
        let rsp= await changeUser(newTask);
        console.log(rsp);
        window.location.reload();
    }

    const deleteUser= async (task)=>{
        let answer = window.confirm("Delete?");
        if (answer)
        { 
            let rsp =await deleteTask(task);
            console.log(rsp);
            window.location.reload();
        }
    }

    const add = async (task)=>{
        let rsp = await addUser(task);
        console.log(rsp);
    }

    useEffect(() => {
        loadTableData();
    }, [isUpdate])

    return(
        <div className="flex flex-col justify-center items-center">
            <div>
                <label htmlFor="">Nombre: </label>
                <input type="text" className="border-double border-4 border-sky-500 text-center mr-[1rem]" onChange={(e)=>setnewName(e.target.value)}/>
                <span className="w-[1rem]"><button className="text-sm text-white bg-sky-500 mt-[.7rem] py-[.3rem] px-[.6rem] rounded-sm" onClick={()=>add(newName)}><i class="bi bi-check"></i></button></span>
            </div>
            {
                    tableInfo.map((item, index) => {
                        return(
                            <div key={index} className="w-[95vw] flex justify-evenly">
                                <span className="w-[1rem]">{item.id}</span>
                                {
                                    isUpdate===item.id?
                                    <>
                                    <input type="text" name="name" id="name" className="border-double border-4 border-sky-500 text-center mr-[1rem]" placeholder="Task" onChange={(e)=>setnewName(e.target.value)}/>
                                    <span className="w-[1rem]"><button className="text-sm text-white bg-sky-500 mt-[.7rem] py-[.3rem] px-[.6rem] rounded-sm" onClick={()=>ChangeData(item.id)}><i class="bi bi-check"></i></button></span>
                                    <span className="w-[1rem]"><button className="text-sm text-white bg-sky-500 mt-[.7rem] py-[.3rem] px-[.6rem] rounded-sm" onClick={()=>setisUpdate(0)}><i class="bi bi-x-circle"></i></button></span>
                                    </>
                                    :
                                    <>
                                    <span className="w-[10rem]">{item.description}</span>
                                    <span className="w-[1rem]"><button className="text-sm text-white bg-sky-500 mt-[.7rem] py-[.3rem] px-[.6rem] rounded-sm" onClick={()=> setisUpdate(item.id)}><i class="bi bi-pencil-square"></i></button></span>
                                    <span className="w-[1rem]"><button className="text-sm text-white bg-sky-500 mt-[.7rem] py-[.3rem] px-[.6rem] rounded-sm" onClick={()=> deleteUser(item.id)}><i class="bi bi-trash3"></i></button></span>
                                    </>
                                }
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default GetUsers;