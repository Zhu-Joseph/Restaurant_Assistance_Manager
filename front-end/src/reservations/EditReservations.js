import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from "react-router-dom";
import { validateReservation } from '../utils/handlers';
import ErrorAlert from '../layout/ErrorAlert';
import { listReservationEdit, updateReservation } from '../utils/api';


export default function EditReservations () {
    const initialError = {
        "message": []
    }

    const [error, setError] = useState({...initialError})
    const [formData, setFormData] = useState([]);
    const {reservation_id} = useParams()
    const history = useHistory()


    useEffect(loadReservation, [])

    function loadReservation() {
        const abortController = new AbortController()
        listReservationEdit(reservation_id, ({id: reservation_id}), abortController.signal)
            .then(setFormData)
            .catch(setError)
        return () => abortController.abort();
    }
    
    function submitHandler(event) {
        event.preventDefault()
        const abortController = new AbortController() 

        const result = validateReservation(formData, error)//NOT ABLE TO PASS THROUGH setError TO CHANGE STATE
        if(!result) return
        setError({message: error.message})
        
        if(error.message.length > 0) {
            console.log("error")
        }

        else {
            updateReservation(reservation_id, {data: formData}, abortController.signal)
            .then(() => {
                history.goBack()
            })
            .catch(setError)
        }
        return () => abortController.abort()
    }

    function cancelHandler() {
        history.goBack()
    }

    const handleChange = ({ target }) => {
        const value = target.value;
        setFormData({
          ...formData,
          [target.name]: value,
        });
      }

    const handlePhone = ({ target }) => {
        let value = target.value;
        if (value.length <= 12 && !isNaN(Number(value[value.length - 1]))) {
            if (value.length === 3 || value.length === 7) {
                value += '-'
            }
            setFormData({
            ...formData,
            [target.name]: value,
            });
        }
        else {
            if (value[value.length - 1] === '-' || value.length === 0) {
                value = value.substring(0, value.length - 1)
                setFormData({
                    ...formData,
                    [target.name]: value,
                    });                
            }
        }
      }

    const handleDate = ({ target }) => {
        let value = target.value;
        if (value.length <= 10) {
            setFormData({
            ...formData,
            [target.name]: value,
            });
        }
      }
 
    if(error.message.length > 0) {
        return (
            <ErrorAlert error={error} />
        )
    }
    
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    First Name:
                    <input name="first_name" type="text" placeholder="first name" 
                    value={formData.first_name} onChange={handleChange}/>
                </div>
                <div>
                    Last Name: 
                    <input name="last_name" type="text" placeholder="last name"
                    value={formData.last_name} onChange={handleChange}/>
                </div>
                <div>
                    Phone: 
                    <input name="mobile_number" type="tel" placeholder="123-456-7890" onChange={handlePhone}
                    value={formData.mobile_number}/>                    
                </div>
                <div>
                    Date:
                    <input name="reservation_date" type="date" placeholder={formData.reservation_date}
                    value={formData.reservation_date} onChange={handleDate}/>
                </div>
                <div>
                    Time:
                    <input name="reservation_time" type="time" placeholder="HH:MM" 
                    value={formData.reservation_time} onChange={handleChange}/>
                </div>
                <div>
                    Party Size:
                    <input name="people" type="number" 
                    value={formData.people} onChange={handleChange}/>
                </div>
                <div>
                    Status:
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="booked">Booked</option>
                        <option value="seated">Seated</option>
                        <option value="finished">Finished</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>      
                <button type="submit" onSubmit={submitHandler}>Submit</button>
            </form>
            <button onClick={cancelHandler}>Cancel</button>
        </div>
    )   
}