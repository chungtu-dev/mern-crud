import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/user')
            setData(res.data)
            // console.log('data', data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) =>{
        try {
            await axios.delete(`http://localhost:5000/user/${id}`)
            getUser()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2 mb-2'>
                    <NavLink to='/register' className='btn btn-primary'>Add User</NavLink>
                </div>

                <table className="table mt-2">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">id</th>
                            <th scope="col">username</th>
                            <th scope="col">email</th>
                            <th scope="col">job</th>
                            <th scope="col">number</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((i) => (
                                <tr key={i._id}>
                                    <th scope="row">{i._id}</th>
                                    <td>{i.name}</td>
                                    <td>{i.email}</td>
                                    <td>{i.work}</td>
                                    <td>{i.desc}</td>
                                    <td className='d-flex justify-content-between'>
                                        <NavLink to={`view/${i._id}`} className='btn btn-success'><AiFillEye /></NavLink>
                                        <NavLink to={`edit/${i._id}`} className='btn btn-primary'><BsPencilSquare /></NavLink>
                                        <button onClick={()=>deleteUser(i._id)} className='btn btn-danger'><BsFillTrashFill /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home