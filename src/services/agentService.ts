/**
 * Service to communicate with the n8n HMS Restraunt AI Agent Webhook
 */

const WEBHOOK_URL = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? '/api-webhook/webhook/72a0f8cd-1e22-4fbf-a324-85d296f738c0'
  : 'https://n8n.propwiseai.in/webhook/72a0f8cd-1e22-4fbf-a324-85d296f738c0';

export interface FoodItem {
  id: string;
  name: string;
  category: 'Fast Food' | 'Italian' | 'Snacks';
  price: number;
  description: string;
  rating: number;
  calories: number;
  ingredients: string[];
  status: 'Popular' | 'Signature' | 'Healthy' | 'Chef Choice';
  available: 'Yes' | 'No';
}

export interface WebhookResponse {
  text: string;
  foodItems?: FoodItem[];
  error?: boolean;
}

// Strictly the four requested food items for HMS Restraunt!
export const mockFoodMenu: FoodItem[] = [
  {
    id: "FD001",
    name: "Gourmet House Burger",
    category: "Fast Food",
    price: 120,
    description: "Juicy flame-grilled artisan patty layered with fresh cheddar cheese, organic vine-ripened tomatoes, crisp heirloom lettuce, and our house-secret garlic aioli seared in a toasted sesame brioche bun.",
    rating: 4.8,
    calories: 620,
    ingredients: ["Gourmet Patty", "Cheddar Cheese", "Brioche Bun", "Garlic Aioli", "Fresh Tomatoes", "Lettuce"],
    status: "Popular",
    available: "Yes"
  },
  {
    id: "FD002",
    name: "Classic Sourdough Pizza",
    category: "Italian",
    price: 250,
    description: "Hand-stretched organic sourdough crust topped with wood-fired San Marzano tomato sauce, bubbly buffalo mozzarella, fragrant fresh basil leaves, and cold-pressed extra virgin olive oil drizzle.",
    rating: 4.95,
    calories: 840,
    ingredients: ["Sourdough Crust", "San Marzano Tomatoes", "Buffalo Mozzarella", "Fresh Basil", "Virgin Olive Oil"],
    status: "Signature",
    available: "Yes"
  },
  {
    id: "FD003",
    name: "Truffle Mushroom Pasta",
    category: "Italian",
    price: 180,
    description: "House-made artisanal fettuccine tossed in a rich, creamy Parmigiano-Reggiano sauce, sautéed wild woodland mushrooms, finished with fresh cracked pepper and fragrant truffle oil.",
    rating: 4.75,
    calories: 510,
    ingredients: ["Artisanal Fettuccine", "Parmigiano-Reggiano", "Woodland Mushrooms", "Truffle Oil", "Pepper"],
    status: "Chef Choice",
    available: "Yes"
  },
  {
    id: "FD004",
    name: "Avocado Sourdough Sandwich",
    category: "Snacks",
    price: 90,
    description: "Toasted local grain sourdough layered with ripe mashed Hass avocado, Swiss cheese, fresh organic microgreens, crisp cucumber ribbons, and a light spread of honey-Dijon dressing.",
    rating: 4.6,
    calories: 380,
    ingredients: ["Grain Sourdough", "Hass Avocado", "Swiss Cheese", "Microgreens", "Cucumber", "Honey-Dijon"],
    status: "Healthy",
    available: "Yes"
  }
];

/**
 * Generate unique session ID for the culinary session
 */
export const generateSessionId = (): string => {
  return 'hms_session_' + Math.random().toString(36).substring(2, 15);
};



/**
/**
 * Robustly parses n8n webhook response in any shape (Object, Array, Stringified JSON)
 */
export function parseWebhookReply(rawData: any): WebhookResponse {
  if (!rawData) {
    return { text: "I did not receive any response from the HMS Restraunt agent. Please try again." };
  }

  // 1. Handle arrays elegantly (n8n standard returns array list wrappers)
  let dataObj = rawData;
  if (Array.isArray(dataObj)) {
    if (dataObj.length > 0) {
      dataObj = dataObj[0];
    } else {
      return { text: "Received an empty response array from the HMS Restraunt agent." };
    }
  }

  // 2. Handle stringified JSON recursively
  if (typeof dataObj === 'string') {
    const trimmed = dataObj.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseWebhookReply(parsed);
      } catch (e) {
        // Fall back to treating as a regular string below
      }
    }
  }

  // 3. Handle object parsing
  if (typeof dataObj === 'object' && dataObj !== null) {
    // Extract potential food item array lists
    let foodItemsList: FoodItem[] = [];
    if (dataObj.data && Array.isArray(dataObj.data.foodItems)) {
      foodItemsList = dataObj.data.foodItems;
    } else if (Array.isArray(dataObj.foodItems)) {
      foodItemsList = dataObj.foodItems;
    } else if (Array.isArray(dataObj.data)) {
      foodItemsList = dataObj.data;
    }

    // Extract core text messages from n8n responses (message, output, text, msg)
    const messageText = dataObj.message || dataObj.output || dataObj.text || dataObj.msg || '';
    
    // Check if the extracted message text is nested stringified JSON
    if (typeof messageText === 'string') {
      const trimmed = messageText.trim();
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try {
          const parsed = JSON.parse(trimmed);
          const subResult = parseWebhookReply(parsed);
          if (subResult.text) {
            if (foodItemsList.length > 0 && !subResult.foodItems) {
              subResult.foodItems = foodItemsList;
            }
            return subResult;
          }
        } catch (e) {
          // Fall back to plain text return
        }
      }
    }

    if (messageText) {
      return {
        text: messageText,
        foodItems: foodItemsList.length > 0 ? foodItemsList : undefined
      };
    }

    // If it's a generic JSON object with no explicit message field, stringify it clearly
    return {
      text: JSON.stringify(dataObj, null, 2),
      foodItems: foodItemsList.length > 0 ? foodItemsList : undefined
    };
  }

  // 4. Default raw string parsing
  let cleanedText = String(dataObj).trim();
  if (cleanedText.startsWith('"') && cleanedText.endsWith('"')) {
    cleanedText = cleanedText.slice(1, -1).trim();
  }

  return { text: cleanedText };
}

/**
 * Send query to the n8n HMS Restraunt Culinary Agent
 */
export async function sendMessageToAgent(
  message: string,
  sessionId: string
): Promise<WebhookResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 90000); // 90 seconds timeout to safely support slow n8n workflow compilations or cold starts

  try {
    const payload = {
      message,
      sessionId
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // If the server explicitly returned 404, we immediately trigger a connection error warning
    if (response.status === 404) {
      throw new Error(`n8n Webhook returned 404 (Not Registered)`);
    }

    if (!response.ok) {
      throw new Error(`Server returned status code ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const rawText = await response.text();
      try {
        data = JSON.parse(rawText);
      } catch {
        data = rawText;
      }
    }

    // Try parsing the webhook reply
    const reply = parseWebhookReply(data);
    
    // Format literal escaped newlines to actual linebreaks for proper markdown render
    if (reply.text) {
      reply.text = reply.text.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
    }

    return reply;

  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error('HMS Restraunt Webhook is offline or timed out.', error);

    // Enforce strict webhook-only response: return a clean connection error rather than simulating!
    return {
      text: "### ⚠️ HMS Assistant Offline\n\nCould not establish a connection to the **HMS Restraunt AI Assistant Webhook**.\n\n* **Status**: Webhook Inactive / n8n Offline\n* **Action Required**: Please ensure the n8n webhook workflow is active in your editor.\n\n*Your custom webhook endpoint is currently not responding to chat queries.*",
      error: true
    };
  }
}
