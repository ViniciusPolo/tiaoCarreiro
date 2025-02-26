import { useState } from "react";
import axios from "axios";

export default function SuggestMusic() {
  const [titulo, setTitulo] = useState("");
  const [visualizacoes, setVisualizacoes] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para extrair o ID do YouTube a partir da URL
  const extractYoutubeId = (url) => {
    const match = url.split("v=")[1];
    return match ? match.split("&")[0] : "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const youtubeId = extractYoutubeId(youtubeUrl);
    if (!youtubeId) {
      setMessage("URL inválida! Insira um link válido do YouTube.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("http://0.0.0.0:8000/api/musicas", {
        titulo,
        visualizacoes: Number(visualizacoes) || 0, // Garante um número válido
        youtube_id: youtubeId,
        thumb: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      });

      if (response.status === 201) {
        setMessage("Música sugerida com sucesso!");
        setMessageType("success");

        // Limpar campos após o envio
        setTitulo("");
        setVisualizacoes("");
        setYoutubeUrl("");
      } else {
        setMessage(response.data.message || "Erro ao sugerir música.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
      setMessageType("error");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="submit-form">
        <h3>Sugerir Nova Música</h3>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="titulo"
              placeholder="Título da Música"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="visualizacoes"
              placeholder="Número de Visualizações (opcional)"
              value={visualizacoes}
              onChange={(e) => setVisualizacoes(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="url"
              name="youtube_url"
              placeholder="Cole aqui o link do YouTube"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Música"}
          </button>
        </form>
      </div>

      <h3 className="section-title">Ranking Atual</h3>
    </div>
  );
}
