import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../api/api";
import "./form.scss";

export default function Forms () {

    // Chamada API busca do Cep

    const [zipCode, setZipCode] = useState([]);

    useEffect(() => {
        if (zipCode.length === 8) {
            api
            .get(`/${zipCode}`)
            .then((response) => setZipCode(response.data))
            .catch((err) => {
                console.log("ops! ocorreu um erro" + err);
            });
        } else if (zipCode.length <= 7) {
            console.log("Deve ser maior que 8")
        }
    });

    // Validar CPF

    const [cpf, setCpf] = useState ('');

    const validateCpf = e => {
        const regexCpf = /^([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})$/;
        const cpfLimit = 11;

        var str = e.target.value.replace(/[^0-9]/g, "").slice(0, cpfLimit)
        const resultLimit = str.replace(regexCpf, "$1.$2.$3-$4");
        
        setCpf(resultLimit);
    }

    // Validação Telefone

    const [phone, setPhone] = useState();

    const validatePhone = e => {
        const regexPhone = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
        const limit = 11;

        var str = e.target.value.replace(/[^0-9]/g, "").slice(0, limit)
        const result = str.replace(regexPhone, "($1)$2-$3");
        
        setPhone(result);
    }

    // Validação do email

    const [email, setEmail] = useState();
    const emailReturn = useRef("");

    function validateEmail (e) {
        setEmail(e.target.value);
        const emailIsValid = /\S+@\S+\.\S+/;

        if (emailIsValid.test(email)) {
            emailReturn.current = "Email válido";
        } else {
            emailReturn.current = "Email inválido";
        }
    }

    return (
        <div className="mainForm">
            <Form>
                <Form.Group className="infoGroup" controlId="formBasicInfo">
                    <h2>Dados Gerais</h2>

                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control type="text" placeholder="Nome Completo" />

                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control type="date" placeholder="Data de Nascimento" />

                    <Form.Label>CPF</Form.Label>
                    <Form.Control type="text" placeholder="CPF" value={cpf} onChange={validateCpf} />

                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="(31)12345-6789" value={phone} onChange={validatePhone} />

                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={validateEmail} />
                    <p>{emailReturn.current}</p>
                </Form.Group>

                <Form.Group className="addressGroup" controlId="formBasicAddress">
                    <h2>Endereço</h2>

                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="number" placeholder="CEP" onChange={e => setZipCode(e.target.value)} />
                
                    <Form.Label>Logradouro</Form.Label>
                    <Form.Control type="text" placeholder="Rua: " value={zipCode.logradouro} />

                    <Form.Label>Número</Form.Label>
                    <Form.Control type="number" placeholder="000" />

                    <Form.Label>Complemento</Form.Label>
                    <Form.Control type="text" placeholder="Complemento" />

                    <Form.Label>Bairro</Form.Label>
                    <Form.Control type="text" placeholder="Bairro" value={zipCode.bairro} />

                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" placeholder="Cidade" value={zipCode.cidade} />

                    <Form.Label>UF</Form.Label>
                    <Form.Control type="text" placeholder="UF" value={zipCode.estado} />
                </Form.Group>

                <Form.Group className="descriptionGroup" controlId="formBasicPassword">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" className="formText" />
                </Form.Group>

                <Button type="submit">Enviar</Button>
                
            </Form>
        </div>
    )
}