const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const userData = document.getElementById("userData");

const API_URL = window.location.origin;

async function getUser() {

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/me`, {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        
        if (!response.ok) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            return;
        }

        
        message.textContent = `Login sebagai ${data.user.name}`;
        message.style.color = "#7CFF9B";

        userData.innerHTML = `
            <h3>Anda sudah login</h3>
            <p>Nama: ${data.user.name}</p>
            <p>Email: ${data.user.email}</p>

            <button
                id="logoutButton"
                type="button"
            >
                LOGOUT
            </button>
        `;



        document
            .getElementById("logoutButton")
            .addEventListener("click", () => {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                message.textContent =
                    "Berhasil logout";

                message.style.color =
                    "#7CFF9B";

                userData.innerHTML = "";

                loginForm.reset();

            });

    } catch (error) {

        console.error(
            "ERROR GET /me:",
            error
        );

    }
}


loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value;


        message.textContent =
            "Sedang login...";

        message.style.color =
            "white";


        try {

            const response =
                await fetch(
                    `${API_URL}/login`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })

                    }
                );


            const data =
                await response.json();



            if (!response.ok) {

                message.textContent =
                    data.message ||
                    "Login gagal";

                message.style.color =
                    "#ff5c5c";

                return;
            }


            localStorage.setItem(
                "token",
                data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            message.textContent =
                "Login berhasil!";

            message.style.color =
                "#7CFF9B";



            setTimeout(() => {

                window.location.href = "/";

            }, 500);


        } catch (error) {

            console.error(
                "ERROR LOGIN:",
                error
            );

            message.textContent =
                "Server tidak dapat dihubungi.";

            message.style.color =
                "#ff5c5c";

        }

    }
);


const showPassword =
    document.getElementById(
        "showPassword"
    );

const passwordInput =
    document.getElementById(
        "password"
    );


showPassword.addEventListener(
    "click",
    () => {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            showPassword.textContent =
                "🙈";

        } else {

            passwordInput.type =
                "password";

            showPassword.textContent =
                "👁";

        }

    }
);


getUser();