import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

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

    const deleteUser = async (id) => {
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

                {/* <table className="table mt-2">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">image</th>
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
                                    <td scope="row">
                                        <img style={{ width: 50, height: 50, borderRadius: 50 }} src={i.attachment} alt="img-profile" />
                                    </td>
                                    <td>{i.name}</td>
                                    <td>{i.email}</td>
                                    <td>{i.work}</td>
                                    <td>{i.desc}</td>
                                    <td className='area_btn-action'>
                                        <NavLink to={`view/${i._id}`} className='btn btn-success'><AiFillEye /></NavLink>
                                        <NavLink to={`edit/${i._id}`} className='btn btn-primary'><BsPencilSquare /></NavLink>
                                        <button onClick={() => deleteUser(i._id)} className='btn btn-danger'><BsFillTrashFill /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>*/}

                <div className='home_content-info'>
                    {
                        data?.map((i) => (
                            <Card className='home_content-info-card' key={i._id}>
                                <div className ='home_content-info-card-imgdiv'>
                                    <Card.Img className='home_content-info-card-img' variant="top" src={i.attachment} alt="img-profile" />
                                </div>
                                <Card.Body className='home-card-body'>
                                    <Card.Text className='home-info-cartText'>Name: <span>{i.name}</span></Card.Text>
                                    <Card.Text className='home-info-cartText'>Email: <span>{i.email}</span></Card.Text>
                                    <Card.Text className='home-info-cartText'>Work: <span>{i.work}</span></Card.Text>
                                    <Card.Text className='home-info-cartText'>Desc: <span>{i.desc}</span></Card.Text>
                                    <div className='area_btn-action'>
                                        <NavLink to={`view/${i._id}`} className='btn btn-success'><AiFillEye /></NavLink>
                                        <NavLink to={`edit/${i._id}`} className='btn btn-primary'><BsPencilSquare /></NavLink>
                                        <button onClick={() => deleteUser(i._id)} className='btn btn-danger'><BsFillTrashFill /></button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home