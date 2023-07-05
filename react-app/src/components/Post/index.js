import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


function Post({ post }) {
    const sessionUser = useSelector(state => state.session.user);

    return(
        <div>
            {post.content.length ? (
                <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                    <div className="profile-pic"
                        style={{
                            backgroundImage: `url(${post.user.profile_pic})`, 
                            backgroundSize: "40px", 
                            backgroundPosition: "center",
                        }}>
                    </div>
                    <div style={{fontSize: "0.8em", fontWeight: "600"}}>
                        <span>{post.user.username}</span>
                        {/* <span>{post.created_at}</span> */}
                    </div>
                </div>
                ) : ''}
                <h4><NavLink to={`/posts/${post.id}`}>{post.title}</NavLink></h4>
                {post.content.length ? (
                    <div style={{fontSize: "0.9em",paddingTop: "0.5em"}}>
                        {post.content}
                    </div>
                ) : ''}
                {/* <div className="edit-post-container">
                    {sessionUser.id === post.user.id ? <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeletepostModal post={post}
                        />}
                    /> : ''}                                        
                </div> */}
        </div>
    )
}

export default Post