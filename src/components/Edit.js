import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {

    const navigate = useNavigate()
    const [newAttachment, setNewAttachment] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [newGender, setNewGender] = useState("");

    const { id } = useParams()
    // console.log(id);

    const [inpval, setINP] = useState({
        name: '',
        gender: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        add: '',
        desc: '',
    })

    const getUserById = async () => {
        const res = await axios.get(`http://localhost:5000/user/${id}`)
        setINP(res.data)
    }

    useEffect(() => {
        getUserById()
    }, [])

    const updateUser = async (e) => {
        e.preventDefault()
        try {
            const newUserUpdate = {
                ...inpval,
                gender: inpval.gender !== newGender ? newGender : inpval.gender,
                attachment: inpval.attachment !== newAttachment ? newAttachment : inpval.attachment,
            }
            await axios.put(`http://localhost:5000/user/${id}`, newUserUpdate)
            // alert('Updated user successfully!')
            // navigate('/')
            console.log('old user', inpval);
            console.log('gender new', newGender);
            console.log('newUserUpdate', newUserUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    // console.log('inpval',inpval);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setNewAttachment(base64);

        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleChangeGender = (e) => {
        setNewGender(e.target.value);
    }

    const setData = (e) => {
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    return (
        <div>
            <div className='container'>
                <NavLink to='/'>home</NavLink>

                <form className='mt-4' onSubmit={updateUser}>
                    <div className='row'>




                        <div className="fe_body">
                            <div className="fe_container">
                                <div className='fe_box'>
                                    <div className='fe_cover'></div>
                                    <div className='fe_shadow'></div>
                                    <div className='fe_content'>

                                        <div className='fe_main-form'>
                                            <div className='fe_form-sub'>
                                                {
                                                    newAttachment ? (<>
                                                        {selectedImage && (
                                                            <div style={styles.preview}>
                                                                <img
                                                                    src={URL.createObjectURL(selectedImage)}
                                                                    style={styles.image}
                                                                    alt="Thumb"
                                                                />
                                                            </div>
                                                        )}
                                                    </>) : <img className='img_base' src={inpval.attachment}
                                                        style={{ width: 150 }} alt="profile-img" />
                                                }

                                                <div className='fe_form-sub'>
                                                    <label htmlFor="inpfile">Chọn ảnh mới</label>
                                                    <input
                                                        style={{ visibility: 'hidden' }}
                                                        id='inpfile'
                                                        className='choose_img-btn'
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            uploadImage(e);
                                                        }}
                                                    />
                                                </div>

                                                <div className="mb-3 col-lg-6 col-md-6 col-12">
                                                    <span>Giới tính: {inpval.gender}</span>
                                                    <div className='checkBox_gender' onChange={handleChangeGender}>
                                                        <input readOnly type="radio" value="Anh" name="gender" checked={newGender === "Anh"} /> <span className='checkBox_gender-info'>Anh</span>
                                                        <input readOnly type="radio" value="Chị" name="gender" checked={newGender === "Chị"} /> <span className='checkBox_gender-info'>Chị</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='fe_form fe_form-input'>
                                                <div className="fe_inputBox mb-3 col-lg-6 col-md-6 col-12">
                                                    <input onChange={setData} value={inpval.name} type="text" name='name' required="required" />
                                                    <span>name</span>
                                                </div>

                                                <div className="fe_inputBox mb-3 col-lg-6 col-md-6 col-12">
                                                    <input onChange={setData} value={inpval.email} type="email" name='email' required="required" />
                                                    <span>email</span>
                                                </div>

                                                <div className="fe_inputBox mb-3 col-lg-6 col-md-6 col-12">
                                                    <input onChange={setData} value={inpval.age} type="number" name='age' required="required" />
                                                    <span>age</span>
                                                </div>
                                                <div className="fe_inputBox mb-3 col-lg-6 col-md-6 col-12">
                                                    <input onChange={setData} value={inpval.mobile} type="number" name='mobile' required="required" />
                                                    <span>mobile</span>
                                                </div>
                                                <div className="fe_inputBox mb-3 col-lg-6 col-md-6 col-12">
                                                    <input onChange={setData} value={inpval.work} type="text" name='work' required="required" />
                                                    <span>work</span>
                                                </div>
                                                <div className="fe_inputBox mb-3 col-lg-6 col-md-6 col-12">
                                                    <input onChange={setData} value={inpval.add} type="text" name='add' required="required" />
                                                    <span>add</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">desc</label>
                            <textarea onChange={setData} value={inpval.desc} name='desc' className="form-control" rows="8" cols="10"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    preview: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: 150, maxHeight: 320 },
};