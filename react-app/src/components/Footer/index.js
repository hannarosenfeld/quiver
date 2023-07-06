import "./Footer.css"

function Footer() {
    return(
        <div style={{background: "#0F1011", marginTop: "1em", padding: "1.5em"}}>
            <div style={{margin: "0 auto", height: "1.5em", width: "600px"}}>
                <p style={{float: "right", display: "flex", gap: "0.3em"}}>
                    build by 
                    <a className="portfolio-site-link" href="https://hannarosenfeld.com">
                        Hanna Rosenfeld
                    </a>
                    <span className="social-links" style={{display:"flex", gap: "0.5em"}}>
                        <a href="https://github.com/hannarosenfeld"><i class="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/hannazitarosenfeld/"><i class="fa-brands fa-linkedin"></i></a>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Footer;