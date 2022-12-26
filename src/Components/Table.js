import '../App.css';
import { useState } from 'react';
function Table() {
    const [data, setData] = useState([{ name: "Hardik", phone: 2, email: "abc@abc.com", hobbies: "cricket", id: 0 },
    { name: "Anand", phone: 6, email: "abc@abc.com", hobbies: "football,swimming,dancing", id: 1 },
    { name: "Google", phone: 9, email: "abc@abc.com", hobbies: "baseball", id: 2 }])
    const [viewMode, setViewMode] = useState(() => data.map(() => true));
    const [patternMsgName, setPatternMsgName] = useState("")
    const [sendData, setSendData] = useState([]);
    const [selectID, setSelectID] = useState([]);

    function changeViewState(state, index) {
        let temp = [...viewMode]
        temp[index] = state
        setViewMode([...temp])
    }
    function changeName(value, index) {
        if (value === "") {
            setPatternMsgName("")
            let temp = [...data]
            temp[index].name = value
            setData([...temp])
        }
        else {
            let pattern = /[a-zA-Z, ']{3,20}$/;
            if (pattern.test(value)) {
                let temp = [...data]
                temp[index].name = value
                setData([...temp])
            }
            else {
                setPatternMsgName("Name must be 3 to 20 alphabetic character")
            }
        }
    }
    function changePhoneNum(value, index) {
        if (value === "") {
            setPatternMsgName("")
            let temp = [...data]
            temp[index].phone = value
            setData([...temp])
        }
        else {
            let pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (pattern.test(value)) {
                if (value.length === 3 || value.length === 7) {
                    value = value + "-"
                }
                let temp = [...data]
                temp[index].phone = value
                setData([...temp])
            }
            else {
                setPatternMsgName("Phone Number must be 10 digit number")
            }
        }
    }
    function changeEmail(value, index) {
        if (value === "") {
            setPatternMsgName("")
            let temp = [...data]
            temp[index].phone = value
            setData([...temp])
        }
        else {
            let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (pattern.test(value)) {
                let temp = [...data]
                temp[index].phone = value
                setData([...temp])
            }
            else {
                setPatternMsgName("Invalid Email Format")
            }
        }
    }
    function changeHobbies(value, index) {
        if (value === "") {
            setPatternMsgName("")
            let temp = [...data]
            temp[index].hobbies = value
            setData([...temp])
        }
        else {
            let pattern = /^[a-zA-Z ]{1,30}$/;
            if (pattern.test(value)) {
                let temp = [...data]
                temp[index].hobbies = value
                setData([...temp])
            }
            else {
                setPatternMsgName("Hobbies must be in 30 character alphabetic")
            }
        }
    }
    function deleteData(index) {
        let temp = [...data]
        temp.splice(index, 1);
        setData([...temp])
    }
    function selectData(state, id) {
        if (state) {
            let temp = [...selectID]
            temp.push(id)
            setSelectID([...temp])
        }
        else {
            setSelectID(selectID.filter((e) => e !== id))
        }
    }
    function sendEmail() {
        setSendData(selectID.map((s) => data.filter((d) => d.id === s)))
    }
    return (
        <table>
            <tr>
                <th><button onClick={sendEmail}>Send</button></th>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Num</th>
                <th>Email</th>
                <th>Hobbies</th>
                <th className='tableWarningMsg'>{patternMsgName}</th>
            </tr>
            {/* TODO Send Data to server when click on 'Done' Button */}
            {data.map(function (d, index) {
                return (
                    <tr>
                        <td><input type='checkbox' onChange={(event) => selectData(event.target.checked, d.id)} /></td>
                        <td>{viewMode[index] ? d.id : <input type='number' value={d.id} />}</td>
                        <td>{viewMode[index] ? d.name : <input type='text' value={d.name} onChange={(e) => changeName(e.target.value, index)} />}</td>
                        <td>{viewMode[index] ? d.phone : <input type='number' value={d.phone} onChange={(e) => changePhoneNum(e.target.value, index)} />}</td>
                        <td>{viewMode[index] ? d.email : <input type='email' value={d.email} onChange={(e) => changeEmail(e.target.value, index)} />}</td>
                        <td>{viewMode[index] ? d.hobbies : <input type='text' value={d.hobbies} onChange={(e) => changeHobbies(e.target.value, index)} />}</td>
                        <td>{viewMode[index] ? <button onClick={() => { changeViewState(false, index) }}>Edit</button> : <button onClick={() => { changeViewState(true, index) }}>Done</button>}
                            <button onClick={() => deleteData(index)}>Delete</button></td>
                    </tr>
                );
            })}
        </table>
    );
}
export default Table;