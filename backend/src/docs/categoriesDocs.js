import { z } from "zod";
import { allCategoriesSchema } from "./schemas.js";

export const categoriesDocs = {
    "/api/categories": {
        get: {
            summary: "Lista todas as categorias disponíveis",
            description: "Retorna uma lista completa de todas as categorias de votação disponíveis no sistema, incluindo suas opções e descrições.",
            schema: {
                response: allCategoriesSchema
            }
        }
    }
};