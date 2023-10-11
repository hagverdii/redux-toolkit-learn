import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewPost} from "./postsSlice";
import {selectAllUsers} from "../users/usersSlice.js";
import {useNavigate} from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const users = useSelector(selectAllUsers);
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setBody(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const canSave = [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = (e) => {
        e.preventDefault()
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({title, body, userId})).unwrap();
                setTitle('');
                setBody('');
                setUserId('');
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle');
            }
        }
    }


    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a new post</h2>
            <form onSubmit={onSavePostClicked}>
                <label htmlFor='postTitle'>Post title:</label>
                <input
                    required
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor='postAuthor'>Author:</label>
                <select required id='postAuthor' value={userId} onChange={onAuthorChanged}>
                    <option value=''></option>
                    {usersOptions}
                </select>
                <label htmlFor='postContent'>Post content:</label>
                <textarea
                    required
                    style={{resize: 'none'}}
                    id='postContent'
                    name='postContent'
                    value={body}
                    onChange={onContentChanged}
                />
                <button disabled={!canSave} type='submit'>Save post</button>
            </form>
        </section>
    );
};

export default AddPostForm;