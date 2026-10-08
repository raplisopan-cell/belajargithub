const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

const heroWords =
    document.querySelectorAll(
        ".hero-title .word"
    );

gsap.fromTo(
    heroWords,
    {
        y: 120,
        opacity: 0,
        rotateX: 90
    },
    {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out"
    }
);

gsap.fromTo(
    ".hero-label",
    {
        y: 30,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"
    }
);

gsap.fromTo(
    ".hero-description",
    {
        y: 30,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.7,
        ease: "power3.out"
    }
);

gsap.fromTo(
    ".main-button",
    {
        y: 30,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.9,
        ease: "power3.out"
    }
);

gsap.fromTo(
    ".scroll-indicator",
    {
        opacity: 0,
        y: 20
    },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.2
    }
);

gsap.fromTo(
    ".hero-index",
    {
        opacity: 0
    },
    {
        opacity: 1,
        duration: 1,
        delay: 1.2
    }
);

gsap.to(
    ".background",
    {
        yPercent: 10,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    }
);

gsap.to(
    ".marquee-track",
    {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    }
);

gsap.fromTo(
    ".about-left",
    {
        x: -80,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".about",
            start: "top 75%"
        }
    }
);

gsap.fromTo(
    ".about-right",
    {
        x: 80,
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".about",
            start: "top 75%"
        }
    }
);

gsap.fromTo(
    ".works-header",
    {
        y: 60,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".works",
            start: "top 75%"
        }
    }
);

gsap.fromTo(
    ".work-card",
    {
        y: 80,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".work-grid",
            start: "top 80%"
        }
    }
);

gsap.fromTo(
    ".final > *",
    {
        y: 60,
        opacity: 0
    },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".final",
            start: "top 75%"
        }
    }
);

let lastScroll = 0;

window.addEventListener(
    "scroll",
    () => {
        const currentScroll = window.scrollY;

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) return;

        if (
            currentScroll > lastScroll &&
            currentScroll > 100
        ) {
            navbar.style.transform =
                "translateY(-100%)";
        } else {
            navbar.style.transform =
                "translateY(0)";
        }

        lastScroll = currentScroll;
    }
);

async function checkLogin() {
    const token =
        localStorage.getItem("token");

    const loginNav =
        document.getElementById("loginNav");

    const mainLoginButton =
        document.getElementById("mainLoginButton");

    const finalLoginButton =
        document.getElementById("finalLoginButton");

    const logoutButton =
        document.getElementById("logoutButton");

    if (!token) {
        if (loginNav) {
            loginNav.style.display =
                "inline-block";

            loginNav.textContent =
                "LOGIN";

            loginNav.href =
                "login.html";

            loginNav.style.pointerEvents =
                "auto";
        }

        if (mainLoginButton) {
            mainLoginButton.style.display =
                "inline-flex";
        }

        if (finalLoginButton) {
            finalLoginButton.style.display =
                "inline-flex";
        }

        if (logoutButton) {
            logoutButton.style.display =
                "none";
        }

        return;
    }

    try {
        const response =
            await fetch(
                "/me",
                {
                    method: "GET",
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (!response.ok) {
            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.reload();

            return;
        }

        const namaUser =
            data.user.name;

        if (loginNav) {
            loginNav.style.display =
                "inline-block";

            loginNav.textContent =
                `Halo, ${namaUser} 👋`;

            loginNav.href =
                "#";

            loginNav.style.pointerEvents =
                "none";
        }

        if (mainLoginButton) {
            mainLoginButton.style.display =
                "none";
        }

        if (finalLoginButton) {
            finalLoginButton.style.display =
                "none";
        }

        if (logoutButton) {
            logoutButton.style.display =
                "inline-block";
        }
    } catch (error) {
        console.error(
            "ERROR CEK LOGIN:",
            error
        );
    }
}

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

if (logoutButton) {
    logoutButton.addEventListener(
        "click",
        () => {
            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "/";
        }
    );
}

checkLogin();
