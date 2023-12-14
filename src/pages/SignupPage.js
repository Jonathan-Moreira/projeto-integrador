import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"
import { goToPostsPage, goToSignupPage } from "../routes/coordinator"
import { BASE_URL, TOKEN_NAME } from "../constants/constants"

export const SignupPageContainer = styled.main`
height: 100%;
padding: 24px;

display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;

#logo {
    width: 152px;
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


#logo {
    width: 152px;
}

h1 {
    font-size: 33px;
    margin: 0.5rem 0;
}
`

export const FormSection = styled.section`
display:flex;
flex-direction: column;
width: 100%;

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%
}

input {
    color: #323941
}
`

const TermsBox = styled.div`
display: flex;
flex-direction: column;
margin-top: 3rem;

section {
    display: flex;
    align-items: center;
    justify-content: center;


    .checkbox {
        width: 18px;
    }

    label {
        margin-left: 0.5rem;
    }

    h2, label {
        font-size: 14px;
        font-weight: 400;
    }

    span {
        color: #4088cb
    }
}
`

export default function goToSignupPage() {
    const navigate = useNavigate()
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_NAME)
        if (token) {
            goToPostsPage(navigate)
        }
    }, [])

    const signup = (e) => {
        e.preventDefault()

        const body = {
            nickname: nickname,
            email: email,
            password: password
        }

        axios.post(BASE_URL + "/users/signup", body)
            .then(res => {
                window.localStorage.setItem(TOKEN_NAME, res.data.token)
                goToPostsPage(navigate)
            })
            .catch(err => console.log(err))
    }

    return (
        <SignupPageContainer>
            <HeaderSection>
                <h1>Boas vindas ao Labeddit</h1>
            </HeaderSection>



            <FormSection>
                <form onSubmit={signup}>
                    <input
                        placeholder="Apelido"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />

                    <input
                        placeholder="E-mail"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <TermsBox>
                        <h2>Ao continuar, vocÊ concorda com o termo
                            <spam>{" "}Contrato de usuário</spam> e a nossa
                            <spam>{" "}Politica de Privacidade </spam>
                        </h2>

                        <section>
                            <input
                                className="checkbox"
                                type="checkbox"
                                name="termsAndConditions"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                required
                            />
                            <label htmlFor="termsAndConditons">
                                Eu concordo em receber e-mails sobre coisas legais do Labeddit
                            </label>
                        </section>
                    </TermsBox>

                    <button
                        className="primary"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </form>
            </FormSection>


        </SignupPageContainer>
    )

}

