import PostAuthor from "./PostAuthor.jsx";
import TimeAgo from "./TimeAgo.jsx";
import ReactionButtons from "./ReactionButtons.jsx";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice.js";

const PostsExcerpt = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId));

    return (
        <article>
            <h2>{post.title}</h2>
            <p className='excerpt'>{post.body.substring(0, 75)}...</p>
            <p className='postCredit'>
                <Link to={`post/${post.id}`}>View post</Link>
                <PostAuthor userId={post.userId} />
                {post.edited ? <i>{' (edited)'}</i> : null}
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default PostsExcerpt;