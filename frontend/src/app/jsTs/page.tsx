'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VoteStatsCard from '@/components/VoteStatsCard';

interface VoteData {
  option: string;
  count: number;
}

export default function JsTsPage() {
  const [votes, setVotes] = useState<VoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingOption, setVotingOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

  const fetchVotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/js-ts/votes`);
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
    if (votingOption) return;

    setVotingOption(option);
    try {
      const response = await fetch(`${API_BASE_URL}/js-ts/vote`, {
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
      setVotingOption(null);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  const javascriptVote = votes.find(v => v.option.toLowerCase() === 'javascript') || { option: 'javascript', count: 0 };
  const typescriptVote = votes.find(v => v.option.toLowerCase() === 'typescript') || { option: 'typescript', count: 0 };
  const totalVotes = javascriptVote.count + typescriptVote.count;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
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
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* JAVASCRIPT */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-yellow-50 to-yellow-100 flex flex-col justify-center items-center relative min-h-screen lg:min-h-0">
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-yellow-600 transition-colors duration-200 text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar às categorias
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center p-4 lg:p-8 max-w-md mx-auto w-full">
          <div className="text-center mb-8 lg:mb-16">
            <div className="bg-yellow-400 rounded-lg p-4 lg:p-6 mb-4 lg:mb-6 shadow-lg">
              <h1 className="text-4xl lg:text-6xl font-bold text-yellow-900 mb-2">
                JS
              </h1>
              <div className="text-lg lg:text-xl text-yellow-800 font-medium">
                JavaScript
              </div>
            </div>
          </div>

          <button
            onClick={() => submitVote('javascript')}
            disabled={votingOption === 'javascript'}
            className={`${
              votingOption === 'javascript' 
                ? 'bg-yellow-300 animate-pulse' 
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white font-bold py-4 px-8 lg:py-6 lg:px-16 rounded-xl border-0 transition-all duration-200 mb-8 lg:mb-12 shadow-lg hover:shadow-xl text-lg lg:text-xl cursor-pointer w-full lg:w-auto transform hover:scale-105`}
          >
            Votar em JavaScript
          </button>

          <VoteStatsCard
            count={javascriptVote.count}
            totalVotes={totalVotes}
            colorScheme="javascript"
          />
        </div>
      </div>

      {/* TYPESCRIPT */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center min-h-screen lg:min-h-0">
        <div className="flex flex-col justify-center items-center p-4 lg:p-8 max-w-md mx-auto w-full">
          <div className="text-center mb-8 lg:mb-16">
            <div className="bg-blue-600 rounded-lg p-4 lg:p-6 mb-4 lg:mb-6 shadow-lg border-4 border-blue-700">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                TS
              </h1>
              <div className="text-lg lg:text-xl text-blue-100 font-medium">
                TypeScript
              </div>
            </div>
          </div>

          <button
            onClick={() => submitVote('typescript')}
            disabled={votingOption === 'typescript'}
            className={`${
              votingOption === 'typescript' 
                ? 'bg-blue-300 animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-bold py-4 px-8 lg:py-6 lg:px-16 rounded-xl border-2 border-blue-700 transition-all duration-200 mb-8 lg:mb-12 shadow-lg hover:shadow-xl text-lg lg:text-xl cursor-pointer w-full lg:w-auto transform hover:scale-105`}
          >
            Votar em TypeScript
          </button>

          <VoteStatsCard
            count={typescriptVote.count}
            totalVotes={totalVotes}
            colorScheme="typescript"
          />
        </div>
      </div>

      {/* Divisor central */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-white/95 backdrop-blur-md shadow-2xl border-2 border-gray-200 rounded-2xl p-6 text-center min-w-[160px]">
          <div className="text-sm text-gray-600 mb-2">Total de Votos</div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {totalVotes}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-gray-500">vs</span>
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Divisor central mobile */}
      <div className="lg:hidden w-full bg-gradient-to-r from-yellow-200 to-blue-200 p-6 text-center">
        <div className="text-sm text-gray-700 mb-2 font-medium">Total Geral</div>
        <div className="text-2xl font-bold text-gray-800 mb-2">
          {totalVotes}
        </div>
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">JS</span>
          </div>
          <span className="text-xs text-gray-500">vs</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-xs text-gray-600">TS</span>
          </div>
        </div>
      </div>
    </div>
  );
}