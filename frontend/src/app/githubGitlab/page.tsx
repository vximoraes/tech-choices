'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

interface VoteData {
  option: string;
  count: number;
}

interface BarChartProps {
  githubCount: number;
  gitlabCount: number;
  totalVotes: number;
}

const BarChart = ({ githubCount, gitlabCount, totalVotes }: BarChartProps) => {
  const githubPercent = totalVotes > 0 ? (githubCount / totalVotes) * 100 : 50;
  const gitlabPercent = totalVotes > 0 ? (gitlabCount / totalVotes) * 100 : 50;
  
  const visualGithubWidth = totalVotes > 0 ? githubPercent : 50;
  const visualGitlabWidth = totalVotes > 0 ? gitlabPercent : 50;

  return (
    <div className="w-full bg-gray-700 rounded-full h-8 overflow-hidden shadow-inner mb-6 flex transition-all duration-700 ease-out">
      {/* GitHub Bar */}
      <div 
        style={{ width: `${visualGithubWidth}%` }} 
        className="bg-purple-600 h-full flex items-center justify-end px-2 transition-all duration-700 ease-out"
      >
        <span className={`text-sm font-bold ${githubPercent < 15 ? 'text-purple-200' : 'text-white'}`}>
          {totalVotes > 0 && `${githubPercent.toFixed(1)}%`}
        </span>
      </div>
      
      {/* GitLab Bar */}
      <div 
        style={{ width: `${visualGitlabWidth}%` }} 
        className="bg-orange-500 h-full flex items-center px-2 transition-all duration-700 ease-out"
      >
        <span className={`text-sm font-bold ${gitlabPercent < 15 ? 'text-orange-200' : 'text-white'}`}>
          {totalVotes > 0 && `${gitlabPercent.toFixed(1)}%`}
        </span>
      </div>
    </div>
  );
};
// -----------------------------------------------------------------

export default function GithubGitlabPage() {
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

  const fetchVotes = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/github-gitlab/votes`);
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
      const response = await fetch(`${API_BASE_URL}/github-gitlab/vote`, {
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

  const githubVote = votes.find(v => v.option.toLowerCase() === 'github') || { option: 'github', count: 0 };
  const gitlabVote = votes.find(v => v.option.toLowerCase() === 'gitlab') || { option: 'gitlab', count: 0 };
  const totalVotes = githubVote.count + gitlabVote.count;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6">
        <div className="text-center bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-400 font-medium">Carregando a batalha dos repositórios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
        <div className="text-center bg-gray-800 p-8 rounded-xl shadow-2xl border border-red-700">
          <div className="text-6xl text-red-500 mb-4">🚨</div>
          <h2 className="text-2xl font-bold mb-2">Ops! Ocorreu um erro.</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={fetchVotes}
            className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Efeito de fundo sutil */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Link Voltar */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-orange-400 transition-colors duration-200 text-lg font-medium group"
        >
          <svg className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="text-center mb-16">
          {/* Título com Gradiente */}
          <h1 className="text-6xl lg:text-8xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-orange-400 tracking-tight">
            A GRANDE BATALHA
          </h1>
          <h2 className="text-3xl font-semibold text-gray-200">GitHub vs GitLab</h2>
          <p className="text-lg text-gray-400 mt-2">Onde você prefere hospedar seus projetos?</p>
        </div>

        {/* GRÁFICO DE BARRAS CENTRALIZADO */}
        <div className="max-w-3xl mx-auto mb-10 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-3 text-center text-gray-300">Resultados Atuais</h3>
            <BarChart 
                githubCount={githubVote.count} 
                gitlabCount={gitlabVote.count} 
                totalVotes={totalVotes} 
            />
            <div className="flex justify-between text-sm text-gray-400 font-semibold px-2">
                <span className="text-purple-400">GitHub</span>
                <span className="text-orange-400">GitLab</span>
            </div>
        </div>

        {/* CARDS DE VOTAÇÃO APRIMORADOS */}
        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
          
          {/* GitHub Card */}
          <div className="w-full md:w-1/2 max-w-sm">
            <div className="bg-gray-800 rounded-3xl p-8 text-center border-4 border-purple-600 shadow-xl hover:shadow-purple-700/50 transition-all duration-300 transform hover:scale-[1.02]">
              
              {/* Ícone e Título */}
              <div className="flex justify-center mb-4">
                {/* GitHub Icon (SVG simples) */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-purple-500">
                    <path d="M12 0C5.372 0 0 5.373 0 12c0 5.305 3.438 9.8 8.207 11.387.6.11.82-.26.82-.57 0-.28-.01-1.01-.01-2.02-3.34.72-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6C6.73 17.17 3.4 15.93 3.4 10.47c0-1.3.46-2.36 1.22-3.2-.12-.3-.53-1.51.11-3.15 0 0 .99-.32 3.25 1.22.94-.26 1.94-.39 2.94-.39s2.0.13 2.94.39c2.26-1.54 3.25-1.22 3.25-1.22.64 1.64.23 2.85.11 3.15.76.84 1.22 1.9 1.22 3.2 0 5.47-3.33 6.7-6.52 7.07.42.36.81 1.09.81 2.22 0 1.6-.01 2.88-.01 3.28 0 .31.21.68.82.57C20.562 21.8 24 17.305 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>

              <h2 className="text-4xl font-bold mb-4 text-purple-400">GitHub</h2>
              
              <p className="text-6xl font-extrabold text-white mb-2">{githubVote.count}</p>
              <p className="text-xl font-semibold text-gray-400 mb-6">
                {totalVotes > 0 ? ((githubVote.count / totalVotes) * 100).toFixed(1) : 0}%
              </p>

              <button
                onClick={() => submitVote('github')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-wait"
                disabled={voting}
              >
                {voting ? 'Votando...' : 'Votar'}
              </button>
            </div>
          </div>

          {/* GitLab Card */}
          <div className="w-full md:w-1/2 max-w-sm">
            <div className="bg-gray-800 rounded-3xl p-8 text-center border-4 border-orange-500 shadow-xl hover:shadow-orange-700/50 transition-all duration-300 transform hover:scale-[1.02]">
              
              {/* Ícone e Título */}
              <div className="flex justify-center mb-4">
                {/* GitLab Icon (SVG simples) */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-orange-500">
                    <path d="M22.09 11.59l-1.07-3.3-3.29-1.06-1.07-3.29-3.29-1.07-1.06 3.29-3.3 1.07-1.06 3.29-3.3 1.06 3.3 1.07 1.06 3.3 3.3 1.06 1.07 3.3 3.3-1.07 1.06-3.29 3.29-1.07zm-10.09 9.41c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                </svg>
              </div>

              <h2 className="text-4xl font-bold mb-4 text-orange-400">GitLab</h2>
              
              <p className="text-6xl font-extrabold text-white mb-2">{gitlabVote.count}</p>
              <p className="text-xl font-semibold text-gray-400 mb-6">
                {totalVotes > 0 ? ((gitlabVote.count / totalVotes) * 100).toFixed(1) : 0}%
              </p>

              <button
                onClick={() => submitVote('gitlab')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-wait"
                disabled={voting}
              >
                {voting ? 'Votando...' : 'Votar'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-2 text-gray-300">Total de Votos Registrados</h3>
          <p className="text-5xl font-extrabold text-white">{totalVotes}</p>
        </div>
      </div>
    </div>
  );
}