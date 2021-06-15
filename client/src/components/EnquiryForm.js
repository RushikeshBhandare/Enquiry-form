import react, {useState, useEffect} from 'react'
import axios from 'axios'

import ('./form.css')


const EnquiryForm = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [massage, setMassage] = useState('');

    const onSubmitForm = async(e) =>{
        e.preventDefault();
        //send email
        try{
            const data = {
                name: name,
                email: email,
                subject: subject,
                massage: massage
            }
            const responce = await axios.post('/send', data)

            console.log(responce.data)
            alert(responce.data.massage)
            resetValues()
        }catch(error){
            console.log(error)
        }

    }

    const resetValues = () =>{
        setName('')
        setEmail('')
        setMassage('')
        setSubject('')
    }
    return(
        <div className="form__container">
            <h1>Enquiry Form</h1>
            <form onSubmit={onSubmitForm}>
                <label>Full Name</label>
                <input value={name} required onChange={(e)=>{setName(e.target.value)}}/>

                
                <label>Email</label>
                <input type="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                

                
                <label>Subject</label>
                <input value={subject} required onChange={(e)=>{setSubject(e.target.value)}}/>
                

                
                <label>Massage</label>
                <textarea value={massage} required onChange={(e)=>{setMassage(e.target.value)}}/>
                

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default EnquiryForm