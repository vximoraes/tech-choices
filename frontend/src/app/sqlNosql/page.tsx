"use client"

import { useState, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"

interface VoteData {
  option: string;
  count: number;
}

const data = [
    { 
        name: "MySQL", 
        icon: "/mysql-logo-svgrepo-com.svg",
        type: "SQL",
        color: "blue",
        bgColor: "from-blue-600 to-blue-800",
        description: "Estruturado & Relacional",
        concept: "Tabelas conectadas por relacionamentos",
        option: "sql"
    },
    { 
        name: "MongoDB", 
        icon: "/mongodb-svgrepo-com.svg",
        type: "NoSQL", 
        color: "green",
        bgColor: "from-green-600 to-green-800",
        description: "Flexível & Escalável",
        concept: "Documentos JSON independentes",
        option: "nosql"
    },
]

export default function SqlNosqlPage() {
    const [votes, setVotes] = useState<VoteData[]>([]);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

    const fetchVotes = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/sql-nosql/votes`);
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
            const response = await fetch(`${API_BASE_URL}/sql-nosql/vote`, {
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

    const sqlVote = votes.find(v => v.option.toLowerCase() === 'sql') || { option: 'sql', count: 0 };
    const nosqlVote = votes.find(v => v.option.toLowerCase() === 'nosql') || { option: 'nosql', count: 0 };
    const total = sqlVote.count + nosqlVote.count;

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
        <div className="h-screen flex overflow-hidden relative">
            {/* Botão de Voltar */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-30">
                <Link
                    href="/"
                    className="inline-flex items-center text-white hover:text-gray-200 transition-colors duration-200 text-sm bg-black bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-lg"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar às categorias
                </Link>
            </div>

            {/* Lado MySQL */}
            <div 
                className={`flex-1 bg-gradient-to-br ${data[0].bgColor} relative`}
            >
                {/* Padrão de Grid de Tabela no Fundo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-12 h-full gap-1 p-8">
                        {Array.from({length: 96}).map((_, i) => (
                            <div key={i} className="bg-white rounded-sm"></div>
                        ))}
                    </div>
                </div>

                {/* Conteúdo MySQL */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                    <div className="text-center space-y-6">
                        <div 
                            className={`w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300 cursor-pointer ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => !voting && submitVote('sql')}
                        >
                            <Image 
                                src={data[0].icon} 
                                alt={data[0].name} 
                                width={64} 
                                height={64}
                                className="object-contain"
                            />
                        </div>
                        
                        <h1 className="text-6xl font-bold mb-2">{data[0].name}</h1>
                        <p className="text-xl opacity-90 mb-4">{data[0].description}</p>
                        <p className="text-sm opacity-70 max-w-xs leading-relaxed">{data[0].concept}</p>
                        
                        {/* Votação */}
                        <div className="mt-8 space-y-4">
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">{sqlVote.count}</div>
                                <div className="text-lg opacity-80">votos</div>
                            </div>
                            
                            {/* Barra de Progresso */}
                            <div className="w-48 mx-auto">
                                <div className="bg-white bg-opacity-30 rounded-full h-3">
                                    <div 
                                        className="bg-white rounded-full h-3 transition-all duration-2000 ease-out"
                                        style={{ width: `${total > 0 ? (sqlVote.count / total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="text-center mt-2 text-sm opacity-80">
                                    {total > 0 ? Math.round((sqlVote.count / total) * 100) : 0}% dos votos
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divisor Central */}
            <div className="w-2 bg-gradient-to-b from-blue-600 via-gray-400 to-green-600 relative z-20 shadow-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-gray-600 font-bold text-xs">VS</span>
                    </div>
                </div>
            </div>

            {/* Lado MongoDB */}
            <div 
                className={`flex-1 bg-gradient-to-br ${data[1].bgColor} relative`}
            >
                {/* Padrão de Documentos no Fundo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="flex flex-wrap gap-4 p-8 h-full">
                        {Array.from({length: 20}).map((_, i) => (
                            <div key={i} className="w-16 h-20 bg-white rounded-lg transform rotate-12"></div>
                        ))}
                    </div>
                </div>

                {/* Conteúdo MongoDB */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                    <div className="text-center space-y-6">
                        <div 
                            className={`w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300 cursor-pointer ${voting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => !voting && submitVote('nosql')}
                        >
                            <Image 
                                src={data[1].icon} 
                                alt={data[1].name} 
                                width={64} 
                                height={64}
                                className="object-contain"
                            />
                        </div>
                        
                        <h1 className="text-6xl font-bold mb-2">{data[1].name}</h1>
                        <p className="text-xl opacity-90 mb-4">{data[1].description}</p>
                        <p className="text-sm opacity-70 max-w-xs leading-relaxed">{data[1].concept}</p>
                        
                        {/* Votação */}
                        <div className="mt-8 space-y-4">
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">{nosqlVote.count}</div>
                                <div className="text-lg opacity-80">votos</div>
                            </div>
                            
                            {/* Barra de Progresso */}
                            <div className="w-48 mx-auto">
                                <div className="bg-white bg-opacity-30 rounded-full h-3">
                                    <div 
                                        className="bg-white rounded-full h-3 transition-all duration-2000 ease-out"
                                        style={{ width: `${total > 0 ? (nosqlVote.count / total) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="text-center mt-2 text-sm opacity-80">
                                    {total > 0 ? Math.round((nosqlVote.count / total) * 100) : 0}% dos votos
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estatísticas Flutuantes */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                    <div className="text-center text-gray-800">
                        <div className="text-sm font-medium">Total de Votos</div>
                        <div className="text-2xl font-bold">{total}</div>
                        {voting && (
                            <div className="text-xs text-blue-600 mt-1">Registrando voto...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
