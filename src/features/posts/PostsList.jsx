import {useSelector} from "react-redux";
import {selectPostIds, getPostsError, getPostsStatus} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt.jsx";

const PostsList = () => {
    const orderedPostsIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (postStatus === 'succeeded') {
        content = orderedPostsIds.map(postId => <PostsExcerpt key={postId} postId={postId} />);
    } else {
        content = <p>{error}</p>
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default PostsList;