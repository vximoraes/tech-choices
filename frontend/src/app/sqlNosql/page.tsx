"use client"

import Image from "next/image"
import Link from "next/link"

const data = [
    { 
        name: "MySQL", 
        votos: 10, 
        icon: "/mysql-logo-svgrepo-com.svg",
        type: "SQL",
        color: "blue",
        bgColor: "from-blue-600 to-blue-800",
        description: "Estruturado & Relacional",
        concept: "Tabelas conectadas por relacionamentos"
    },
    { 
        name: "MongoDB", 
        votos: 5, 
        icon: "/mongodb-svgrepo-com.svg",
        type: "NoSQL", 
        color: "green",
        bgColor: "from-green-600 to-green-800",
        description: "Flexível & Escalável",
        concept: "Documentos JSON independentes"
    },
]

const total = data.reduce((sum, item) => sum + item.votos, 0)

export default function SqlNosqlPage() {
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
                        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
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
                                <div className="text-5xl font-bold mb-2">{data[0].votos}</div>
                                <div className="text-lg opacity-80">votos</div>
                            </div>
                            
                            {/* Barra de Progresso */}
                            <div className="w-48 mx-auto">
                                <div className="bg-white bg-opacity-30 rounded-full h-3">
                                    <div 
                                        className="bg-white rounded-full h-3 transition-all duration-2000 ease-out"
                                        style={{ width: `${(data[0].votos / total) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="text-center mt-2 text-sm opacity-80">
                                    {Math.round((data[0].votos / total) * 100)}% dos votos
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
                        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
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
                                <div className="text-5xl font-bold mb-2">{data[1].votos}</div>
                                <div className="text-lg opacity-80">votos</div>
                            </div>
                            
                            {/* Barra de Progresso */}
                            <div className="w-48 mx-auto">
                                <div className="bg-white bg-opacity-30 rounded-full h-3">
                                    <div 
                                        className="bg-white rounded-full h-3 transition-all duration-2000 ease-out"
                                        style={{ width: `${(data[1].votos / total) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="text-center mt-2 text-sm opacity-80">
                                    {Math.round((data[1].votos / total) * 100)}% dos votos
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
                    </div>
                </div>
            </div>
        </div>
    )
}
