
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getProductsFromInternet(query: string): Promise<{ products: Product[], sources: any[] }> {
    const ai = this.getAI();
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Find 8 popular and real electronic products available in Bangladesh related to "${query}". 
        Return them as a JSON array of objects with the following keys:
        - name: full product name
        - price: estimated price in Bangladeshi Taka (BDT) with "৳" symbol (e.g., ৳ 45,000)
        - description: brief 1-sentence description
        - imageUrl: a high-quality product image URL from Unsplash
        - category: the main category
        - features: an array of 4 key features
        - specs: an object of 3-4 main specifications
        
        Make sure the products are real and prices are realistic for the Bangladesh market.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              products: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    price: { type: Type.STRING },
                    description: { type: Type.STRING },
                    imageUrl: { type: Type.STRING },
                    category: { type: Type.STRING },
                    features: { type: Type.ARRAY, items: { type: Type.STRING } },
                    specs: { type: Type.OBJECT, additionalProperties: { type: Type.STRING } }
                  },
                  required: ["name", "price", "description", "imageUrl", "category", "features", "specs"]
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{"products": []}');
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      // Fix: Mapping products to include missing 'reviews' property and 'id' required by Product interface
      const products: Product[] = (data.products || []).map((p: any, idx: number) => ({
        ...p,
        id: `ai-${Date.now()}-${idx}`,
        reviews: []
      }));

      return { 
        products, 
        sources 
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { products: [], sources: [] };
    }
  }
}

export const geminiService = new GeminiService();
