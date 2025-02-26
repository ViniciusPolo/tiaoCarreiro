import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import tiaoCarreiro from './tiao-carreiro-pardinho.png';
import SuggestMusic from '../components/suggestMucic';

const SinglePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const apiUrl = 'http://0.0.0.0:8000/api/musicas';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <header>
        <img src={tiaoCarreiro} alt="Tião Carreiro" className="artist-img" />
        <h1>Top 5 Músicas Mais Tocadas</h1>
        <h2>Tião Carreiro & Pardinho</h2>
      </header>

      <SuggestMusic />

      {!data.length ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎵</div>
          <div className="empty-state-text">Nenhuma música cadastrada ainda</div>
          <div className="empty-state-subtext">Seja o primeiro a sugerir uma música usando o formulário acima!</div>
        </div>
      ) : (
        <>
          {currentItems.map((item, index) => (
            <a
              href={`https://www.youtube.com/watch?v=${item.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="music-card-link"
              key={item.id}
            >
              <div className="music-card">
                <div className="rank">{indexOfFirstItem + index + 1}</div>
                <div className="music-info">
                  <div className="music-title">{item.titulo}</div>
                  <div className="views">{item.visualizacoes} visualizações</div>
                </div>
                <img src={item.thumb} alt={item.titulo} className="thumbnail" />
              </div>
            </a>
          ))}

          <div className="pagination">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePage;