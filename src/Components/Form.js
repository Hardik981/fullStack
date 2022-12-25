import { useState, useEffect } from 'react';
import '../App.css';
function Form(props) {
    const [patternMsg, setPatternMsg] = useState(false);
    const [patternMsgName, setPatternMsgName] = useState("");
    const [phoneNumData, setPhoneNumData] = useState("");
    const [formData, setFormData] = useState({});
    function checkNamePattern(value) {
        if (value === "") {
            setPatternMsg(false)
        }
        else {
            let pattern = /[a-zA-Z, ']{3,20}$/;
            if (pattern.test(value)) {
                setPatternMsg(false)
                setFormData({ ...formData, name: value })
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Name must be 3 to 20 alphabetic character")
            }
        }
    }
    function checkPhonePattern(value) {
        if (value === "") {
            setPatternMsg(false)
        }
        else {
            value.length === 3 || value.length === 7 ? setPhoneNumData(value + "-") : setPhoneNumData(value)
            let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (pattern.test(value)) {
                setPatternMsg(false)
                setFormData({ ...formData, phone: value })
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Phone Number must be 10 digit number")
            }
        }
    }
    function checkEmailPattern(value) {
        if (value === "") {
            setPatternMsg(false)
        }
        else {
            let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (pattern.test(value)) {
                setPatternMsg(false)
                setFormData({ ...formData, email: value })
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Invalid Email Format")
            }
        }
    }
    function checkHobbiesPattern(value) {
        if (value === "") {
            setPatternMsg(false)
        }
        else {
            let pattern = /^[a-zA-Z ]{1,30}$/;
            if (pattern.test(value)) {
                setPatternMsg(false)
                setFormData({ ...formData, hobbies: value })
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Hobbies must be in 30 character alphabetic")
            }
        }
    }
    function formSubmit(e) {
        e.preventDefault();
        let passPattern = true
        if (Object.keys(formData).length === 0) {
            setPatternMsg(true)
            setPatternMsgName("No Data Given")
        }
        else {
            let namePattern = /[a-zA-Z, ']{3,20}$/;
            let phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            let hobbiesPattern = /^[a-zA-Z ]{1,30}$/;
            if (!namePattern.test(formData.name)) passPattern = false
            if (!phonePattern.test(formData.phone)) passPattern = false
            if (!emailPattern.test(formData.email)) passPattern = false
            if (!hobbiesPattern.test(formData.hobbies)) passPattern = false
            if (passPattern) {
                setPatternMsg(true)
                setPatternMsgName("Valid Data")
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Invalid Data or not Completed")
            }
        }
    }
    return (
        <form onSubmit={formSubmit}>
            <div className="input-block">
                <label>Name</label>
                <input type='text' onChange={(e) => checkNamePattern(e.target.value)} />
            </div>
            <div className="input-block">
                <label>Phone Number</label>
                <input type="Phone" value={phoneNumData} onChange={(e) => checkPhonePattern(e.target.value)} />
            </div>
            <div className="input-block">
                <label>Email</label>
                <input type="Email" onChange={(e) => checkEmailPattern(e.target.value)} />
            </div>
            <div className="input-block">
                <label>Hobbies</label>
                <input type="text" onChange={(e) => checkHobbiesPattern(e.target.value)} />
            </div>
            <div className="input-block">
                <input type="submit" value='Save' />
                {patternMsg && <span className='wrongPatternMsg'>{patternMsgName}</span>}
                <button onClick={() => props.showForm(false)}>Cancel</button>
            </div>
        </form>
    );
}

export default Form;