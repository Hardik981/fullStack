import { useState } from 'react';
import '../App.css';
function Form() {
    const [patternMsg, setPatternMsg] = useState(false);
    const [patternMsgName, setPatternMsgName] = useState("");
    const [phoneNumData, setPhoneNumData] = useState("");
    function checkNamePattern(data) {
        if (data === "") {
            setPatternMsg(false)
        }
        else {
            let pattern = /^[a-zA-Z]{1,20}$/;
            if (pattern.test(data)) {
                setPatternMsg(false)
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Name must be in 20 character alphabetic")
            }
        }
    }
    function checkPhonePattern(data) {
        if (data === "") {
            setPatternMsg(false)
        }
        else {
            data.length === 3 || data.length === 7 ? setPhoneNumData(data + "-") : setPhoneNumData(data)
            let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (pattern.test(data)) {
                setPatternMsg(false)
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Phone Number must be 10 digit number")
            }
        }
    }
    function checkEmailPattern(data) {
        if (data === "") {
            setPatternMsg(false)
        }
        else {
            let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (pattern.test(data)) {
                setPatternMsg(false)
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Invalid Email Pattern")
            }
        }
    }
    function checkHobbiesPattern(data) {
        if (data === "") {
            setPatternMsg(false)
        }
        else {
            let pattern = /^[a-zA-Z]{1,100}$/;
            if (pattern.test(data)) {
                setPatternMsg(false)
            }
            else {
                setPatternMsg(true)
                setPatternMsgName("Hobbies must be in 100 character alphabetic")
            }
        }
    }
    function formSubmit(e) {
        e.preventDefault();
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
            </div>
        </form>
    );
}

export default Form;