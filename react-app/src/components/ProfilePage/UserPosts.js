import { useState, useEffect, useRef } from "react";

import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../DeletePostModal";


function UserPosts({ post, user }) {
    const postDate = post.created_at.split(' ').slice(0,4).join(' ');
    const [toggle, setToggle] = useState(false);

    return (
        <div className="user-post">
            <div style={{display: "flex", gap:"0.5em", marginBottom: "1em"}}>
                <div className="profile-pic"
                    style={{
                        backgroundImage: `url(${user.profile_pic})`, 
                        backgroundSize: "40px", 
                        backgroundPosition: "center",
                    }}>
                </div>
                <div style={{fontSize: "14px", display: "flex", flexDirection: "column"}}>
                    <span style={{fontWeight: "600"}}>{user.username}</span>
                    <span>{postDate}</span>
                </div>
            </div>
            <div className="linebreaks-on">{post.content}</div>
            
            <div className="edit-question-container" style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1em"}}>
                {/* UP AND DOWN VOTE */}
                <div className="updown-vote">
                    <div className="upvote"><i class="fa-solid fa-arrow-up"></i><span>Upvote</span></div>
                    <div><i class="fa-solid fa-arrow-down"></i></div>
                </div>
                <i onClick={() => setToggle(!toggle)}className="fa-regular fa-comment" style={{cursor: "pointer", marginTop: "0.5em"}}></i>
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeletePostModal post={post}/>}
                />     
            </div>

            <div className="updown-vote" style={{marginTop: "10px", height: "30px"}}>
                <div className="upvote"><i class="fa-solid fa-arrow-up"></i><span style={{marginLeft: "5px"}}>Upvote</span></div>
            <div><i class="fa-solid fa-arrow-down"></i></div>
           </div>
        </div>
    )
}

export default UserPosts;