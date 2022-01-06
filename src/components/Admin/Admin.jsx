import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//import files 
import AdminForm from './AdminForm';



function Admin() {

    //initialized dispatch 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_CATEGORY' });
    }, []);


    return (
        <>
            <h1> Admin Page </h1>
            <p> Hello Admin. this is a stud ....</p>
            <AdminForm />
        </>
    )
}


export default Admin; 