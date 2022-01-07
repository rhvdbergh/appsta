import { useDispatch } from "react-redux";

function AdminOptionSelectionBlock({ feature }) {

    const dispatch = useDispatch();

    
    return (
        <>
            <Button>Delete</Button>
            <Button>Edit</Button>
        </>
    )
}

export default AdminOptionSelectionBlock; 