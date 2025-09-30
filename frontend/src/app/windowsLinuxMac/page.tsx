'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface VoteData {
  option: string;
  count: number;
}

export default function WindowsLinuxMacPage() {
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

  const fetchVotes = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/windows-linux-mac/votes`);
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
  }, [API_BASE_URL]);

  const submitVote = async (option: string) => {
    if (voting) return;

    setVoting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/windows-linux-mac/vote`, {
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
  }, [fetchVotes]);

  const windowsVote = votes.find(v => v.option.toLowerCase() === 'windows') || { option: 'windows', count: 0 };
  const linuxVote = votes.find(v => v.option.toLowerCase() === 'linux') || { option: 'linux', count: 0 };
  const macVote = votes.find(v => v.option.toLowerCase() === 'macos') || { option: 'macos', count: 0 };
  const totalVotes = windowsVote.count + linuxVote.count + macVote.count;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-white/80">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
          <div className="text-red-400 mb-4 text-2xl">⚠️</div>
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchVotes}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Botão Voltar */}
      <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-30">
        <Link
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 text-sm bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar às categorias
        </Link>
      </div>

      {/* Título Principal */}
      <div className="text-center pt-20 pb-8">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
          Sistema Operacional
        </h1>
        <p className="text-xl text-white/70">Escolha seu favorito</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-8 px-4 lg:px-8 max-w-6xl mx-auto">
        
        {/* WINDOWS */}
        <div className="flex-1 max-w-sm mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 h-full shadow-xl hover:shadow-blue-500/25 transition-all duration-300 relative">
            <div className="absolute top-4 right-4 opacity-20">
              <div className="grid grid-cols-2 gap-1 w-8 h-8">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-4 shadow-lg">
                <div className="grid grid-cols-2 gap-1 w-6 h-6">
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Windows</h2>
              <p className="text-blue-100 text-sm">O sistema mais popular</p>
            </div>

            <button
              onClick={() => submitVote('windows')}
              disabled={voting}
              className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg active:scale-95 mb-4 disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
            >
              {voting ? 'Votando...' : 'Votar Windows'}
            </button>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {windowsVote.count.toLocaleString('pt-BR')}
                </div>
                <div className="text-blue-100 text-sm mb-2">votos</div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-700"
                    style={{ width: `${totalVotes > 0 ? (windowsVote.count / totalVotes) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-white/80 text-sm">
                  {totalVotes > 0 ? Math.round((windowsVote.count / totalVotes) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LINUX */}
        <div className="flex-1 max-w-sm mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 h-full shadow-xl hover:shadow-green-500/25 transition-all duration-300 relative overflow-hidden group">
            {/* Terminal Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="font-mono text-xs leading-relaxed p-4">
                <div className="text-green-400">$ sudo apt update</div>
                <div className="text-green-400">$ ./configure --enable-awesome</div>
                <div className="text-green-400">$ make && make install</div>
                <div className="text-green-400">$ echo &quot;Hello World&quot;</div>
                <div className="text-green-400">$ systemctl start voting.service</div>
                <div className="text-green-400">$ ps aux | grep vote</div>
                <div className="text-green-400">$ chmod +x vote.sh</div>
                <div className="text-green-400">$ ./vote.sh --count</div>
              </div>
            </div>

            <div className="text-center mb-6 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-xl mb-4 shadow-lg">
                <div className="text-white font-bold text-xl font-mono">$</div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Linux</h2>
              <p className="text-gray-300 text-sm">Liberdade e poder</p>
            </div>

            <button
              onClick={() => submitVote('linux')}
              disabled={voting}
              className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-400 transition-all duration-200 shadow-lg active:scale-95 mb-4 font-mono disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
            >
              {voting ? 'Processando...' : '$ vote --linux'}
            </button>

            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1 font-mono">
                  {linuxVote.count.toLocaleString('pt-BR')}
                </div>
                <div className="text-gray-300 text-sm mb-2">votos</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${totalVotes > 0 ? (linuxVote.count / totalVotes) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-green-400 text-sm font-mono">
                  {totalVotes > 0 ? Math.round((linuxVote.count / totalVotes) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MACOS */}
        <div className="flex-1 max-w-sm mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-2xl p-6 h-full shadow-xl hover:shadow-gray-500/25 transition-all duration-300 relative">
            <div className="absolute top-4 right-4 opacity-30">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-xl mb-4 shadow-lg">
                <div className="text-white font-bold text-2xl">🍎</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">macOS</h2>
              <p className="text-gray-600 text-sm">Simplicidade elegante</p>
            </div>

            <button
              onClick={() => submitVote('macos')}
              disabled={voting}
              className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg active:scale-95 mb-4 disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
            >
              {voting ? 'Processando...' : 'Votar macOS'}
            </button>

            <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 border border-gray-400/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {macVote.count.toLocaleString('pt-BR')}
                </div>
                <div className="text-gray-600 text-sm mb-2">votos</div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-700"
                    style={{ width: `${totalVotes > 0 ? (macVote.count / totalVotes) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-gray-700 text-sm">
                  {totalVotes > 0 ? Math.round((macVote.count / totalVotes) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Circular Central */}
      <div className="text-center mt-12 pb-8">
        <div className="inline-block relative">
          {/* Círculo de progresso animado */}
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="8"
              />
              
              {/* Windows segment */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="8"
                strokeDasharray={`${totalVotes > 0 ? (windowsVote.count / totalVotes) * 283 : 0} 283`}
                strokeDashoffset="0"
                className="transition-all duration-1000 ease-out"
                opacity="0.8"
              />
              
              {/* Linux segment */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="8"
                strokeDasharray={`${totalVotes > 0 ? (linuxVote.count / totalVotes) * 283 : 0} 283`}
                strokeDashoffset={`-${totalVotes > 0 ? (windowsVote.count / totalVotes) * 283 : 0}`}
                className="transition-all duration-1000 ease-out"
                opacity="0.8"
              />
              
              {/* macOS segment */}
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#6B7280" 
                strokeWidth="8"
                strokeDasharray={`${totalVotes > 0 ? (macVote.count / totalVotes) * 283 : 0} 283`}
                strokeDashoffset={`-${totalVotes > 0 ? ((windowsVote.count + linuxVote.count) / totalVotes) * 283 : 0}`}
                className="transition-all duration-1000 ease-out"
                opacity="0.8"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {(() => {
                    if (totalVotes >= 1000000) {
                      return `${(totalVotes / 1000000).toFixed(1)}M`;
                    } else if (totalVotes >= 1000) {
                      return `${(totalVotes / 1000).toFixed(1)}K`;
                    } else {
                      return totalVotes.toLocaleString('pt-BR');
                    }
                  })()}
                </div>
                <div className="text-xs text-white/60">total</div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-white/80">Windows</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white/80">Linux</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <span className="text-white/80">macOS</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
