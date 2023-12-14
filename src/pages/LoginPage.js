import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"
import LogoLogin from "../svgs arquivos/logo-login.svgs"
import { goToPostsPage, goToSignupPage} from "../routes/coordinator"
import { BASE_URL, TOKEN_NAME} from "../component/HorizontalLine"

export const LoginPageContainer = styled.main`
height: 100%;
padding: 24px;

display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;


#logo {
    width: 15px;
}

h1 {
font-size: 16px;
}
`

export const HeaderSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

margin-top: 8vh;

#logo {
width: 152px;
}


h1 {
    font-size: 16px;
    font-weight: 200;
    margin: 0.5rem 0;
}
`

export const FormSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;

form {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;

input {
    color:#323941;
    width: 100%;
    max-width: 365px;
    height: 60px;
    margin: 0.5rem 0;
    padding: 10px;
    border: 1px solid lightgray;
}
}

button {
    width: 100%;
    max-width: 365px;
    height: 51px;
    border-radius: 25px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    border: none;
}

button.primary{
    background-color: #fc8b6b;
    color: white;
    margin-top: 3rem;
}


button.secpndary {
    border: 1px solid #fe7e02;
    color: #fe7e02;
}
`
export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, SetPassword] = useState("")

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (token) {
            goToPostsPage(navigate)
        }
    }, [])

        const login = (e) => {
            e.preventDefault()

            const body = {
                email: email,
                password: password
            }

            axios.post(BASE_URL + "user/login", body)
            .then(res => {
                window.localStorage.setItem(TOKEN_NAME, res.data.token)
                goToPostsPage(native)
            })

            .catch(err => console.log(err))
        }

        return (
            <LoginPageContainer>
                <HeaderSection>
                    <img id= "logo" src={LogoLogin} alt="Logo Labenu"/>
                    <h1>Rede social da Labenu</h1>
                </HeaderSection>

               <FormSection>
                <form onSubmit={login}>
                    <input
                    placeholder="E-mail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                    <input
                    playceholder="senha"
                    type="password"
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                    required
                    />

                    <button
                    className="primary"
                    type="submit"
                    >
                        Continuar
                        </button>
                        </form>

                        <HorizontalLine/>

                    <button
                        className="secondary"
                        onclick={() => goToSignupPage(navigate)}
                    >
                        Crie sua conta"
                    </button>
                        
               </FormSection>

            </LoginPageContainer>
        )
}





