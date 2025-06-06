import React from "react";

const Hero = () => {
    
    return (
        <>
            {/* <div className="pattern" /> */}
            <div className="bg-[url(/hero-bg.png)] bg-center bg-cover">
                <div className="wrapper">
                    <header>
                        <img src="./hero.png" alt="Hero Banner" />
                        <h1>
                            Find <span className="text-gradient">Movies</span>{" "}
                            you'll Enjoy Withouth the Hassle
                        </h1>
                    </header>
                </div>
            </div>
        </>
    );
};

export default Hero;
