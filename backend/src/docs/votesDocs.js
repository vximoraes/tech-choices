import { z } from "zod";
import { 
    categoryVotesSchema, 
    frontBackVoteSchema, 
    jsTsVoteSchema, 
    sqlNosqlVoteSchema, 
    githubGitlabVoteSchema, 
    windowsLinuxMacVoteSchema,
    voteResponseSchema, 
    errorSchema 
} from "./schemas.js";

export const votesDocs = {
    "/api/categories/front-back/votes": {
        get: {
            summary: "Obter votos Frontend vs Backend",
            description: "Retorna os resultados atuais da votação entre Frontend e Backend.",
            schema: {
                response: categoryVotesSchema
            },
            responses: {
                200: {
                    description: "Votos obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: categoryVotesSchema,
                            example: [
                                { category: "front-back", option: "frontend", count: 7 },
                                { category: "front-back", option: "backend", count: 3 }
                            ]
                        }
                    }
                }
            }
        }
    },
    "/api/categories/js-ts/votes": {
        get: {
            summary: "Obter votos JavaScript vs TypeScript", 
            description: "Retorna os resultados atuais da votação entre JavaScript e TypeScript.",
            schema: {
                response: categoryVotesSchema
            },
            responses: {
                200: {
                    description: "Votos obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: categoryVotesSchema,
                            example: [
                                { category: "js-ts", option: "javascript", count: 47 },
                                { category: "js-ts", option: "typescript", count: 46 }
                            ]
                        }
                    }
                }
            }
        }
    },
    "/api/categories/sql-nosql/votes": {
        get: {
            summary: "Obter votos SQL vs NoSQL",
            description: "Retorna os resultados atuais da votação entre SQL e NoSQL.",
            schema: {
                response: categoryVotesSchema
            },
            responses: {
                200: {
                    description: "Votos obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: categoryVotesSchema,
                            example: [
                                { category: "sql-nosql", option: "sql", count: 8 },
                                { category: "sql-nosql", option: "nosql", count: 6 }
                            ]
                        }
                    }
                }
            }
        }
    },
    "/api/categories/github-gitlab/votes": {
        get: {
            summary: "Obter votos GitHub vs GitLab",
            description: "Retorna os resultados atuais da votação entre GitHub e GitLab.",
            responses: {
                200: {
                    description: "Votos obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: categoryVotesSchema,
                            example: [
                                { category: "github-gitlab", option: "github", count: 1 },
                                { category: "github-gitlab", option: "gitlab", count: 0 }
                            ]
                        }
                    }
                }
            }
        }
    },
    "/api/categories/windows-linux-mac/votes": {
        get: {
            summary: "Obter votos Windows vs Linux vs Mac",
            description: "Retorna os resultados atuais da votação entre Windows, Linux e Mac.",
            responses: {
                200: {
                    description: "Votos obtidos com sucesso",
                    content: {
                        "application/json": {
                            schema: categoryVotesSchema,
                            example: [
                                { category: "windows-linux-mac", option: "windows", count: 1 },
                                { category: "windows-linux-mac", option: "linux", count: 2 },
                                { category: "windows-linux-mac", option: "macos", count: 1 }
                            ]
                        }
                    }
                }
            }
        }
    },
    "/api/categories/front-back/vote": {
        post: {
            summary: "Votar em Frontend vs Backend",
            description: "Registra um voto para Frontend ou Backend.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: frontBackVoteSchema,
                        examples: {
                            frontend: {
                                summary: "Votar em Frontend",
                                value: { option: "frontend" }
                            },
                            backend: {
                                summary: "Votar em Backend",
                                value: { option: "backend" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Voto registrado com sucesso",
                    content: {
                        "application/json": {
                            schema: voteResponseSchema,
                            example: {
                                success: true,
                                category: "front-back",
                                option: "frontend",
                                count: 7
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/categories/js-ts/vote": {
        post: {
            summary: "Votar em JavaScript vs TypeScript",
            description: "Registra um voto para JavaScript ou TypeScript.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: jsTsVoteSchema,
                        examples: {
                            javascript: {
                                summary: "Votar em JavaScript",
                                value: { option: "javascript" }
                            },
                            typescript: {
                                summary: "Votar em TypeScript",
                                value: { option: "typescript" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Voto registrado com sucesso",
                    content: {
                        "application/json": {
                            schema: voteResponseSchema,
                            example: {
                                success: true,
                                category: "js-ts",
                                option: "typescript",
                                count: 47
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/categories/sql-nosql/vote": {
        post: {
            summary: "Votar em SQL vs NoSQL",
            description: "Registra um voto para SQL ou NoSQL.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: sqlNosqlVoteSchema,
                        examples: {
                            sql: {
                                summary: "Votar em SQL",
                                value: { option: "sql" }
                            },
                            nosql: {
                                summary: "Votar em NoSQL",
                                value: { option: "nosql" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Voto registrado com sucesso",
                    content: {
                        "application/json": {
                            schema: voteResponseSchema,
                            example: {
                                success: true,
                                category: "sql-nosql",
                                option: "sql",
                                count: 9
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/categories/github-gitlab/vote": {
        post: {
            summary: "Votar em GitHub vs GitLab", 
            description: "Registra um voto para GitHub ou GitLab.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: githubGitlabVoteSchema,
                        examples: {
                            github: {
                                summary: "Votar em GitHub",
                                value: { option: "github" }
                            },
                            gitlab: {
                                summary: "Votar em GitLab",
                                value: { option: "gitlab" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Voto registrado com sucesso",
                    content: {
                        "application/json": {
                            schema: voteResponseSchema,
                            example: {
                                success: true,
                                category: "github-gitlab",
                                option: "github",
                                count: 2
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/categories/windows-linux-mac/vote": {
        post: {
            summary: "Votar em Windows vs Linux vs Mac",
            description: "Registra um voto para Windows, Linux ou Mac.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: windowsLinuxMacVoteSchema,
                        examples: {
                            windows: {
                                summary: "Votar em Windows",
                                value: { option: "windows" }
                            },
                            linux: {
                                summary: "Votar em Linux",
                                value: { option: "linux" }
                            },
                            macos: {
                                summary: "Votar em Mac",
                                value: { option: "macos" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Voto registrado com sucesso",
                    content: {
                        "application/json": {
                            schema: voteResponseSchema,
                            example: {
                                success: true,
                                category: "windows-linux-mac",
                                option: "linux",
                                count: 3
                            }
                        }
                    }
                }
            }
        }
    }
};