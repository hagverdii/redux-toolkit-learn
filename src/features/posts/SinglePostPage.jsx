import {selectPostById} from "./postsSlice.js";
import {useSelector} from "react-redux";
import PostAuthor from "./PostAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

const SinglePostPage = () => {
    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, postId));

    if (!post) {
        return <section><h2>Post not found!</h2></section>;
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className='postCredit'>
                <Link to={`/post/edit/${post.id}`}>Edit post</Link>
                <PostAuthor userId={post.userId} />
                {post.edited ? <i>{' (edited)'}</i> : null}
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default SinglePostPage;
