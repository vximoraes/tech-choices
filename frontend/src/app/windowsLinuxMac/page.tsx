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

  const calculatePercentages = () => {
    if (totalVotes === 0) return { windows: 0, linux: 0, macos: 0 };

    const windowsPercent = (windowsVote.count / totalVotes) * 100;
    const linuxPercent = (linuxVote.count / totalVotes) * 100;
    const macosPercent = (macVote.count / totalVotes) * 100;

    let windowsRounded = Math.round(windowsPercent);
    let linuxRounded = Math.round(linuxPercent);
    let macosRounded = Math.round(macosPercent);

    const currentSum = windowsRounded + linuxRounded + macosRounded;
    const targetSum = 100;
    const difference = targetSum - currentSum;

    if (difference !== 0) {
      const rests = [
        { option: 'windows', rest: windowsPercent - windowsRounded, current: windowsRounded },
        { option: 'linux', rest: linuxPercent - linuxRounded, current: linuxRounded },
        { option: 'macos', rest: macosPercent - macosRounded, current: macosRounded }
      ];

      rests.sort((a, b) => difference > 0 ? b.rest - a.rest : a.rest - b.rest);

      for (let i = 0; i < Math.abs(difference) && i < rests.length; i++) {
        if (rests[i].option === 'windows') {
          windowsRounded += difference > 0 ? 1 : -1;
        } else if (rests[i].option === 'linux') {
          linuxRounded += difference > 0 ? 1 : -1;
        } else if (rests[i].option === 'macos') {
          macosRounded += difference > 0 ? 1 : -1;
        }
      }
    }

    return {
      windows: Math.max(0, windowsRounded),
      linux: Math.max(0, linuxRounded),
      macos: Math.max(0, macosRounded)
    };
  };

  const percentages = calculatePercentages();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-white/80 text-lg">Inicializando sistemas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8">
          <div className="text-red-400 mb-4 text-4xl">⚠️</div>
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchVotes}
            className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            Reconectar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
          Sistema Operacional
        </h1>
        <p className="text-xl text-white/70">Escolha seu favorito</p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-8 px-4 lg:px-8 max-w-7xl mx-auto">

        {/* WINDOWS */}
        <div className="flex-1 max-w-sm mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 h-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 relative overflow-hidden group">
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="grid grid-cols-2 gap-1 w-12 h-12">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-16 left-4 w-8 h-8 bg-white rounded-lg transform rotate-12 animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute bottom-16 right-8 w-6 h-6 bg-white/50 rounded-lg transform -rotate-12 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-2 gap-1 w-8 h-8">
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Windows</h2>
              <p className="text-blue-100 text-sm">O sistema mais popular</p>
            </div>

            <button
              onClick={() => submitVote('windows')}
              disabled={voting}
              className="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 mb-6 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
            >
              {voting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-2"></div>
                  Votando...
                </div>
              ) : (
                'Votar Windows'
              )}
            </button>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {windowsVote.count}
                </div>
                <div className="text-blue-100 text-sm mb-3">votos</div>
                <div className="w-full bg-white/20 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${totalVotes > 0 ? (windowsVote.count / totalVotes) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {percentages.windows}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LINUX */}
        <div className="flex-1 max-w-sm mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 h-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="font-mono text-xs leading-relaxed p-4">
                <div className="text-green-400">$ sudo apt update</div>
                <div className="text-green-400">$ ./configure --enable-awesome</div>
                <div className="text-green-400">$ make && make install</div>
                <div className="text-green-400">$ echo &quot;Hello World&quot;</div>
                <div className="text-green-400">$ systemctl start voting.service</div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-12 right-4 text-green-400 font-mono text-xs animate-pulse">$</div>
              <div className="absolute bottom-20 left-6 text-green-400 font-mono text-xs animate-pulse">&gt;</div>
              <div className="absolute top-1/2 left-2 text-green-400 font-mono text-xs animate-pulse">~</div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="text-white font-bold text-2xl font-mono">$</div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Linux</h2>
              <p className="text-gray-300 text-sm">Liberdade e poder</p>
            </div>

            <button
              onClick={() => submitVote('linux')}
              disabled={voting}
              className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-400 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 mb-6 font-mono disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
            >
              {voting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </div>
              ) : (
                '$ vote --linux'
              )}
            </button>

            {/* Stats */}
            <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1 font-mono">
                  {linuxVote.count}
                </div>
                <div className="text-gray-300 text-sm mb-3">votos</div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${totalVotes > 0 ? (linuxVote.count / totalVotes) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-green-400 text-sm font-mono font-medium">
                  {percentages.linux}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MACOS */}
        <div className="flex-1 max-w-sm mx-auto lg:mx-0">
          <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl p-8 h-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-gray-500/25 relative overflow-hidden group">
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
              </div>
            </div>

            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <div className="text-white font-bold text-3xl">🍎</div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">macOS</h2>
              <p className="text-gray-600 text-sm">Simplicidade elegante</p>
            </div>

            <button
              onClick={() => submitVote('macos')}
              disabled={voting}
              className="w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 mb-6 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
            >
              {voting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Processando...
                </div>
              ) : (
                'Votar macOS'
              )}
            </button>

            {/* Stats */}
            <div className="bg-black/10 backdrop-blur-sm rounded-xl p-4 border border-gray-400/30">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {macVote.count}
                </div>
                <div className="text-gray-600 text-sm mb-3">votos</div>
                <div className="w-full bg-gray-300 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-black h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${totalVotes > 0 ? (macVote.count / totalVotes) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="text-gray-700 text-sm font-medium">
                  {percentages.macos}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Circular */}
      <div className="flex justify-center mt-12 pb-8">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
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
                  {totalVotes}
                </div>
                <div className="text-xs text-white/60">total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-white/80">Windows {percentages.windows}%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white/80">Linux {percentages.linux}%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <span className="text-white/80">macOS {percentages.macos}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

