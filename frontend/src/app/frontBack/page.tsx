'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface VoteData {
  option: string;
  count: number;
}

export default function FrontBackPage() {
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

  const fetchVotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/front-back/votes`);
      if (!response.ok) {
        throw new Error('Failed to fetch votes');
      }
      const data = await response.json();
      setVotes(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching votes:', error);
      setError('Erro ao carregar os dados de votação');
    } finally {
      setLoading(false);
    }
  };

  const submitVote = async (option: string) => {
    if (voting) return;

    setVoting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/front-back/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      await fetchVotes();
    } catch (error) {
      console.error('Error submitting vote:', error);
      setError('Erro ao registrar seu voto');
    } finally {
      setVoting(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const frontendVote = votes.find(v => v.option.toLowerCase() === 'frontend') || { option: 'frontend', count: 0 };
  const backendVote = votes.find(v => v.option.toLowerCase() === 'backend') || { option: 'backend', count: 0 };
  const totalVotes = frontendVote.count + backendVote.count;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchVotes}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* FRONTEND */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center relative min-h-screen lg:min-h-0">
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar às categorias
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center p-4 lg:p-8 max-w-md mx-auto w-full">
          <div className="text-center mb-8 lg:mb-16">
            <h1 className="text-4xl lg:text-6xl font-light text-gray-800 mb-4 lg:mb-8">
              Frontend
            </h1>
          </div>

          <button
            onClick={() => submitVote('frontend')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 lg:py-6 lg:px-16 rounded-2xl border-0 transition-all duration-200 mb-8 lg:mb-12 shadow-lg hover:shadow-xl text-lg lg:text-xl cursor-pointer w-full lg:w-auto"
          >
            Votar em Frontend
          </button>

          <div className="w-full bg-white border border-gray-200 rounded-xl p-4 lg:p-8 shadow-sm">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-light text-blue-600 mb-3 lg:mb-4">
                {frontendVote.count.toLocaleString('pt-BR')}
              </div>
              <div className="text-base lg:text-lg text-gray-600 mb-4 lg:mb-6">votos recebidos</div>
              
              <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${totalVotes > 0 ? (frontendVote.count / totalVotes) * 100 : 0}%` }}
                ></div>
              </div>
              
              <div className="text-sm text-gray-500">
                {totalVotes > 0 ? Math.round((frontendVote.count / totalVotes) * 100) : 0}% do total
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BACKEND */}
      <div className="w-full lg:w-1/2 bg-gray-300 flex flex-col justify-center items-center min-h-screen lg:min-h-0" style={{
        background: 'linear-gradient(45deg, #c0c0c0 25%, transparent 25%), linear-gradient(-45deg, #c0c0c0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #c0c0c0 75%), linear-gradient(-45deg, transparent 75%, #c0c0c0 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}>
        <div className="flex flex-col justify-center items-center p-4 lg:p-8 w-full">
          <div className="text-center mb-8 lg:mb-12">
            <div className="bg-gray-400 border-4 border-gray-600 p-3 lg:p-4 mb-4 lg:mb-6" style={{
              boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.8)'
            }}>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-1 lg:mb-2" style={{ fontFamily: 'monospace', textShadow: '2px 2px 0px #808080' }}>
                BACKEND
              </h1>
              <div className="text-black text-base lg:text-lg" style={{ fontFamily: 'monospace' }}>
                *** SISTEMA ATIVO ***
              </div>
            </div>
          </div>

          <button
            onClick={() => submitVote('backend')}
            className="bg-gray-400 text-black font-bold py-3 px-6 lg:py-4 lg:px-8 text-lg lg:text-xl border-4 border-gray-600 mb-8 lg:mb-12 transition-all duration-100 active:translate-x-1 active:translate-y-1 cursor-pointer w-full lg:w-auto"
            style={{
              fontFamily: 'monospace',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
              textShadow: '1px 1px 0px #808080'
            }}
          >
            [ VOTAR BACKEND ]
          </button>

          <div className="bg-black text-green-400 p-4 lg:p-6 border-4 border-gray-600 font-mono text-xs lg:text-sm w-full max-w-sm" style={{
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.8), inset 2px 2px 4px rgba(255,255,255,0.2)'
          }}>
            <div className="text-center">
              <div className="text-green-400 mb-2">╔═══════════════════════╗</div>
              <div className="text-green-400 mb-2">║ ESTATISTICAS BACKEND  ║</div>
              <div className="text-green-400 mb-4">╚═══════════════════════╝</div>

              <div className="text-xl lg:text-2xl font-bold text-green-400 mb-2 font-mono break-all leading-tight">
                {(() => {
                  const count = backendVote.count;
                  if (count >= 1000000) {
                    return `${(count / 1000000).toFixed(1)}M`.padStart(8, '0');
                  } else if (count >= 1000) {
                    return `${(count / 1000).toFixed(1)}K`.padStart(8, '0');
                  } else {
                    return count.toString().padStart(8, '0');
                  }
                })()}
              </div>
              <div className="text-green-400 mb-4 text-xs">TOTAL_VOTOS</div>

              <div className="text-left">
                <div className="text-green-400 text-xs">PROGRESSO:</div>
                <div className="text-green-400 text-xs break-all">[{
                  Array.from({ length: 20 }, (_, i) =>
                    i < (totalVotes > 0 ? (backendVote.count / totalVotes) * 20 : 0) ? '█' : '░'
                  ).join('')
                }]</div>
                <div className="text-green-400 text-center mt-2 text-xs">
                  {totalVotes > 0 ? Math.round((backendVote.count / totalVotes) * 100) : 0}% DO_TOTAL
                </div>

                {backendVote.count >= 1000000 && (
                  <div className="text-red-400 text-center mt-2 text-xs animate-pulse">
                    *** OVERFLOW DETECTADO ***
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Divisor central */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl border-2 border-gray-200 rounded-1xl p-6 text-center min-w-[140px]">
          <div className="text-sm text-gray-600 mb-2">Total</div>
          <div className="text-2xl font-bold text-gray-800">
            {(() => {
              if (totalVotes >= 1000000000) {
                return `${(totalVotes / 1000000000).toFixed(1)}B`;
              } else if (totalVotes >= 1000000) {
                return `${(totalVotes / 1000000).toFixed(1)}M`;
              } else if (totalVotes >= 1000) {
                return `${(totalVotes / 1000).toFixed(1)}K`;
              } else {
                return totalVotes.toLocaleString('pt-BR');
              }
            })()}
          </div>
        </div>
      </div>

      {/* Divisor central mobile */}
      <div className="lg:hidden w-full bg-gray-200 p-4 text-center">
        <div className="text-sm text-gray-600 mb-1">Total Geral</div>
        <div className="text-xl font-bold text-gray-800">
          {(() => {
            if (totalVotes >= 1000000000) {
              return `${(totalVotes / 1000000000).toFixed(1)}B`;
            } else if (totalVotes >= 1000000) {
              return `${(totalVotes / 1000000).toFixed(1)}M`;
            } else if (totalVotes >= 1000) {
              return `${(totalVotes / 1000).toFixed(1)}K`;
            } else {
              return totalVotes.toLocaleString('pt-BR');
            }
          })()}
        </div>
      </div>
    </div>
  );
}