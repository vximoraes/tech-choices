"use client"

import Image from "next/image"
import { useState } from "react"

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
    const [hoveredSide, setHoveredSide] = useState<string | null>(null)

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Lado MySQL */}
            <div 
                className={`flex-1 bg-gradient-to-br ${data[0].bgColor} relative transition-all duration-700 ${
                    hoveredSide === 'mongodb' ? 'flex-[0.3]' : hoveredSide === 'mysql' ? 'flex-[0.7]' : 'flex-1'
                }`}
                onMouseEnter={() => setHoveredSide('mysql')}
                onMouseLeave={() => setHoveredSide(null)}
            >
                {/* Padrão de Grid de Tabela no Fundo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-12 h-full gap-1 p-8">
                        {Array.from({length: 96}).map((_, i) => (
                            <div key={i} className="bg-white rounded-sm"></div>
                        ))}
                    </div>
                </div>

                {/* Ícones de Tabela Flutuantes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 opacity-20 animate-pulse">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7M5 7H19V9H5V7M5 11H19V13H5V11M5 15H19V17H5V15Z"/>
                        </svg>
                    </div>
                    <div className="absolute bottom-32 right-16 opacity-15 animate-pulse delay-1000">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7M5 7H19V9H5V7M5 11H19V13H5V11M5 15H19V17H5V15Z"/>
                        </svg>
                    </div>
                </div>

                {/* Conteúdo MySQL */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
                            <Image 
                                src={data[0].icon} 
                                alt={data[0].name} 
                                width={48} 
                                height={48}
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

                        {/* Características SQL */}
                        <div className="mt-8 space-y-2 text-sm opacity-80">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>ACID Compliance</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Esquema Rígido</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Relacionamentos</span>
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
                className={`flex-1 bg-gradient-to-br ${data[1].bgColor} relative transition-all duration-700 ${
                    hoveredSide === 'mysql' ? 'flex-[0.3]' : hoveredSide === 'mongodb' ? 'flex-[0.7]' : 'flex-1'
                }`}
                onMouseEnter={() => setHoveredSide('mongodb')}
                onMouseLeave={() => setHoveredSide(null)}
            >
                {/* Padrão de Documentos no Fundo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="flex flex-wrap gap-4 p-8 h-full">
                        {Array.from({length: 20}).map((_, i) => (
                            <div key={i} className="w-16 h-20 bg-white rounded-lg transform rotate-12" style={{
                                transform: `rotate(${Math.random() * 30 - 15}deg) translate(${Math.random() * 20}px, ${Math.random() * 20}px)`
                            }}></div>
                        ))}
                    </div>
                </div>

                {/* Ícones de Documento Flutuantes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-24 right-12 opacity-20 animate-pulse delay-500">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z"/>
                        </svg>
                    </div>
                    <div className="absolute bottom-20 left-16 opacity-15 animate-pulse delay-1500">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z"/>
                        </svg>
                    </div>
                </div>

                {/* Conteúdo MongoDB */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                    <div className="text-center space-y-6">
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
                            <Image 
                                src={data[1].icon} 
                                alt={data[1].name} 
                                width={48} 
                                height={48}
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

                        {/* Características NoSQL */}
                        <div className="mt-8 space-y-2 text-sm opacity-80">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Esquema Flexível</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>Escalabilidade</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span>JSON/BSON</span>
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
