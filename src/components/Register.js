import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";
import {postNewUserReq} from '../api/index'

const Register = () => {

    const navigation = useNavigate()

    const [provinceList, setProvinceList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [wardList, setWardList] = useState([])

    const [provinceid, setProvinceid] = useState('');
    const [districtid, setDistrictId] = useState('');

    const [selectProvince, setSelectProvince] = useState('');
    const [selectDistrict, setSelectDistrict] = useState('');

    const [gender, setGender] = useState("Male");

    const [attachment, setAttachment] = useState("");
    const [selectedImage, setSelectedImage] = useState();

    const [inpval, setINP] = useState({
        name: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        add: '',
        desc: '',
    })

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

    const handleChangeGender = (e) => {
        setGender(e.target.value);
        // console.log(e.target.value);
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setAttachment(base64);

        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
        setAttachment()
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

    const createNewUser = async (e) => {
        e.preventDefault();
        try {
            const filterProvince = provinceList.filter((i) => i.province_id === selectProvince)
            const nameProvice = Object.assign({}, ...filterProvince)
            // console.log('Province name',nameProvice.province_name);

            const filterDistrict = districtList.filter((i) => i.district_id === selectDistrict)
            const nameDistrict = Object.assign({}, ...filterDistrict)
            // console.log('Province name',nameDistrict.district_name);

            const filterWard = wardList.filter((i) => i.district_id === nameDistrict.district_id)
            const nameWard = Object.assign({}, ...filterWard)
            // console.log('Province name',nameWard.ward_name);

            // const fullAddress = nameProvice.province_name + ',' + nameDistrict.district_name + ',' + nameWard.ward_name
            // console.log('full address', fullAddress);

            const info = {
                ...inpval,
                gender,
                attachment,
                province: nameProvice.province_name,
                district: nameDistrict.district_name,
                ward: nameWard.ward_name
            }
            // console.log('info', info);

            // await axios.post('http://localhost:5000/user', info)
            postNewUserReq(info)
            alert("regist successfully!")
            navigation('/')

        } catch (error) {
            console.log(error);
        }
    }

    const setData = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    return (
        <div className='container body'>
            <NavLink to='/'>home</NavLink>

            <form className='mt-4' onSubmit={createNewUser}>
                <div className='container_form'>
                    <div className='form'>
                        <div className='form_inp'>
                            <div className='inputBox mb-3 col-lg-6 col-md-6 col-12'>
                                <input onChange={setData} value={inpval.name} type="text" name='name' required='required' />
                                <span>Tên</span>
                            </div>

                            <div className='checkBox_gender' onChange={handleChangeGender}>
                                <input readOnly type="radio" value="Male" name="gender" checked={gender === "Male"} /> <span className='checkBox_gender-info'>Anh</span>
                                <input readOnly type="radio" value="Female" name="gender" checked={gender === "Female"} /> <span className='checkBox_gender-info'>Chị</span>
                            </div>

                            <div className="inputBox mb-3 col-lg-6 col-md-6 col-12">
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">email</label> */}
                                <input onChange={setData} value={inpval.email} type="email" name='email' required='required' />
                                <span>Email</span>
                            </div>
                            <div className="inputBox mb-3 col-lg-6 col-md-6 col-12">
                                <input onChange={setData} value={inpval.age} type="number" name='age' required='required' />
                                <span>Tuổi</span>
                            </div>
                            <div className="inputBox mb-3 col-lg-6 col-md-6 col-12">
                                <input onChange={setData} value={inpval.mobile} type="number" name='mobile' required='required' />
                                <span>Sđt</span>
                            </div>
                            <div className="inputBox mb-3 col-lg-6 col-md-6 col-12">
                                <input onChange={setData} value={inpval.work} type="text" name='work' required='required' />
                                <span>Công việc</span>
                            </div>
                            <div className="inputBox mb-3 col-lg-6 col-md-6 col-12">
                                <input onChange={setData} value={inpval.add} type="text" name='add' required='required' />
                                <span>Vị trí</span>
                            </div>
                        </div>

                        <div className="form_choose_address">
                            <div>
                                <h5>Chọn thông tin địa chỉ</h5>

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

                            <div className="form_choose_address-another-info">
                                <span>Thông tin khác</span>
                                <textarea onChange={setData} value={inpval.desc} name='desc' className="form-control form_choose_address-areatext" rows="8" cols="10"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='choose_img'>
                        <label htmlFor="inpfile">Chọn ảnh</label>
                        <input
                            id='inpfile'
                            className='choose_img-btn'
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                uploadImage(e);
                            }}
                        />
                        {
                            attachment && (
                                <>
                                    <img className='img_base' src={inpval.attachment} alt="profile-img" />
                                    {selectedImage && (
                                        <div style={styles.preview}>
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                style={styles.image}
                                                alt="Thumb"
                                            />
                                            <button onClick={removeSelectedImage} className='delete_img'>
                                                Remove This Image
                                            </button>
                                        </div>
                                    )}
                                </>
                            )
                        }

                    </div>

                </div>
                <div style={styles.submit_btn}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register

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
    image: { maxWidth: "100%", maxHeight: 320 },
    submit_btn: {
        display: "flex",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
    }
};