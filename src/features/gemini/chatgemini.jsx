import api from "../../api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatGemini } from "./gemini.slice";

import Loader from "../../Components/Loader";

const ChatGemini = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const mensajes = useSelector(
        (state) => state.gemini?.chatIA || []
    );

    const [mensaje, setMensaje] = useState("");

    const enviarMensaje = async (e) => {
        e.preventDefault();

        if (!mensaje.trim()) {
            toast.error("Escribí un mensaje");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/ai", {
                prompt: mensaje
            });

            dispatch(
                setChatGemini([
                    ...mensajes,
                    {
                        tipo: "usuario",
                        texto: mensaje
                    },
                    {
                        tipo: "ia",
                        texto: response.data.final || response.data.message || "Sin respuesta"
                    }
                ])
            );

            setMensaje("");

        } catch (error) {
            toast.error("Error al obtener la respuesta de IA");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-gemini">
            <h2>🤖 Chat Gemini</h2>

                {loading && <Loader />}
            <div className="chat-mensajes">
                {mensajes.map((item, index) => (
                    <div
                        key={index}
                        className={
                            item.tipo === "usuario"
                                ? "mensaje usuario"
                                : "mensaje ia"
                        }
                    >
                        <p>{item.texto}</p>
                    </div>
                ))}
            </div>

        

            <form onSubmit={enviarMensaje} className="chat-form">
                <input
                    type="text"
                    placeholder="Preguntale algo a Gemini..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                />

                <button type="submit">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ChatGemini;