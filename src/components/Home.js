import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { getUserReq, deleteUserReq } from '../api'

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            getUserReq().then((res) => {
                setData(res)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            // await axios.delete(`http://localhost:5000/user/${id}`)
            deleteUserReq(id)
            alert("delete successfully!")
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
                <div className='home_content-info'>
                    {
                        data?.map((i) => (
                            <Card className='home_content-info-card' key={i.id}>
                                <div className='home_content-info-card-imgdiv'>
                                    <Card.Img className='home_content-info-card-img' variant="top" src={i.attachment} alt="img-profile" />
                                </div>
                                <Card.Body className='home-card-body'>
                                    <Card.Text className='home-info-cartText'>Name: <span>{i.name}</span></Card.Text>
                                    <Card.Text className='home-info-cartText'>Email: <span>{i.email}</span></Card.Text>
                                    <Card.Text className='home-info-cartText'>Work: <span>{i.work}</span></Card.Text>
                                    <Card.Text className='home-info-cartText'>Desc: <span>{i.desc}</span></Card.Text>
                                    <div className='area_btn-action'>
                                        <NavLink to={`view/${i.id}`} className='btn btn-success'><AiFillEye /></NavLink>
                                        <NavLink to={`edit/${i.id}`} className='btn btn-primary'><BsPencilSquare /></NavLink>
                                        <button onClick={() => deleteUser(i.id)} className='btn btn-danger'><BsFillTrashFill /></button>
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