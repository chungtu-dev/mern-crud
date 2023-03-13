import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {

    const navigate = useNavigate()
    const [newAttachment, setNewAttachment] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [newGender, setNewGender] = useState("");

    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])

    const [provinceid, setProvinceid] = useState('');
    const [districtid, setDistrictId] = useState('');

    const [selectProvince, setSelectProvince] = useState('');
    const [selectDistrict, setSelectDistrict] = useState('');

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

            const filterProvince = provinceList.filter((i) => i.province_id === selectProvince)
            const nameProvice = Object.assign({}, ...filterProvince)

            const filterDistrict = districtList.filter((i) => i.district_id === selectDistrict)
            const nameDistrict = Object.assign({}, ...filterDistrict)

            const filterWard = wardList.filter((i) => i.district_id === nameDistrict.district_id)
            const nameWard = Object.assign({}, ...filterWard)

            const newUserUpdate = {
                ...inpval,
                gender: inpval.gender !== newGender ? newGender : inpval.gender,
                attachment: inpval.attachment !== newAttachment ? newAttachment : inpval.attachment,
                province: nameProvice.province_name,
                district: nameDistrict.district_name,
                ward: nameWard.ward_name
            }
            await axios.put(`http://localhost:5000/user/${id}`, newUserUpdate)
            alert('Updated user successfully!')
            navigate('/')
            // console.log('old user', inpval);
            // console.log('newUserUpdate', newUserUpdate);
        } catch (error) {
            console.log(error);
        }
    }

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

    /* #region: Province */
    useEffect(() => {
        const fetchDataProvinces = () => {
            axios.get('https://vapi.vnappmob.com/api/province')
                .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                        setProvinceList(data.results)
                        // console.log(data.results);

                    }
                    else {
                        console.log('error')
                    }
                }).catch((err) => {
                    console.log('error-catch', err)
                })
        }
        fetchDataProvinces()
    }, []);

    const handlecountry = (e) => {
        const getcountryid = e.target.value;
        setSelectProvince(e.target.value)
        setProvinceid(getcountryid);
    }
    /* #endregion */

    /* #region: District */
    useEffect(() => {
        const fetchDataDistrict = () => {
            axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceid}`)
                .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                        setDistrictList(data.results)
                    }
                    else {
                        console.log('error')
                    }
                }).catch((err) => {
                    console.log('error-catch', err)
                })
        }
        fetchDataDistrict()
    }, [provinceid])

    const handleDistrict = (e) => {
        const getstateid = e.target.value;
        setSelectDistrict(e.target.value)
        setDistrictId(getstateid);
    }
    /* #endregion */

    /* #region: Ward */
    useEffect(() => {
        const fetchDataWard = () => {
            axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtid}`)
                .then((res) => {
                    const { data } = res;
                    if (res.status === 200) {
                        setWardList(data.results)
                        // console.log(data.results);
                    }
                    else {
                        console.log('error')
                    }
                }).catch((err) => {
                    console.log('error-catch', err)
                })
        }
        fetchDataWard()
    }, [districtid])
    /* #endregion */


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
                <form className='mt-4' onSubmit={updateUser}>
                    <div className='row'>
                        <NavLink to='/'>home</NavLink>
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
                                                    </>) : <img className='img_base' src={inpval.attachment} alt="profile-img" />
                                                }

                                                <div className='fe_form-sub'>
                                                    <label className='btn_choose-new-img' htmlFor="inpfile">Chọn ảnh mới</label>
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

                                                <div className="mb-3 col-lg-12 col-md-12 col-12">
                                                    <span>Giới tính: <span style={{ fontWeight: 500 }}>{inpval.gender}</span></span>
                                                    <div className='checkBox_gender' onChange={handleChangeGender}>
                                                    <span>Chọn giới tính: </span>
                                                        <div className='check-gender-item'>
                                                            <input readOnly type="radio" value="Anh" name="gender" checked={newGender === "Anh"} /> <span className='checkBox_gender-info'>Anh</span>
                                                        </div>
                                                        <div className='check-gender-item'>
                                                            <input readOnly type="radio" value="Chị" name="gender" checked={newGender === "Chị"} /> <span className='checkBox_gender-info'>Chị</span>
                                                        </div>
                                                    </div>

                                                    <div className='mt-5 form_choose-another-address'>
                                                        <span>Địa chỉ: <span style={{ fontWeight: 500 }}>{inpval.province}, {inpval.district}, {inpval.ward}</span></span>

                                                        <div className='form_address'>
                                                            <h5>Chọn địa chỉ khác</h5>

                                                            <select name="country" className="form-control p-2 mb-2" onChange={(e) => handlecountry(e)}>
                                                                <option value="">--Chọn tỉnh thành--</option>
                                                                {
                                                                    provinceList.map((i) => (
                                                                        <option key={i.province_id} value={i.province_id} >{i.province_name}</option>
                                                                    ))
                                                                }
                                                            </select>


                                                            <select name="district" className="form-control p-2 mb-2" onChange={(e) => handleDistrict(e)} >
                                                                <option value="">--Chọn quận huyện--</option>
                                                                {
                                                                    districtList.map((i) => (
                                                                        <option key={i.district_id} value={i.district_id}>{i.district_name}</option>
                                                                    ))
                                                                }
                                                            </select>

                                                            <select name="ward" className="form-control p-2">
                                                                <option value="">--Chọn phường xã--</option>
                                                                {
                                                                    wardList.map((i) => (
                                                                        <option key={i.ward_id} value={i.ward_id}>{i.ward_name} </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='fe_form fe_form-input'>
                                                <div className="fe_inputBox mb-3 col-lg-12 col-md-12 col-12">
                                                    <input onChange={setData} value={inpval.name} type="text" name='name' required="required" />
                                                    <span>name</span>
                                                </div>

                                                <div className="fe_inputBox mb-3 col-lg-12 col-md-12 col-12">
                                                    <input onChange={setData} value={inpval.email} type="email" name='email' required="required" />
                                                    <span>email</span>
                                                </div>

                                                <div className="fe_inputBox mb-3 col-lg-12 col-md-12 col-12">
                                                    <input onChange={setData} value={inpval.age} type="number" name='age' required="required" />
                                                    <span>age</span>
                                                </div>
                                                <div className="fe_inputBox mb-3 col-lg-12 col-md-12 col-12">
                                                    <input onChange={setData} value={inpval.mobile} type="number" name='mobile' required="required" />
                                                    <span>mobile</span>
                                                </div>
                                                <div className="fe_inputBox mb-3 col-lg-12 col-md-12 col-12">
                                                    <input onChange={setData} value={inpval.work} type="text" name='work' required="required" />
                                                    <span>work</span>
                                                </div>
                                                <div className="fe_inputBox mb-3 col-lg-12 col-md-12 col-12">
                                                    <input onChange={setData} value={inpval.add} type="text" name='add' required="required" />
                                                    <span>add</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 col-lg-12 col-md-12 col-12">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Yêu cầu khác</label>
                                            <textarea onChange={setData} value={inpval.desc} name='desc' className="text_area-another-request form-control" rows="8" cols="10"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='btn_submit'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
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