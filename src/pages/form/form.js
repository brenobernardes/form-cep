import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../api/api";
import "./form.scss";

export default function Forms () {

    // Chamada API busca do Cep

    const [zipCode, setZipCode] = useState([]);

    useEffect(() => {
        api
        .get(`/${zipCode}`)
        .then((response) => setZipCode(response.data))
        .catch((err) => {
            console.log("ops! ocorreu um erro" + err);
        });
    });

// Validação do email

    const [email, setEmail] = useState();

    function validateEmail (e) {
        setEmail(e.target.value);
        const emailIsValid = /\S+@\S+\.\S+/;

        if (emailIsValid.test(email)) {
            return console.log('Valid Email')
        } else {
            return console.log('Enter Valid Email')
        }
    }

    return (
        <div className="mainForm">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control type="text" placeholder="Nome Completo" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control type="date" placeholder="Data de Nascimento" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="number" placeholder="CPF" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="number" placeholder="(31)12345-6789" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={validateEmail} />
                    <p>{}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="number" placeholder="CEP" onChange={e => setZipCode(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Logradouro</Form.Label>
                    <Form.Control type="text" placeholder="Rua: " value={zipCode.logradouro} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Número</Form.Label>
                    <Form.Control type="number" placeholder="000" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control type="text" placeholder="Complemento" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control type="text" placeholder="Bairro" value={zipCode.bairro} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" placeholder="Cidade" value={zipCode.cidade} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>UF</Form.Label>
                    <Form.Control type="text" placeholder="UF" value={zipCode.estado} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" placeholder="Bio" />
                    <Form.Text></Form.Text>
                </Form.Group>

                <Button type="submit">Enviar</Button>
                
            </Form>
        </div>
    )
}