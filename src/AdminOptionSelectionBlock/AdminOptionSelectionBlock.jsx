import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

function AdminOptionSelectionBlock({ feature }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch({ type: 'DELETE_FEATURE', payload: feature.id})
    }

    const handleEdit = () => {
        // dispatch({ type: 'EDIT_FEATURE', payload: feature.id})
    }

    console.log('in admin, feature', feature.id)
    return (
        <>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={handleEdit}>Edit</Button>
        </>
    )
}

export default AdminOptionSelectionBlock; 