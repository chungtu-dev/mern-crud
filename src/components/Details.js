import React, { useEffect, useState } from 'react'
import { AiFillMail, AiFillPhone } from 'react-icons/ai'
import { BsPencilSquare, BsFillTrashFill, BsFillBriefcaseFill } from 'react-icons/bs'
import { MdOutlineLocationOn } from 'react-icons/md'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useParams, NavLink } from 'react-router-dom'
import {getUserByIdReq} from '../api/index'

const Details = () => {

  const { id } = useParams()
  const [inpval, setINP] = useState({
    name: '',
    gender:'',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: '',
  })

  const getUserById = async () => {
    // const res = await axios.get(`http://localhost:5000/user/${id}`)
    getUserByIdReq(id).then((res)=>{
      try {
        setINP(res)
      } catch (error) {
        console.log(error);
      }
    })
  }

  useEffect(() => {
    getUserById()
  }, [])

  return (
    <div className='container mt-3'>
      <h1 style={{ fontWeight: 400 }}>Welcome {inpval.name}</h1>

      <NavLink to='/'>home</NavLink>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          {/* <div className="add_btn">
            <button className='btn btn-primary mx-12'><BsPencilSquare /></button>
            <button className='btn btn-danger' style={{ marginLeft: 10 }}><BsFillTrashFill /></button>
          </div> */}
          <div className="row">
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <img src={inpval.attachment} style={{ width: 200 }} alt="profile-img" />
              <h3 className="mt-3">Name: <span style={{ fontWeight: 400 }}>{inpval.name}</span></h3>
              <h3 className="mt-3">Gender: <span style={{ fontWeight: 400 }}>{inpval.gender}</span></h3>
              <h3 className="mt-3">Age: <span style={{ fontWeight: 400 }}>{inpval.age}</span></h3>
              <p><AiFillMail />Email: <span>{inpval.email}</span></p>
              <p><BsFillBriefcaseFill />Dev: <span>{inpval.work}</span></p>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className='mt-5'><AiFillPhone />Mobile: <span>{inpval.mobile}</span></p>
              <p className='mt-3'><MdOutlineLocationOn />location: <span>{inpval.add}</span></p>
              <p>Desc: <span>{inpval.desc}</span></p>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p>Province: <span>{inpval.province}</span></p>
              <p className='mt-3'>District: <span>{inpval.district}</span></p>
              <p>Ward: <span>{inpval.ward}</span></p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Details