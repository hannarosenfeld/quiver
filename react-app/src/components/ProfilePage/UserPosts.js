function UserPosts({ post, user }) {

    const postDate = post.created_at.split(' ').slice(0,4).join(' ');

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
            <div className="updown-vote" style={{marginTop: "10px"}}>
                <div className="upvote"><i class="fa-solid fa-arrow-up"></i><span style={{marginLeft: "5px"}}>Upvote</span></div>
            <div><i class="fa-solid fa-arrow-down"></i></div>
           </div>
        </div>
    )
}

export default UserPosts;